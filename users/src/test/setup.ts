import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import amqp from 'amqplib';
import jwt from "jsonwebtoken";
import { JWTUserPayload } from "@ir-managex/common";

jest.mock('../config/rabbitmq-wrapper.ts', () => {
  const mockChannel: Partial<amqp.Channel> = {
    assertQueue: jest.fn().mockResolvedValue(true),
    sendToQueue: jest.fn(),
    publish: jest.fn(),
    connection: {
      on: jest.fn(),
    } as any, 
  };

  return {
    rabbitmqWrapper: {
      connect: jest.fn().mockResolvedValue(true),
      channel: mockChannel as amqp.Channel, 
    },
  };
});


jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue(true), 
  }),
}));


///// Common User Values////
export const testUser: JWTUserPayload = {
  id: "60b6c47f3e6b8d5f4e5c7f1b",
  name: "Test User",
  email: "testuser@example.com",
  profileURL: "http://example.com/profile.jpg",
  isActive: true,
  role: "owner",
  organization: "60b6c47f3e6b8d5f4e5c7f1c"
};


let mongo: MongoMemoryServer;
let mongoUri: string;

beforeAll(async () => {
  process.env.JWT_EMAIL_SECRET = 'test-jwt-secret';
  process.env.SMTP_USER = "managexorg@gmail.com";
  process.env.SMTP_PASSWORD = "mzge gzqf gtzy vjec"
  process.env.JWT_ACCESS_SECRET = "3079fde7a73e8cdee088f32e1287cf97750a7dfc313f90c4da821390166cba59"
  process.env.JWT_REFRESH_SECRET = "d6c3c00e4710d7c3c970838e7469b671c1f7627de76fe6e926f984ec983c102f"

  mongo = await MongoMemoryServer.create();
  mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);

  if (mongoose.connection.readyState !== 1) {
    throw new Error("MongoDB connection failed!");
  }
});

beforeEach(async () => {
  const collections = await mongoose.connection.db!.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
  jest.clearAllMocks();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
});

export const login = (): string[] => {

  const accessToken = jwt.sign(testUser, process.env.JWT_ACCESS_SECRET!, { expiresIn: "30m" });
  const refreshToken = jwt.sign(testUser, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });

  // Return the tokens as cookies
  const accessTokenCookie = `accessToken=${accessToken}; Path=/; HttpOnly`;
  const refreshTokenCookie = `refreshToken=${refreshToken}; Path=/; HttpOnly`;

  // Return both cookies in an array
  return [accessTokenCookie, refreshTokenCookie];
};

