import { BadRequestError, NotFoundError } from "@ir-managex/common";
import { NextFunction, Request, Response } from "express";
import { EmployeeService } from "../services/employee/employee.service";
import { UserCreatedPublisher } from "../events/publishers/user-created-publisher";
import { rabbitmqWrapper } from "../../config/rabbitmqWrpper";
import { UserUpdatedPublisher } from "../events/publishers/user-updated-publisher";
import { generateEmailToken } from "../utils/jwt/email-varification.jwt";
import { sendVarificationEmail } from "../utils/node-mailer/send-verification-email";

const employeeService = new EmployeeService();

export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orgId = req.user?.organization;
    if (!orgId) throw new NotFoundError();

    const { email, username, phone } = req.body;

    const existingEmpWithEmail = await employeeService.findByEmail(email);
    if (existingEmpWithEmail) throw new BadRequestError("Email already exists");

    const existingEmpWithUsername = await employeeService.findByUsername(
      username
    );
    if (existingEmpWithUsername)
      throw new BadRequestError("Username already exists");

    const existingEmpWithPhone = await employeeService.findByPhone(phone);
    if (existingEmpWithPhone) throw new BadRequestError("Phone already exists");

    const employee = {
        ...req.body,
        organizationId: orgId
    }

    const employeeData = await employeeService.createEmployee(employee);

    const eventData = UserCreatedPublisher.moveToEventData(employeeData);
    await new UserCreatedPublisher(rabbitmqWrapper.channel).publish(eventData);

    res.status(201).send({success: true, message: "Created employee successfully"});
    
  } catch (error) {
    next(error)
  }
};

export const updateEmployee = async (req: Request, res: Response, next: NextFunction) =>{
  try {
    const orgId = req.user?.organization;
    if (!orgId) throw new NotFoundError();

    const { email, username, phone, id } = req.body;

    const currEmployee = await employeeService.findById(id);
  if(!currEmployee) throw new NotFoundError();

    const existingEmpWithEmail = await employeeService.findByEmail(email);
    
    if (existingEmpWithEmail && currEmployee.email !== email) throw new BadRequestError("Email already exists");

    const existingEmpWithUsername = await employeeService.findByUsername(
      username
    );
    if (existingEmpWithUsername && currEmployee.username !== username)
      throw new BadRequestError("Username already exists");
    
    const existingEmpWithPhone = await employeeService.findByPhone(phone);
    if (existingEmpWithPhone && currEmployee.phone != phone) throw new BadRequestError("Phone already exists");

    const employee = {
        ...req.body,
        organizationId: orgId
    }

    const employeeData = await employeeService.updateEmployee(id, employee);

    const eventData = UserUpdatedPublisher.moveToEventData(employeeData!);
    await new UserUpdatedPublisher(rabbitmqWrapper.channel).publish(eventData);

    res.status(201).send({success: true, message: "updated employee successfully"});
    
  } catch (error) {
    next(error)
  }
}

export const sendInvitationMail = async (req: Request, res: Response, next: NextFunction) =>{
  try {
    const {email, id} = req.body;
    const token = generateEmailToken(id);
    await sendVarificationEmail(email, token);
    res.status(200).send({success: true});
  } catch (error) {
    console.log(error)
    next(error);
  }
}

export const fetchEmployeesWithOrgId = async (req: Request, res: Response, next: NextFunction) =>{
  try {
    const orgId = req.user?.organization;
    if (!orgId) throw new NotFoundError();
    const employees = await employeeService.findEmployeesWithOrgId(orgId);
    res.status(200).json({success: true, message: "Fetched employees successfully", data: employees});
  } catch (error) {
    next(error);
  }
}