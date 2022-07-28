import { PrismaClient } from "@prisma/client";
import { decodeAuthHeader } from "./utils/auth";
import { Request } from "express";
import { PubSub } from "graphql-subscriptions";

export const prisma = new PrismaClient();
export const pubsub = new PubSub();

export interface Context {
  prisma: PrismaClient;
  authId?: number;
  userId?: number;
  communityId?: number;
  pubsub: PubSub;
}

export const context = ({ req }: { req: Request }): Context => {
  const token =
    req && req.headers.authorization
      ? decodeAuthHeader(req.headers.authorization)
      : null;

  return {
    prisma,
    authId: token?.authId,
    userId: token?.userId,
    communityId: token?.communityId,
    pubsub,
  };
};
