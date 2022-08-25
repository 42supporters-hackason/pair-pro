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
  expectUserLoggedIn(): UserLoggedInContext;
  expectUserJoinedCommunity(): UserJoinedCommunityContext;
}

interface UserLoggedInContext {
  prisma: PrismaClient;
  pubsub: PubSub;
  userId: number;
}

interface UserJoinedCommunityContext {
  prisma: PrismaClient;
  pubsub: PubSub;
  userId: number;
  profileId: number;
  communityId: string;
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
    expectUserLoggedIn(): UserLoggedInContext {
      if (!this.userId) {
        throw new Error("You have to log in");
      }
      return { prisma: this.prisma, pubsub: this.pubsub, userId: this.userId };
    },
    expectUserJoinedCommunity(): UserJoinedCommunityContext {
      if (!this.userId || !this.profileId || !this.communityId) {
        throw new Error("You have to join a community");
      }
      return {
        prisma: this.prisma,
        pubsub: this.pubsub,
        userId: this.userId,
        profileId: this.profileId,
        communityId: this.communityId,
      };
    },
  };
};
