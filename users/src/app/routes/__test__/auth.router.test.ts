import { app } from "../../../app";
import request from "supertest";
import { User } from "../../model/schema/user.schema";
import { rabbitmqWrapper } from "../../../config/rabbitmq-wrapper";
import { generateEmailToken } from "../../utils/jwt/email-varification.jwt";
import { UserService } from "../../services/user/user.service";
import Password from "../../utils/password";
import mongoose from "mongoose";

///////////////////// signup test//////////////////////
describe("POST /api/v1/auth/signup", () => {
    it("should create a user and return 201 status code", async () => {
      const response = await request(app)
        .post("/api/v1/auth/signup")
        .send({
          email: "irshad@example.com",
          password: "User@123",
          confirmPassword: "User@123",
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("success", true);
    });
  
    it("should return 400 if email already exists and is verified", async () => {
      await User.create({
        email: "irshad@example.com",
        password: "User@123",
        isEmailVerified: true,
      });
  
      const response = await request(app)
        .post("/api/v1/auth/signup")
        .send({
          email: "irshad@example.com", 
          password: "User@123",
          confirmPassword: "User@123",
        });
  
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
    });
  
    it("should send verification email if email exists but is not verified", async () => {
      await User.create({
        email: "irshad@example.com",
        password: "User@123",
        isEmailVerified: false,
      });
  
      const response = await request(app)
        .post("/api/v1/auth/signup")
        .send({
          email: "irshad@example.com", 
          password: "User@123",
          confirmPassword: "User@123",
        });
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("success", true);
    });
  
    it("should handle errors gracefully", async () => {
      const response = await request(app)
        .post("/api/v1/auth/signup")
        .send({}); 
  
      expect(response.status).toBe(400); 
      expect(response.body).toHaveProperty("errors");
    });
  });


  ///////////////////// verify-email test //////////////////////
  describe("GET /api/v1/auth/verify-email", () => {
    it("should verify the user's email and return 200 status code", async () => {
      const user = await User.create({
        email: "test@example.com",
        password: "User@123",
        isEmailVerified: false,
      });

      
      const token = generateEmailToken(user.id); 
      
      const response = await request(app)
        .get(`/api/v1/auth/verify-email?token=${token}`);
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("success", true);
      expect(response.body.data.user).toHaveProperty("email", user.email);
    });
  
    it("should return 400 if token is missing", async () => {
      const response = await request(app)
        .get("/api/v1/auth/verify-email")
        .send();
  
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
    });
  
    it("should return 400 invalid or user not found", async () => {
      const invalidToken = "invalidToken"; 
  
      const response = await request(app)
        .get(`/api/v1/auth/verify-email?token=${invalidToken}`);
  
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
    });
  });



  ////////////////////// login testing ///////////////////////

  describe("POST /api/v1/auth/login", () => {
    beforeEach(async () => {
      await User.deleteMany({});
    });
  
    it("should log in a user and return 200 status code with tokens", async () => {
      const user = await User.create({
        email: "testuser@example.com",
        password: await Password.toHash("User@123"),
        isEmailVerified: true,
        isActive: true,
        fName: "Test",
        lName: "User",
        role: "user",
        organizationId: new mongoose.Types.ObjectId(),
        profileURL: "http://example.com/profile.jpg"
      });
  
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "testuser@example.com",
          password: "User@123",
        });
  
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body).toHaveProperty("data.accessToken");
        expect(response.body).toHaveProperty("data.user");
        expect(response.body.data.user).toHaveProperty("email", user.email);
    });
  
    it("should return 400 if email is not found", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "nonexistent@example.com",
          password: "User@123",
        });
  
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors[0]).toHaveProperty("message", "Invalid email or password!"); 
    });
  
    it("should return 400 if email is not verified", async () => {
      const user = await User.create({
        email: "unverified@example.com",
        password: await Password.toHash("User@123"),
        isEmailVerified: false,
        isActive: true,
        fName: "Test",
        lName: "User",
        role: "user",
        organizationId: new mongoose.Types.ObjectId(),
        profileURL: "http://example.com/profile.jpg"
      });
  
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "unverified@example.com",
          password: "User@123",
        });
  
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
  expect(response.body.errors[0]).toHaveProperty("message", "Please verify your email!"); 
    });
  
    it("should return 400 if the account is inactive", async () => {
      const user = await User.create({
        email: "blocked@example.com",
        password: await Password.toHash("User@123"),
        isEmailVerified: true,
        isActive: false,
        fName: "Test",
        lName: "User",
        role: "user",
        organizationId: new mongoose.Types.ObjectId(),
        profileURL: "http://example.com/profile.jpg"
      });
  
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "blocked@example.com",
          password: "User@123",
        });
  
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors",);
      expect(response.body.errors[0]).toHaveProperty("message", "Your account has been blocked. Please contact support."); 
    });
  
    it("should return 400 if the password is incorrect", async () => {
      const user = await User.create({
        email: "wrongpassword@example.com",
        password: await Password.toHash("User@123"),
        isEmailVerified: true,
        isActive: true,
        fName: "Test",
        lName: "User",
        role: "user",
        organizationId: new mongoose.Types.ObjectId(),
        profileURL: "http://example.com/profile.jpg"
      });
  
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "wrongpassword@example.com",
          password: "WrongPassword!23",
        });
  
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors[0]).toHaveProperty("message", "Invalid email or password!"); 
    });
  
  });