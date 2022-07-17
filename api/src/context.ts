import { PrismaClient } from "@prisma/client";
import { decodeAuthHeader } from "./utils/auth";
import { Request } from "express";
import { languagesObject } from "./utils";
import { PubSub } from "graphql-subscriptions";

export const prisma = new PrismaClient();
export const pubsub = new PubSub();

export interface Context {
  prisma: PrismaClient;
  userId?: number;
  pubsub: PubSub;
}

// run this once after db is initialized.
// todo: if we gonna manage this info in db, this should be through migration

// (async () => {
//   await prisma.skill.createMany({
//     data: languagesObject,
//   });
// })();

export const context = ({ req }: { req: Request }): Context => {
  const token =
    req && req.headers.authorization
      ? decodeAuthHeader(req.headers.authorization)
      : null;

  return {
    prisma,
    userId: token?.userId,
    pubsub,
  };
};
