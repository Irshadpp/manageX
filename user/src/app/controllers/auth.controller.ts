import { NextFunction, Request, Response } from "express";
import {
  generateEmailToken,
  verifyEamilToken,
} from "../utils/jwt/email-varification.jwt";
import { sendVarificationEmail } from "../utils/node-mailer/send-verification-email";
import {
  BadRequestError,
  generateJwtAccessToken,
  generateJwtRefreshToken,
  JWTUserPayload,
  NotFoundError,
  NotAuthorizedError,
  verifyJwt,
  setCookie,
  ForbiddenError,
} from "@ir-managex/common";
import { UserAttrs } from "../model/user.model";
import { UserService } from "../services/user/user.service";
import { OrgService } from "../services/organization/org.service";
import Password from "../utils/password";
import { checkGoogleAuthUser } from "../utils/check-googleAuth-user";
import { EmployeeCreatedPublisher } from "../events/publishers/employee-created-publisher";
import { rabbitmqWrapper } from "../../config/rabbimq-wrapper";
import { Role } from "../model/enum";
import { ProjectUserCreatedPublisher } from "../events/publishers/project-user-created-publisher";
import { ChatUserCreatedPublisher } from "../events/publishers/chat-user-created-publisher";

const userService = new UserService();
const orgService = new OrgService();

