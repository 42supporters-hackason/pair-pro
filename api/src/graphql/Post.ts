import { User } from "@prisma/client";
import {
  extendType,
  intArg,
  nonNull,
  objectType,
  stringArg,
  list,
} from "nexus";

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.dateTime("createdAt");
    t.nonNull.string("description");
    t.nonNull.string("title");
    t.dateTime("completedAt");
    t.field("navigator", {
      type: "User",
      resolve(parent, args, context) {
        return context.prisma.post
          .findUnique({ where: { id: parent.id } })
          .navigator();
      },
    });
    t.field("driver", {
      type: "User",
      resolve(parent, args, context) {
        return context.prisma.post
          .findUnique({ where: { id: parent.id } })
          .driver();
      },
    });
    t.nonNull.list.nonNull.field("requiredSkills", {
      type: "Skill",
      resolve(parent, args, context) {
        return context.prisma.post
          .findUnique({ where: { id: parent.id } })
          .requiredSkills();
      },
    });
    t.nonNull.list.nonNull.field("messages", {
      type: "Message",
      resolve(parent, args, context) {
        return context.prisma.post
          .findUnique({ where: { id: parent.id } })
          .messages();
      },
    });
  },
});

export const PostQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("feed", {
      type: "Post",
      resolve(parent, args, context) {
        return context.prisma.post.findMany();
      },
    });
    t.field("post", {
      type: "Post",
      args: {
        id: nonNull(intArg()),
      },
      resolve(parent, args, context) {
        const { id } = args;
        return context.prisma.post.findUnique({
          where: { id },
        });
      },
    });
    t.nonNull.list.field("unmatchedPosts", {
      type: "Post",
      resolve(parent, args, context) {
        return context.prisma.post.findMany({
          where: { navigatorId: null },
        });
      },
    });
  },
});

export const PostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("post", {
      type: "Post",
      args: {
        description: nonNull(stringArg()),
        title: nonNull(stringArg()),
        requiredSkillsId: nonNull(list(nonNull(intArg()))),
      },
      async resolve(parent, args, context) {
        const { description, title, requiredSkillsId } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error("You have to log in");
        }

        const user = (await context.prisma.user.findUnique({
          where: { id: userId },
        })) as User;
        if (user.matchingPoint == 0) {
          throw new Error(
            "You have to have at least 1 matching point to create a new post"
          );
        }

        // todo: when there is no 'await', update does not occur
        await context.prisma.user.update({
          where: { id: userId },
          data: { matchingPoint: user.matchingPoint - 1 },
        });

        return context.prisma.post.create({
          data: {
            description,
            title,
            requiredSkills: {
              connect: requiredSkillsId.map((id) => ({ id })),
            },
            driver: { connect: { id: userId } },
          },
        });
      },
    });
  },
});
