import request from "supertest";
import { app } from "../../../app";
import mongoose from "mongoose";
import { login, testUser } from "../../../test/setup";
import { HttpStatusCode } from "@ir-managex/common";
import { AttendancePolicy } from "../../model/schema/attendance-policy.schema";
import { Attendance } from "../../model/schema/attendance.schema";

describe("POST /api/v1/attendance/", () => {
    beforeEach(async () => {
        await Attendance.deleteMany({});
    });

    it("should verify that MongoDB is connected", async () => {
        expect(mongoose.connection.readyState).toBe(1);
    });

    it("should return 400 if attendance policy is not found", async () => {
        const cookies = await login();
        const response = await request(app)
            .post("/api/v1/attendance/")
            .set("Cookie", cookies)
            .send({
                type: "checkIn",
                remarks: "Arrived at the office",
            })
            .expect(HttpStatusCode.BAD_REQUEST);

        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors[0]).toHaveProperty("message", "Attendance policy not found");
    });


    it("should return 400 for invalid attendance type", async () => {
        const cookies = await login();

        const response = await request(app)
            .post("/api/v1/attendance/")
            .set("Cookie", cookies)
            .send({
                type: "invalidType",
                remarks: "Trying an invalid type",
            })
            .expect(HttpStatusCode.BAD_REQUEST);

        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors[0]).toHaveProperty("message", 'Attendance type must be either "checkIn" or "checkOut"');
    });
});
