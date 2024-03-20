import nodemailer from "nodemailer";
import { Request, Response } from "express";
import { CommonErrors } from "../utils/common-errors";

// POST /
export const sendEmail = async (request: Request, response: Response) => {
  try {
    const { to, subject, text } = request.body;

    if (!to || !subject || !text) {
      return response.status(400).json({ error: CommonErrors.MissingFields });
    }
    console.log(process.env.EMAIL);
    console.log(process.env.EMAIL_PASSWORD);

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    return response.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error });
  }
};
