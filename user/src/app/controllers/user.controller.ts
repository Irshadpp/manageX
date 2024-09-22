import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user/user.service";
import { JWTUserPayload, NotFoundError } from "@ir-managex/common";
import { ProjectUserUpdatedPublisher } from "../events/publishers/project-user-updated-publisher";
import { rabbitmqWrapper } from "../../config/rabbimq-wrapper";

const userService = new UserService();

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as JWTUserPayload;
    const checkUser = userService.findById(id);
    if (!checkUser) {
      throw new NotFoundError();
    }
    const userData = req.body;
    const updatedUser = await userService.updateUser(id, userData);

    const projectUserEventData = ProjectUserUpdatedPublisher.mapToEventData(updatedUser!);
    await new ProjectUserUpdatedPublisher(rabbitmqWrapper.channel).publish(projectUserEventData);

    res
      .status(200)
      .json({ success: true, message: "User details updated successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const fetchUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("-------------")
  try {
    const users = await userService.getUsersByRole();
    res
      .status(200)
      .json({ success: true, users, message: "Fetched users successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const blockUser = async (req: Request, res: Response, next: NextFunction) =>{
  try {
    const {id} = req.params;
    const user = await userService.findById(id);
    if(!user){
      throw new NotFoundError();
    }
    await userService.blockAndUnblock(id);
    res.status(200).send({success:true})
  } catch (error) {
    console.log(error);
  }
}