const handleVerificationEmail = async (id: string, email: string) => {
  const token = generateEmailToken(id);
  await sendVarificationEmail(email, token);
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const existingUser = await userService.findByEmail(email);

    if (existingUser) {
      if (!existingUser.isEmailVerified) {
        await handleVerificationEmail(existingUser.id, existingUser.email);
        return res.status(200).send({ success: true, ...existingUser });
      }
      throw new BadRequestError("Email is already exists");
    }

    const user = await userService.createUser(req.body);
    const org = await orgService.createOrg({ admin: user.id });
    const organization = { organizationId: org.id } as UserAttrs;
    const updatedUser = await userService.updateUser(user.id, organization);

    const EmployeeEventData = EmployeeCreatedPublisher.mapToEventData(updatedUser!);
    await new EmployeeCreatedPublisher(rabbitmqWrapper.channel).publish(EmployeeEventData);

    const ProjectUserEventData = ProjectUserCreatedPublisher.mapToEventData(updatedUser!);
    await new ProjectUserCreatedPublisher(rabbitmqWrapper.channel).publish(ProjectUserEventData);

    const ChatUserEventData = ChatUserCreatedPublisher.mapToEventData(updatedUser!);
    await new ChatUserCreatedPublisher(rabbitmqWrapper.channel).publish(ChatUserEventData);

    await handleVerificationEmail(user.id, user.email);

    res.status(201).send({ success: true, user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.query;
    if (!token) {
      throw new BadRequestError("Token is missing");
    }
    const { id } = verifyEamilToken(token as string);

    const user = await userService.verifyUserEmail(id);

    if (!user) {
      throw new NotFoundError();
    }

    const payload: JWTUserPayload = {
      id: user.id,
      role: user.role,
      isActive: user.isActive,
      organization: user.organizationId,
    };

    const accessToken = generateJwtAccessToken(
      payload,
      process.env.JWT_ACCESS_SECRET!
    );
    const refreshToken = generateJwtRefreshToken(
      payload,
      process.env.JWT_REFRESH_SECRET!
    );

    setCookie(res, 'accessToken', accessToken, {maxAge: 30 * 60 * 1000});
    setCookie(res, 'refreshToken', refreshToken, {maxAge: 7 * 24 * 60 * 60 * 1000})

    res.status(200).json({
      success: true,
      user,
      message: "Signup successfull",
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("=========")
  try {
    const { email, password } = req.body;
    const user = await userService.findByEmail(email);
    if (!user) {
      throw new BadRequestError("Invalid email or password!");
    }
    if(!user.isEmailVerified){
      throw new BadRequestError("Please verify your email!");
    }
    if(!user.isActive){
      throw new BadRequestError("Your account has been blocked. Please contact support.")
    }
    const matchPassword = await Password.compare(user.password, password);
    if (!matchPassword) {
      throw new BadRequestError("Invalid email or password!");
    }

    const payload: JWTUserPayload = {
      id: user.id,
      isActive: user.isActive,
      role: user.role,
      organization: user.organizationId,
    };

    const accessToken = generateJwtAccessToken(
      payload,
      process.env.JWT_ACCESS_SECRET!
    );
    const refreshToken = generateJwtRefreshToken(
      payload,
      process.env.JWT_REFRESH_SECRET!
    );

    setCookie(res, 'accessToken', accessToken, {maxAge: 30 * 60 * 1000});
    setCookie(res, 'refreshToken', refreshToken, {maxAge: 7 * 24 * 60 * 60 * 1000})

    res.status(200).json({
      success: true,
      user: payload,
      accessToken,
      message: `${user.role} Login successfull`,
    });
  } catch (error) {
    next(error);
  }
};

export const newToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken,"=================================");
    if(!refreshToken){
      throw new NotAuthorizedError();
    }

    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    const user = verifyJwt(refreshToken, refreshSecret!) as JWTUserPayload;
    if (!user){
      throw new ForbiddenError();
    } 
    const payload: JWTUserPayload = {
      id: user.id,
      role: user.role,
      isActive: user.isActive,
      organization: user.organization,
    };
    const accessSecret = process.env.JWT_ACCESS_SECRET;
    const newAccessToken = generateJwtAccessToken(payload, accessSecret!);

    setCookie(res, 'accessToken', newAccessToken, {maxAge: 30 * 60 * 1000});

    res.json({accessToken: newAccessToken});
  } catch (error) {
    console.log("Error in new token",error);
    next(error)
  }
};

export const googleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;
    const googleResponseData = await checkGoogleAuthUser(token);

    const { email, given_name, family_name, name, picture } =
      googleResponseData;

    const existingUser = await userService.findByEmail(email);
    let payload: JWTUserPayload;
    let accessToken: string;
    let refreshToken: string;
    const accessSecret = process.env.JWT_ACCESS_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    if (existingUser) {
      payload = {
        id: existingUser.id,
        role: existingUser.role,
        isActive: existingUser.isActive,
        organization: existingUser.organizationId,
      };
    }else{
      const userData = {
        fName: given_name || name,
        lName: family_name || name,
        username: name,
        email,
        profileURL: picture,
        isEmailVerified: true
      } as UserAttrs;
      const user = await userService.createUserWithGoogle(userData);
      const org = await orgService.createOrg({ admin: user.id });
      const organization = { organizationId: org.id } as UserAttrs;
      const updatedUser = await userService.updateUser(user.id, organization);

      const eventData = EmployeeCreatedPublisher.mapToEventData(updatedUser!);
      await new EmployeeCreatedPublisher(rabbitmqWrapper.channel).publish(eventData);
  
      payload = {
        id: user.id,
        role: user.role,
        isActive: user.isActive,
        organization: org.id,
      };
    }
    accessToken = generateJwtAccessToken(payload, accessSecret!);
    refreshToken = generateJwtRefreshToken(payload, refreshSecret!);

    setCookie(res, 'accessToken', accessToken, {maxAge: 30 * 60 * 1000});
    setCookie(res, 'refreshToken', refreshToken, {maxAge: 7 * 24 * 60 * 60 * 1000})

    res.status(200).json({
      success: true,
      user: payload,
      accessToken,
      message: "google signin successfull",
    });
  } catch (error) {
    next(error);
  }
};

export const checkUser = async (req: Request, res: Response,
  next: NextFunction
) => {
  try {
    //@ts-ignore
    const {id} = req.user
    const user = await userService.getUserById(id);
    res
      .status(200)
      .json({ success: true, user  , message: "Fetched user status successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req:Request, res:Response, next:NextFunction) =>{
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.status(200).send({ success: true, message: "Logged out successfully"});
}

export const setPassword = async (req: Request, res: Response, next: NextFunction) =>{
  try {
    const {id} = req.user as JWTUserPayload;
    const {password} = req.body;
    await userService.updatePassword(id, password);
    res.status(200).json({success: true, message: "Password created successfully"});
  } catch (error) {
    console.log(error)
    next(error);
  }
}