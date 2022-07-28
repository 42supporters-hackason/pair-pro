import * as jwt from "jsonwebtoken";

export const jwtKey = process.env.JWT_KEY as string;

export interface AuthTokenPayload {
  authId: number;
  userId: number;
  communityId: number;
}

export function decodeAuthHeader(authHeader: string): AuthTokenPayload {
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    throw new Error("No token found");
  }
  return jwt.verify(token, jwtKey) as AuthTokenPayload;
}
