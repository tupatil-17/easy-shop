import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error("JWT secrets are not defined in environment variables");
}

const ACCESS_TOKEN_EXPIRES_IN = "30m";
const REFRESH_TOKEN_EXPIRES_IN = "4d";

export interface TokenPayload extends JwtPayload {
  userId: string;
  role: "user" | "service_provider" | "admin";
}

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(
    { userId: payload.userId, role: payload.role },
    ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
  );
};

export const verifyAccessToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;
  } catch {
    throw new Error("Invalid or expired access token");
  }
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(
    { userId: payload.userId, role: payload.role },
    REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
  );
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload;
  } catch {
    throw new Error("Invalid or expired refresh token");
  }
};
