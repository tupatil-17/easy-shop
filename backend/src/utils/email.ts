import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTPEmail = async (
  email: string,
  otp: string,
  type: "register" | "login"
) => {
  const subject =
    type === "register"
      ? "Verify Your Email - Easy Shop"
      : "Login OTP - Easy Shop";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #e91e63;">Easy Shop</h2>
      <h3>${type === "register" ? "Email Verification" : "Login Verification"}</h3>
      <p>Your OTP code is:</p>
      <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; color: #e91e63;">
        ${otp}
      </div>
      <p>This OTP will expire in 10 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
    </div>
  `;

  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject,
    html,
  });
};

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
