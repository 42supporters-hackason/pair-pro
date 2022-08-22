import { PrismaClient } from "@prisma/client";
import { decodeAuthHeader } from "./utils/auth";
import { Request } from "express";
import { PubSub } from "graphql-subscriptions";

export const prisma = new PrismaClient();
export const pubsub = new PubSub();

export interface Context {
  prisma: PrismaClient;
  userId?: number;
  profileId?: number;
  communityId?: string;
  pubsub: PubSub;
  expectUserLoggedIn(): Context;
  expectUserJoinedCommunity(): Context;
}

export const context = ({ req }: { req: Request }): Context => {
  const token =
    req && req.headers.authorization
      ? decodeAuthHeader(req.headers.authorization)
      : null;

  return {
    prisma,
    userId: token?.userId,
    profileId: token?.profileId,
    communityId: token?.communityId,
    pubsub,
    expectUserLoggedIn(): Context {
      if (!this.userId) {
        throw new Error("You have to log in");
      }
      return this;
    },
    expectUserJoinedCommunity(): Context {
      if (!this.userId || !this.profileId || !this.communityId) {
        throw new Error("You have to join a community");
      }
      return this;
    },
  };
};
