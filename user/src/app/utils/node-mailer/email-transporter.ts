import nodemailer from "nodemailer"

export const emailTransporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
        user: "testerr92@outlook.com",
        pass: "Pass4455",
    }
});