import { BadRequestError, CommonMessages, HttpStatusCode, NotFoundError, sendResponse } from "@ir-managex/common";
import { NextFunction, Request, Response } from "express";
import { EmployeeService } from "../services/employee/employee.service";
import { UserCreatedPublisher } from "../events/publishers/user-created-publisher";
import { rabbitmqWrapper } from "../../config/rabbitmq-Wrapper";
import { UserUpdatedPublisher } from "../events/publishers/user-updated-publisher";
import { generateEmailToken } from "../utils/jwt/email-varification.jwt";
import { sendVarificationEmail } from "../utils/node-mailer/send-verification-email";
import { ProjectUserCreatedPublisher } from "../events/publishers/project-user-created-publisher";
import { ProjectUserUpdatedPublisher } from "../events/publishers/project-user-updated-publisher";
import { ChatUserCreatedPublisher } from "../events/publishers/chat-user-created-publisher";
import { ChatUserUpdatedPublisher } from "../events/publishers/chat-user-updated-publisher";
import Stripe from "stripe";

const employeeService = new EmployeeService();

const stripe = new Stripe(process.env.STRIPE_SECRET! || "sk_test_51Q9lFJKT4uALUwNbQ24h8dhZLpfWXmf9QjxUNajM2WuHZDt5MAtFfmYvAay0LfExDfFJU7JLzuIL1fGZPQBDfO1r00oAYX4HjQ");

const resourceLimits: any = {
  Free: { employees: 5, projects: 2 },
  Pro: { employees: 20, projects: 10 },
  Business: { employees: Infinity, projects: Infinity },
};

 const checkSubscriptionLimits = async (
  organizationId: string,
  resourceType: "employees" | "projects",
  currentCount: number
) => {
  try {
      const customers = await stripe.customers.list({
          limit: 100,
        });
        
        
        
        console.log("organizationId------------------>", organizationId)
        const organizationCustomers = customers.data.filter(
          (customer) => customer.metadata.organizationId === organizationId
        );
        
        console.log("customersss.............", organizationCustomers);

    const subscriptionId = organizationCustomers[0]?.subscriptions?.data[0]?.id;

    if (!subscriptionId && resourceLimits["Free"][resourceType] > currentCount) {
      return true;
    }
    if(!subscriptionId){
        throw new Error("Subscription not found and free limit exceeded");
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const product = await stripe.products.retrieve( subscription.items.data[0].price.product as string);
    const subscriptionPlan = product.name;

    const limit = resourceLimits[subscriptionPlan][resourceType];

    if (currentCount >= limit) {
      throw new Error(`Limit exceeded for ${resourceType}: ${limit}`);
    }

    return true;
  } catch (error) {
    throw error;
  }
};

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

    const {street, city, state, country, zipcode} = req.body; 
    const addressObj = {
      street,
      city,
      state,
      country,
      zipcode
    }

    const employee = {
        ...req.body,
        organizationId: orgId,
        address: addressObj
    }

    const employeeData = await employeeService.createEmployee(employee);

    const eventData = UserCreatedPublisher.moveToEventData(employeeData);
    await new UserCreatedPublisher(rabbitmqWrapper.channel).publish(eventData);

    const projecUserEventData = ProjectUserCreatedPublisher.mapToEventData(employeeData);
    await new ProjectUserCreatedPublisher(rabbitmqWrapper.channel).publish(projecUserEventData);

    const chatUserEventData = ChatUserCreatedPublisher.mapToEventData(employeeData!);
    console.log(chatUserEventData, "chat user created publishing data............")
    await new ChatUserCreatedPublisher(rabbitmqWrapper.channel).publish(chatUserEventData);

    sendResponse(res, HttpStatusCode.CREATED, "Created employee successfully");

    
  } catch (error) {
    next(error)
  }
};

export const updateEmployee = async (req: Request, res: Response, next: NextFunction) =>{
  try {
    const orgId = req.user?.organization;
    if (!orgId) throw new NotFoundError();

    const {id} = req.params;
    const { email, username, phone } = req.body;

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

    const {street, city, state, country, zipcode} = req.body; 
    const addressObj = {
      street,
      city,
      state,
      country,
      zipcode
    }
    
    const employee = {
        ...req.body,
        organizationId: orgId,
        address: addressObj
    }
    
    const employeeData = await employeeService.updateEmployee(id, employee);

    const eventData = UserUpdatedPublisher.moveToEventData(employeeData!);
    await new UserUpdatedPublisher(rabbitmqWrapper.channel).publish(eventData);

    const projectUserEventData = ProjectUserUpdatedPublisher.mapToEventData(employeeData!)
    await new ProjectUserUpdatedPublisher(rabbitmqWrapper.channel).publish(projectUserEventData);

    const chatUserEventData = ChatUserUpdatedPublisher.mapToEventData(employeeData!);
    await new ChatUserUpdatedPublisher(rabbitmqWrapper.channel).publish(chatUserEventData);

    sendResponse(res, HttpStatusCode.CREATED, "Updated employee successfully");
  } catch (error) {
    next(error)
  }
}

export const sendInvitationMail = async (req: Request, res: Response, next: NextFunction) =>{
  try {
    const {email, id} = req.body;
    const token = generateEmailToken(id);
    await sendVarificationEmail(email, token);
    sendResponse(res, HttpStatusCode.OK, CommonMessages.SUCCESS);
  } catch (error) {
    console.log(error)
    next(error);
  }
}

export const fetchEmployeesWithOrgId = async (req: Request, res: Response, next: NextFunction) =>{
  try {
    const orgId = req.user?.organization;
    if (!orgId) throw new NotFoundError();

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 8;

    const employees = await employeeService.findEmployeesWithOrgId(orgId, page, limit);
    sendResponse(res, HttpStatusCode.OK, "Fetched employees successfully", employees );
  } catch (error) {
    next(error);
  }
}

export const checkSubscriptionLimit = async(req: Request, res: Response, next: NextFunction) =>{
  try {
    const orgId = req.user?.organization;
    if (!orgId) throw new NotFoundError();

    const currentEmployeeCount = await employeeService.countEmployees(orgId);
    await checkSubscriptionLimits(orgId, "employees", currentEmployeeCount);

    sendResponse(res, HttpStatusCode.OK, CommonMessages.SUCCESS);
  } catch (error) {
    next(error);
 
  }
}


