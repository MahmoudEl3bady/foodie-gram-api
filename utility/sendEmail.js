import nodemailer from "nodemailer";
import { customError } from "./customError.js";

/**
 * Sends an email using the provided email, subject, and body.
 *
 * @param {string} email - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} body - The HTML content of the email.
 * @return {Promise<void>} A promise that resolves when the email is sent successfully.
 */
export const sendEmail = async (email, subject, body) => {
  if (!process.env.EMAIL || !process.env.E_PASSWORD) {
    throw new Error("Email or password not set");
  }
  console.log("HEOEJOE", process.env.EMAIL, process.env.E_PASSWORD);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "melabady199@gmail.com",
      pass: "kbcx tipy tpeb ozab",
    },
  });

  const mailOptions = {
    from: {
      name: "Walter White",
      address:" melabady199@gmail.com",
    },
    to: email,
    subject: subject,
    html: body,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (err) {
    throw new customError("Error sending email", 500);
}
};
