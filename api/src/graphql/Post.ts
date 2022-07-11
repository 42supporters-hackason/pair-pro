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

        const requiredSkills = await context.prisma.skill.findMany({
          where: {
            id: {
              in: requiredSkillsId,
            },
          },
        });
        const newPost = context.prisma.post.create({
          data: {
            description: args.description,
            title: args.title,
            requiredSkills: {
              create: requiredSkills,
            },
            driver: { connect: { id: context.userId } },
          },
        });
        return newPost;
      },
    });
  },
});
