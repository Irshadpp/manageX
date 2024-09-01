import { BadRequestError, NotFoundError } from "@ir-managex/common";
import { NextFunction, Request, Response } from "express";
import { EmployeeService } from "../services/employee/employee.service";

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

    await employeeService.createEmployee(employee);
    res.status(201).send({message: "Created employee successfully"});
    
  } catch (error) {
    next(error)
  }
};
