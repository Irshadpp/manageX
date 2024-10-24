import request from "supertest";
import { app } from "../../../app";
import mongoose from "mongoose";
import { login } from "../../../test/setup";
import { HttpStatusCode } from "@ir-managex/common";
import { AttendancePolicy } from "../../model/schema/attendance-policy.schema";


///////////////////// fetching attendance-policy /////////////////

describe("GET /api/v1/attendance-policy/:organizationId", () => {
  it("should verify that MongoDB is connected", async () => {
    expect(mongoose.connection.readyState).toBe(1);

    const collections = await mongoose.connection.db!.listCollections().toArray();
    console.log("Current collections:", collections);

    expect(collections).toBeDefined();
  });

  it("should fetch attendance policy successfully when organizationId exists", async () => {
    const cookies = await login();

    const organizationId = new mongoose.Types.ObjectId().toHexString();
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

    const response = await request(app)
      .get(`/api/v1/attendance-policy/${organizationId}`)
      .set("Cookie", cookies)
      .expect(HttpStatusCode.OK);

    expect(response.body).toHaveProperty("message", "Attendance policy fetched successfully");
    expect(response.body.data).toMatchObject(attendancePolicyData);
  });

  it("should return 404 if organizationId is not provided", async () => {
    const cookies = await login();

    const response = await request(app)
      .get(`/api/v1/attendance-policy`)
      .set("Cookie", cookies)
      .expect(HttpStatusCode.NOT_FOUND);

      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors[0]).toHaveProperty("message", "Not found");
  });

});



////////////////updating attendance policy///////////////////

describe("PATCH /api/v1/attendance-policy/:organizationId", () => {

  it("should update attendance policy successfully when valid data is provided", async () => {
    const cookies = await login();

    const organizationId = new mongoose.Types.ObjectId().toHexString();
    const initialAttendancePolicyData = {
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

    await AttendancePolicy.create(initialAttendancePolicyData);

    const updates = {
      officeStartTime: "08:30",
      lateThreshold: "09:00",
      halfDayThreshold: 5,
      leavePolicy: {
        sickLeaves: 6,
        casualLeaves: 4,
        vecationLeaves: 3,
      },
    };

    const response = await request(app)
      .patch(`/api/v1/attendance-policy/${organizationId}`)
      .set("Cookie", cookies)
      .send(updates)
      .expect(HttpStatusCode.OK);
  });

  it("should return 404 if organizationId is not provided", async () => {
    const cookies = await login();

    const response = await request(app)
      .patch(`/api/v1/attendance-policy/`)
      .set("Cookie", cookies)
      .send({ officeStartTime: "08:30" })
      .expect(HttpStatusCode.NOT_FOUND);

  });

  it("should return 400 for invalid officeStartTime format", async () => {
    const cookies = await login();

    const organizationId = new mongoose.Types.ObjectId().toHexString();
    await AttendancePolicy.create({
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
    });

    const response = await request(app)
      .patch(`/api/v1/attendance-policy/${organizationId}`)
      .set("Cookie", cookies)
      .send({ officeStartTime: "invalid_time" }) 
      .expect(HttpStatusCode.BAD_REQUEST);

      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors[0]).toHaveProperty("message", "Office start time must be in HH:MM format");
  });
});
