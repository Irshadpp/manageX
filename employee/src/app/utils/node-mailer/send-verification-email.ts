import { emailTransporter } from "./email-transporter";

export const sendVarificationEmail = async (email: string, token: string) => {
  try {
    const verificationLink = `http://localhost:5173/verify-email?token=${token}`;

    console.log("invitation link..........>",verificationLink)

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "You've Been Invited to Join Our company on ManageX",
      html: `
     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #dddddd; border-radius: 10px; background-color: #f9f9f9;">
       <div style="text-align: center; margin-bottom: 30px;">
         <img src="https://res.cloudinary.com/dajairt5h/image/upload/v1723884108/manageXLogo_z4fj1v.png" alt="ManageX Logo" style="width: 150px; margin-bottom: 20px;">
       </div>
       <h2 style="color: #4B0082; text-align: center;">You're Invited to Join ManageX</h2>
       <p style="color: #333; font-size: 16px; line-height: 1.6;">
         Hi there,
       </p>
       <p style="color: #333; font-size: 16px; line-height: 1.6;">
         You've been invited to join our company on ManageX, a platform to manage your company's projects and tasks efficiently.
       </p>
       <p style="color: #333; font-size: 16px; line-height: 1.6;">
         To get started, please verify your email and complete your registration by clicking the button below:
       </p>
       <div style="text-align: center; margin: 30px 0;">
         <a href="${verificationLink}" style="background-color: #7F00FF; color: #ffffff; padding: 12px 25px; font-size: 16px; text-decoration: none; border-radius: 5px;">
           Verify Email & Set Up Your Account
         </a>
       </div>
       <p style="color: #333; font-size: 16px; line-height: 1.6;">
         If you did not expect this invitation, please contact your administrator or ignore this email.
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

    console.log("sending mail............")
    await emailTransporter.sendMail(mailOptions);
    console.log("successfully send the mail.................")
  } catch (error) {
    console.log(error);
  }
};
