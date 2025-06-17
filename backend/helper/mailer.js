import nodemailer from 'nodemailer'
import {Lead} from "../models/lead.model.js";
import bcryptjs from "bcryptjs";



export const sendMail = async ({email, emailType, userId}) => {
    try {

        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        if (emailType === "VERIFY"){
            await Lead.findByIdAndUpdate(userId, {
                verificationToken: hashedToken,
                verificationTokenExpiry: Date.now()+3600000
            })
        }
        else if (emailType === "RESET"){
            await Lead.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now()+3600000
            })
        }

        const transporter = nodemailer.createTransport({
            // host: "sandbox.smtp.mailtrap.io",
            service: 'gmail',
            secure: true,
            port: 465,
            auth: {
                user: process.env.USER, // generated ethereal user
                pass: process.env.PASS, // generated ethereal password
            }
        });

        const mailOptions = {
            from: process.env.FROM, // sender address
            to: email, // list of receivers
            subject: emailType==='VERIFY'?'Verify your email':'Reset Your password', // Subject line
            html:`
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e2e2; border-radius: 8px; padding: 20px; background-color: #ffffff;">
  <p style="font-size: 18px; color: #333333; margin-bottom: 20px;">
    Click 
    <a href="${process.env.DOMAIN}/crm/verify-email?token=${hashedToken}" style="color: #1a73e8; text-decoration: none; font-weight: bold;">
      here
    </a> 
    to ${emailType === 'VERIFY' ? 'verify your email address' : 'reset your password'}.
  </p>
  
  <p style="font-size: 16px; color: #555555;">
    Or copy and paste this link into your browser:
  </p>

  <p style="word-break: break-all; background-color: #f2f2f2; padding: 10px; border-radius: 4px; font-size: 14px; color: #0066cc;">
    ${process.env.DOMAIN}/crm/verify-email?token=${hashedToken}
  </p>
</div>


`, // html body
        }
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);


    } catch (error) {
        console.log("Error sending mail", error);
    }
}
/*

 */