import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import { User as UserType } from "@prisma/client";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id");
    // TODO createdAt
    t.nonNull.string("name");
    t.nonNull.int("matchingPoint");
    t.nonNull.string("githubId");
    t.nonNull.string("githubLogin");
    t.nonNull.string("bio");
    t.nonNull.list.nonNull.field("driverPost", {
      type: "Post",
      resolve(parent, _args, context) {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .driverPost();
      },
    });
    t.nonNull.list.nonNull.field("navigatorPost", {
      type: "Post",
      resolve(parent, args, context) {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .navigatorPost();
      },
    });
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("users", {
      type: "User",
      resolve(parent, args, context) {
        return context.prisma.user.findMany();
      },
    });
    t.field("user", {
      type: "User",
      args: {
        id: nonNull(intArg()),
      },
      resolve(parent, args, context) {
        const { id } = args;
        return context.prisma.user.findUnique({
          where: { id },
        });
      },
    });
    t.nonNull.field("me", {
      type: "User",
      async resolve(parent, args, context) {
        const { userId } = context;

        if (!userId) {
          throw new Error("You have to log in.");
        }

        const user = await context.prisma.user.findUnique({
          where: { id: userId },
        });
        return user as UserType;
      },
    });
  },
});

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateMe", {
      type: "User",
      args: {
        name: stringArg(),
        bio: stringArg(),
      },
      async resolve(parent, args, context) {
        const { name, bio } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error("You have to log in.");
        }

        const oldMe = (await context.prisma.user.findUnique({
          where: { id: userId },
        })) as UserType;

        const updatedMe = context.prisma.user.update({
          where: { id: userId },
          data: {
            name: name ?? oldMe.name,
            bio: bio ?? oldMe.bio,
          },
        });

        return updatedMe;
      },
    });
  },
});
