import request from "supertest";
import { login, testUser } from "../../../test/setup";
import { app } from "../../../app";
import { HttpStatusCode } from "@ir-managex/common";
import mongoose from "mongoose";
import { Organization } from "../../model/schema/organization.schema";
import { User } from "../../model/schema/user.schema";

describe("PATCH /api/v1/organization", () => {
  it("should verify that MongoDB is connected", async () => {
    expect(mongoose.connection.readyState).toBe(1);

    const collections = await mongoose.connection.db!.listCollections().toArray();
    console.log("Current collections:", collections);

    expect(collections).toBeDefined();
  });

  it("should update organization details successfully", async () => {
    const organizationId = new mongoose.Types.ObjectId().toHexString();
    const orgData = {
      admin: testUser.id,
      _id: organizationId,
      orgName: "Test Organization",
    };

    await Organization.create({ ...orgData });

     //@ts-ignore
    const user = await User.create({ _id: testUser.id, organization: organizationId, ...testUser });

    const updatedData = {
      orgName: "Updated Organization",
    };

    const response = await request(app)
      .patch("/api/v1/organization")
      .set("Cookie", login())
      .send(updatedData);

    expect(response.status).toBe(HttpStatusCode.OK);
  });

  it("should return 401 if user is not authenticated", async () => {
    const orgData = {
      orgName: "UnauthorizedTestOrg",
    };

    const response = await request(app)
      .patch("/api/v1/organization")
      .send(orgData)
      .expect(HttpStatusCode.UNAUTHORIZED);

    expect(response.body).toHaveProperty("errors");
  });


  it("should return 400 if the organization name already exists", async () => {
    const firstOrgData = {
      admin: testUser.id,
      _id: new mongoose.Types.ObjectId().toHexString(),
      orgName: "First Organization",
    };
    const secondOrgData = {
      admin: testUser.id,
      _id: new mongoose.Types.ObjectId().toHexString(),
      orgName: "Second Organization",
    };

    await Organization.create(firstOrgData);
    await Organization.create(secondOrgData);

     //@ts-ignore
    const user = await User.create({ _id: testUser.id, organization: firstOrgData._id, ...testUser });

    const response = await request(app)
      .patch("/api/v1/organization")
      .set("Cookie", login())
      .send({ orgName: secondOrgData.orgName })
      .expect(HttpStatusCode.BAD_REQUEST);

    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0]).toHaveProperty("message", "Organization already exists");
  });
});
