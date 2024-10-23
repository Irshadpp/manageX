import request from "supertest";
import { login, testUser } from "../../../test/setup";
import { app } from "../../../app";
import { HttpStatusCode } from "@ir-managex/common";
import mongoose from "mongoose";
import { UserService } from "../../services/user/user.service";
import { User } from "../../model/schema/user.schema";

describe("PATCH /api/v1/users", () => {
    it("should verify that MongoDB is connected", async () => {
        expect(mongoose.connection.readyState).toBe(1);
      
        const collections = await mongoose.connection.db!.listCollections().toArray();
        console.log("Current collections:", collections);
      
        expect(collections).toBeDefined();
      });
      
    it("should update user details successfully", async () => {

        const user = await User.create(testUser);
          
        const response = await request(app)
        .patch("/api/v1/users")
        .set("Cookie", login())
        .send({ fName: "BasicTest" });
    
        expect(response.status).toBe(200);
    });
  
    // it("should return 404 if user does not exist", async () => {
    //   const cookies = await login(new mongoose.Types.ObjectId().toHexString());
  
    //   const userData = {
    //     fName: "NonExistentUser",
    //   };
  
    //   jest.spyOn(UserService as any, "findById").mockResolvedValue(null);
  
    //   const response = await request(app)
    //     .patch("/api/v1/users")
    //     //@ts-ignore
    //     .set("Cookie", cookies)
    //     .send(userData)
    //     .expect(HttpStatusCode.NOT_FOUND);

    //   expect(response.body).toHaveProperty("errors");
    //   expect(response.body.errors).toEqual("User not found"); 
    // });
  
    it("should return 400 for invalid user data", async () => {
      const cookies = await login(new mongoose.Types.ObjectId().toHexString());
  
      const invalidUserData = {
        fName: "",
      };
  
      const response = await request(app)
        .patch("/api/v1/users")
        //@ts-ignore
        .set("Cookie", cookies)
        .send(invalidUserData)
        .expect(HttpStatusCode.BAD_REQUEST); 
  
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0]).toHaveProperty("message", "Please give valid first name"); 
    });
  });
  