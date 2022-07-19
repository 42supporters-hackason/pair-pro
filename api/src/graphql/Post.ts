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
    t.nonNull.string("id");
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
        id: nonNull(stringArg()),
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
        const { userId } = context;
        if (!userId) {
          throw new Error("You have to log in");
        }

        return context.prisma.post.findMany({
          where: {
            navigatorId: null,
            driverId: {
              not: userId,
            },
          },
        });
      },
    });
    t.nonNull.list.nonNull.field("myDrivingPosts", {
      type: "Post",
      resolve(parent, args, context) {
        const { userId } = context;
        if (!userId) {
          throw new Error("You have to log in");
        }

        return context.prisma.post.findMany({
          where: {
            navigatorId: null,
            driverId: userId,
          },
        });
      },
    });
    t.nonNull.list.nonNull.field("myMatchedPosts", {
      type: "Post",
      resolve(parent, args, context) {
        const { userId } = context;
        if (!userId) {
          throw new Error("You have to log in");
        }

        return context.prisma.post.findMany({
          where: {
            OR: [{ navigatorId: userId }, { driverId: userId }],
            navigatorId: { not: null },
            driverId: { not: null },
          },
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
        if (user.matchingPoint < 1) {
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

    t.nonNull.field("deletePost", {
      type: "Post",
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(parent, args, context) {
        const postId = args.id;
        const { userId } = context;

        if (!userId) {
          throw new Error("You have to log in");
        }

        // check if the post exists
        const postToDelete = await context.prisma.post.findUnique({
          where: { id: postId },
        });
        if (!postToDelete) {
          throw new Error("There is no such post");
        }

        // check if the post is createdBy the user
        if (postToDelete.driverId !== userId) {
          throw new Error("You do not have rights to update this post");
        }

        // return matching point
        const user = (await context.prisma.user.findUnique({
          where: { id: userId },
        })) as User;
        await context.prisma.user.update({
          where: { id: userId },
          data: { matchingPoint: user.matchingPoint + 1 },
        });

        return context.prisma.post.delete({
          where: { id: postId },
        });
      },
    });

    t.nonNull.field("updatePost", {
      type: "Post",
      args: {
        id: nonNull(stringArg()),
        title: stringArg(),
        description: stringArg(),
        requiredSkillsIds: list(intArg()),
      },
      async resolve(parent, args, context) {
        const { id, title, description, requiredSkillsIds } = args;
        const { userId } = context;
        if (!userId) {
          throw new Error("You have to log in");
        }

        // check if the post exists
        const post = await context.prisma.post.findUnique({
          where: { id: id },
        });
        if (!post) {
          throw new Error("There is no such post");
        }

        // check if the post is createdBy the user
        if (post.driverId !== userId) {
          throw new Error("You do not have rights to update this post");
        }

        return context.prisma.post.update({
          where: { id: id },
          data: {
            title: title as string,
            description: description as string,
            // requiredSkills: {
            //   connect: requiredSkillsIds.map(id => ({ id })),
            // }
          },
        });
      },
    });

    t.nonNull.field("registerNavigator", {
      type: "Post",
      args: {
        postId: nonNull(stringArg()),
        navigatorId: nonNull(intArg()),
      },
      async resolve(parent, args, context) {
        const { postId, navigatorId } = args;
        const { userId } = context;

        if (!userId) {
          throw new Error("You have to log in");
        }

        // check if the post exists
        const post = await context.prisma.post.findUnique({
          where: { id: postId },
        });
        if (!post) {
          throw new Error("There is no such post");
        }

        // check if post's navigator already exists
        if (post.navigatorId) {
          throw new Error("There is a registered navigator already");
        }

        // check if the navigator exists
        const navigator = await context.prisma.user.findUnique({
          where: { id: navigatorId },
        });
        if (!navigator) {
          throw new Error("There is no such navigator");
        }

        // increment navigator's matching point
        await context.prisma.user.update({
          where: { id: navigatorId },
          data: { matchingPoint: navigator.matchingPoint + 1 },
        });

        // update navigator and completedAt
        return context.prisma.post.update({
          where: { id: postId },
          data: {
            navigator: { connect: { id: navigatorId } },
            completedAt: new Date(),
          },
        });
      },
    });
  },
});
