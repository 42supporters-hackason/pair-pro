import { Profile } from "@prisma/client";
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
      type: "Profile",
      resolve(parent, args, context) {
        return context.prisma.post
          .findUnique({ where: { id: parent.id } })
          .navigator();
      },
    });
    t.field("driver", {
      type: "Profile",
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

    t.nonNull.list.nonNull.field("unmatchedPosts", {
      type: "Post",
      args: {
        driverNameFilter: stringArg(),
        requiredSkillsFilter: intArg(),
        skip: intArg(),
        take: intArg(),
      },
      async resolve(parent, args, context) {
        const { profileId, communityId } = context.expectUserJoinedCommunity();
        const { driverNameFilter, requiredSkillsFilter, skip, take } = args;

        const profileIds = (
          await context.prisma.profile.findMany({
            where: { communityId },
          })
        ).map((p) => p.id);

        let where: {
          [prop: string]: any;
        } = {
          navigatorId: null,
          driverId: {
            in: profileIds,
            not: profileId,
          },
        };

        if (driverNameFilter) {
          where.driver = {
            is: {
              name: {
                contains: driverNameFilter,
              },
            },
          };
        }
        if (requiredSkillsFilter) {
          where.requiredSkills = {
            some: {
              id: {
                in: requiredSkillsFilter,
              },
            },
          };
        }

        return context.prisma.post.findMany({
          where,
          skip: skip as number | undefined,
          take: take as number | undefined,
        });
      },
    });

    t.nonNull.list.nonNull.field("myDrivingPosts", {
      type: "Post",
      resolve(parent, args, context) {
        const { profileId } = context.expectUserJoinedCommunity();

        return context.prisma.post.findMany({
          where: {
            navigatorId: null,
            driverId: profileId,
          },
        });
      },
    });

    t.nonNull.list.nonNull.field("myMatchedPosts", {
      type: "Post",
      resolve(parent, args, context) {
        const { profileId } = context.expectUserJoinedCommunity();

        return context.prisma.post.findMany({
          where: {
            OR: [{ navigatorId: profileId }, { driverId: profileId }],
            navigatorId: { not: null },
            driverId: { not: null },
            completedAt: null,
          },
        });
      },
    });

    t.nonNull.list.nonNull.field("myCompletedPosts", {
      type: "Post",
      resolve(parent, args, context) {
        const { profileId } = context;
        if (!profileId) {
          throw new Error("You have to log in");
        }
        return context.prisma.post.findMany({
          where: {
            OR: [{ navigatorId: profileId }, { driverId: profileId }],
            navigatorId: { not: null },
            driverId: { not: null },
            completedAt: { not: null },
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
        const { profileId } = context.expectUserJoinedCommunity();

        const profile = (await context.prisma.profile.findUnique({
          where: { id: profileId },
        })) as Profile;
        if (profile.matchingPoint < 1) {
          throw new Error(
            "You have to have at least 1 matching point to create a new post"
          );
        }

        // todo(takumi): use transaction
        await context.prisma.profile.update({
          where: { id: profileId },
          data: { matchingPoint: profile.matchingPoint - 1 },
        });

        return context.prisma.post.create({
          data: {
            description,
            title,
            requiredSkills: {
              connect: requiredSkillsId.map((id) => ({ id })),
            },
            driver: { connect: { id: profileId } },
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
        const { profileId } = context.expectUserJoinedCommunity();

        // check if the post exists
        const postToDelete = await context.prisma.post.findUnique({
          where: { id: postId },
        });
        if (!postToDelete) {
          throw new Error("There is no such post");
        }

        // check if the post is createdBy the user
        if (postToDelete.driverId !== profileId) {
          throw new Error("You do not have rights to update this post");
        }

        // return matching point
        const profile = (await context.prisma.profile.findUnique({
          where: { id: profileId },
        })) as Profile;
        await context.prisma.profile.update({
          where: { id: profileId },
          data: { matchingPoint: profile.matchingPoint + 1 },
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
        const { profileId } = context.expectUserJoinedCommunity();

        // check if the post exists
        const post = await context.prisma.post.findUnique({
          where: { id: id },
          include: { requiredSkills: true },
        });
        if (!post) {
          throw new Error("There is no such post");
        }

        // check if the post is createdBy the user
        if (post.driverId !== profileId) {
          throw new Error("You do not have rights to update this post");
        }

        const data: { [key: string]: any } = {
          title: title,
          description: description,
        };

        // dataのupdateがあるときは、既存で持っているデータをdisconnectしてから
        // connectで新しいdataに更新する。requiredSkillsIdsがnullのときは変化なし
        if (requiredSkillsIds) {
          data.requiredSkills = {
            disconnect: post.requiredSkills?.map((skill) => ({ id: skill.id })),
            connect: requiredSkillsIds?.map((id) => ({ id })),
          };
        }

        return context.prisma.post.update({
          where: { id },
          data,
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
        const { profileId } = context.expectUserJoinedCommunity();


        // check if the post exists
        const post = await context.prisma.post.findUnique({
          where: { id: postId },
          include: { driver: true }
        });
        if (!post) {
          throw new Error("There is no such post");
        }

        // check if post's navigator already exists
        if (post.navigatorId) {
          throw new Error("There is a registered navigator already");
        }

        // check if the navigator exists
        const navigator = await context.prisma.profile.findUnique({
          where: { id: navigatorId },
        });
        if (!navigator) {
          throw new Error("There is no such navigator");
        }

        // check if the navigator belongs to the same community
        if (post.driver?.communityId != communityId) {
          throw new Error("Navigator does not belong to the same community");
        }

        // increment navigator's matching point
        await context.prisma.profile.update({
          where: { id: navigatorId },
          data: { matchingPoint: navigator.matchingPoint + 1 },
        });

        // update navigator
        return context.prisma.post.update({
          where: { id: postId },
          data: {
            navigator: { connect: { id: navigatorId } },
          },
        });
      },
    });

    t.nonNull.field("completePairProgramming", {
      type: "Post",
      args: {
        postId: nonNull(stringArg()),
      },
      async resolve(parent, args, context) {
        const { postId } = args;
        const { userId, profileId } = context;

        if (!userId) {
          throw new Error("You have to log in");
        } else if (!profileId) {
          throw new Error("You have to be in the community");
        }

        const post = await context.prisma.post.findUnique({
          where: { id: postId },
        });

        if (!post) {
          throw new Error("There is no such Post");
        } else if (
          !(profileId == post.driverId || profileId == post.navigatorId)
        ) {
          throw new Error("You do not have rights to complete this post.");
        } else if (post.navigatorId == null) {
          throw new Error("This post is not matched yet.");
        } else if (post.completedAt != null) {
          throw new Error("This post is already completed.");
        }

        return context.prisma.post.update({
          where: { id: postId },
          data: {
            completedAt: new Date(),
          },
        });
      },
    });
  },
});
