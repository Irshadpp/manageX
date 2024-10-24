import request from "supertest";
import { app } from "../../../app";
import mongoose from "mongoose";
import { login, testUser } from "../../../test/setup";
import { HttpStatusCode } from "@ir-managex/common";
import { AttendancePolicy } from "../../model/schema/attendance-policy.schema";


//////////////////////// applying leave ////////////////////////
describe("POST /api/v1/leave", () => {
  it("should verify that MongoDB is connected", async () => {
    expect(mongoose.connection.readyState).toBe(1);

    const collections = await mongoose.connection.db!.listCollections().toArray();
    console.log("Current collections:", collections);

    expect(collections).toBeDefined();
  });

  it("should apply leave successfully when valid data is provided", async () => {
    const cookies = await login();

    const organizationId = testUser.organization

    const attendancePolicyData = {
      organizationId,
      officeStartTime: "09:00",
      lateThreshold: "09:30",
      halfDayThreshold: 4,
      fullDayThreshold: 8,
      leavePolicy: {
        sickLeaves: 5,
        casualLeaves: 3,
        vecationLeaves: 2,
      },
    };

    await AttendancePolicy.create(attendancePolicyData);

    const leaveData = {
      leaveType: "sick",
      startDate: new Date("2024-10-25"),
      endDate: new Date("2024-10-27"),
      reason: "Medical reason",
    };

    const response = await request(app)
      .post(`/api/v1/leave`)
      .set("Cookie", cookies)
      .send(leaveData)
      .expect(HttpStatusCode.CREATED);

    expect(response.body).toHaveProperty("message", "Leave applied successfully");
  });

  it("should return 400 for insufficient leave balance", async () => {
    const cookies = await login();

    const organizationId = testUser.organization

    const attendancePolicyData = {
      organizationId,
      officeStartTime: "09:00",
      lateThreshold: "09:30",
      halfDayThreshold: 4,
      fullDayThreshold: 8,
      leavePolicy: {
        sickLeaves: 1, 
        casualLeaves: 3,
        vecationLeaves: 2,
      },
    };

    await AttendancePolicy.create(attendancePolicyData);

    const leaveData = {
      leaveType: "sick",
      startDate: new Date("2024-10-25"),
      endDate: new Date("2024-10-27"),
      reason: "Medical reason",
    };

    const response = await request(app)
      .post(`/api/v1/leave`)
      .set("Cookie", cookies)
      .send(leaveData)
      .expect(HttpStatusCode.BAD_REQUEST);

    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0]).toHaveProperty("message", "Insufficient sick leave balance");
  });

  it("should return 400 for invalid leaveType", async () => {
    const cookies = await login();

    const leaveData = {
      leaveType: "invalid_type", 
      startDate: new Date("2024-10-25"),
      endDate: new Date("2024-10-27"),
      reason: "Medical reason",
    };

    const response = await request(app)
      .post(`/api/v1/leave`)
      .set("Cookie", cookies)
      .send(leaveData)
      .expect(HttpStatusCode.BAD_REQUEST);

    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0]).toHaveProperty("message", "Invalid leave type");
  });
});
