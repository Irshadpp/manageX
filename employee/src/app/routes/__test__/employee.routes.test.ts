import request from "supertest";
import { app } from "../../../app";
import { HttpStatusCode } from "@ir-managex/common";
import { login, testUser } from "../../../test/setup";
import mongoose from "mongoose";
import { Employee } from "../../model/schema/employee.schema";


/////////////////// create employee ////////////////////
describe("POST /api/v1/employee", () => {
  it("should verify that MongoDB is connected", async () => {
    expect(mongoose.connection.readyState).toBe(1);
    
    const collections = await mongoose.connection.db!.listCollections().toArray();
    console.log("Current collections:", collections);
    
    expect(collections).toBeDefined();
  });

  it("should create an employee successfully", async () => {
    const cookies = login();

    const employeeData = {
        fName: "Test",
        lName: "User",
        email: "testuser@example.com",
        username: "testuser",
        role: "employee",
        employeeType: "full time",
        gender: "male",
        salary: 50000,
        street: "123 Test St",
        city: "Test City",
        country: "Test Country",
        state: "Test State",
        zipcode: "12345",
        phone: "1234567890",
        hiringDate: "2023-10-10",
    };

    const response = await request(app)
      .post("/api/v1/employee")
      .set("Cookie", cookies)
      .send(employeeData)
      .expect(HttpStatusCode.CREATED);

    expect(response.body).toHaveProperty("success", true);
    expect(response.body.message).toBe("Created employee successfully");
  });

  it("should return 400 if email already exists", async () => {
    const cookies = login();

    const existingEmployee = {
        fName: "Test",
        lName: "User",
        email: "testuser@example.com",
        username: "testuser",
        role: "employee",
        employeeType: "full time",
        gender: "male",
        salary: 50000,
        street: "123 Test St",
        city: "Test City",
        country: "Test Country",
        state: "Test State",
        zipcode: "12345",
        phone: "1234567890",
        hiringDate: "2023-10-10",
    };

    await Employee.create({ _id: new mongoose.Types.ObjectId(), ...existingEmployee });

    const response = await request(app)
      .post("/api/v1/employee")
      .set("Cookie", cookies)
      .send({ ...existingEmployee, username: "another_unique_username", phone: "1112223333" })
      .expect(HttpStatusCode.BAD_REQUEST);

    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0]).toHaveProperty("message", "Email already exists");
  });

  it("should return 400 if username already exists", async () => {
    const cookies = login();

    const existingEmployee = {
        fName: "Test",
        lName: "User",
        email: "testuser@example.com",
        username: "testuser",
        role: "employee",
        employeeType: "full time",
        gender: "male",
        salary: 50000,
        street: "123 Test St",
        city: "Test City",
        country: "Test Country",
        state: "Test State",
        zipcode: "12345",
        phone: "1234567890",
        hiringDate: "2023-10-10",
    };

    await Employee.create({ _id: new mongoose.Types.ObjectId(), ...existingEmployee });

    const response = await request(app)
      .post("/api/v1/employee")
      .set("Cookie", cookies)
      .send({ ...existingEmployee, email: "anotheremail@example.com", phone: "3334445555" })
      .expect(HttpStatusCode.BAD_REQUEST);

    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0]).toHaveProperty("message", "Username already exists");
  });

  it("should return 400 if phone number already exists", async () => {
    const cookies = login();

    const existingEmployee = {
        fName: "Test",
        lName: "User",
        email: "testuser@example.com",
        username: "testuser",
        role: "employee",
        employeeType: "full time",
        gender: "male",
        salary: 50000,
        street: "123 Test St",
        city: "Test City",
        country: "Test Country",
        state: "Test State",
        zipcode: "12345",
        phone: "1234567890",
        hiringDate: "2023-10-10",
    };

    await Employee.create({ _id: new mongoose.Types.ObjectId(), ...existingEmployee });

    const response = await request(app)
      .post("/api/v1/employee")
      .set("Cookie", cookies)
      .send({ ...existingEmployee, email: "differentemail@example.com", username: "different_username" })
      .expect(HttpStatusCode.BAD_REQUEST);

    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0]).toHaveProperty("message", "Phone already exists");
  });

  it("should return 401 if user is not authenticated", async () => {
    const response = await request(app)
      .post("/api/v1/employee")
      .send({
        email: "test@example.com",
        username: "testuser",
        phone: "9999999999",
      })
      .expect(HttpStatusCode.UNAUTHORIZED);

    expect(response.body).toHaveProperty("errors");
  });
});
