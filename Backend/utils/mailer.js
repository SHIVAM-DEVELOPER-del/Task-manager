import nodemailer from "nodemailer";

// Reusable SMTP transporter, configured from environment variables.
// Works with Gmail (with an App Password) or any other SMTP provider.
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: Number(process.env.EMAIL_PORT) === 465, // true for port 465, false for others
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpEmail = async (toEmail, otp, userName = "") => {
  // If email credentials aren't configured yet, don't crash the request —
  // log the OTP to the server console so local development still works.
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn(
      `[mailer] EMAIL_USER/EMAIL_PASS not set. OTP for ${toEmail} is: ${otp}`
    );
    return;
  }

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: toEmail,
    subject: "Your Task Manager password reset code",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto;">
        <h2 style="color:#2563eb;">Reset your password</h2>
        <p>Hi ${userName || "there"},</p>
        <p>Use the code below to reset your Task Manager password. This code expires in 10 minutes.</p>
        <p style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1e293b;">${otp}</p>
        <p>If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  });
};

export default transporter;
