import { emailTransporter } from "./email-transporter";

export const sendVarificationEmail = async (email: string, token: string) =>{
    const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: "Verify Your Email - ManageX",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #dddddd; border-radius: 10px; background-color: #f9f9f9;">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="https://res.cloudinary.com/dajairt5h/image/upload/v1723884108/manageXLogo_z4fj1v.png" alt="ManageX Logo" style="width: 150px; margin-bottom: 20px;">
            </div>
            <h2 style="color: #4B0082; text-align: center;">Verify Your Email</h2>
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Hi there,
            </p>
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Thank you for signing up for ManageX. To complete your registration, please verify your email address by clicking the button below:
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationLink}" style="background-color: #7F00FF; color: #ffffff; padding: 12px 25px; font-size: 16px; text-decoration: none; border-radius: 5px;">
                Verify Email
              </a>
            </div>
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              If you did not create an account with ManageX, please ignore this email.
            </p>
            <p style="color: #666; font-size: 14px; line-height: 1.6; margin-top: 40px;">
              Regards,<br>
              The ManageX Team
            </p>
            <hr style="border: none; border-top: 1px solid #dddddd; margin: 40px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">
              ManageX, Inc. | 1234 Your Street, Your City, Your Country
            </p>
          </div>
        `,
      };
      console.log("===========")
      await emailTransporter.sendMail(mailOptions);
} 