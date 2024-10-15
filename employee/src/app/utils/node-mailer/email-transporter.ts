import nodemailer from "nodemailer";

export const emailTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, 
    secure: true,
    auth: {
      user: "managexorg@gmail.com",
      pass: "mzge gzqf gtzy vjec"
    }
  });
