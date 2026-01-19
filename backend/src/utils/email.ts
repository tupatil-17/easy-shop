// backend/src/utils/email.ts

export const sendOTPEmail = async (
  email: string,
  otp: string,
  type: 'register' | 'login'
) => {
  if (process.env.DEV_MODE === 'true') {
    console.log('======================================');
    console.log('OTP GENERATED (DEV MODE)');
    console.log('Email:', email);
    console.log('Type:', type);
    console.log('OTP:', otp);
    console.log('======================================');
    return;
  }

  throw new Error('Email service not configured');
};

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
