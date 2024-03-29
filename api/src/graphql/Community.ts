import { Community, Profile, User } from "@prisma/client";
import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import { jwtKey } from "../utils/auth";
import * as jwt from "jsonwebtoken";
import { defaultMatchingPoint } from "./Profile";

export const CommunityObject = objectType({
  name: "Community",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("name");
    t.nonNull.list.nonNull.field("profiles", {
      type: "Profile",
      resolve(parent, args, context) {
        return context.prisma.community
          .findUnique({ where: { id: parent.id } })
          .profiles({
            where: { deletedAt: null },
          });
      },
    });
    t.field("creator", {
      type: "Profile",
      resolve(parent, args, context) {
        return context.prisma.community
          .findUnique({ where: { id: parent.id } })
          .creator();
      },
    });
  },
});

export const CommunityQuery = extendType({
  type: "Query",
  definition(t) {
    // List all communities
    t.nonNull.list.nonNull.field("communities", {
      type: "Community",
      resolve(parent, args, context) {
        return context.prisma.community.findMany();
      },
    });

    // List communities that user has
    t.nonNull.list.nonNull.field("myCommunities", {
      type: "Community",
      async resolve(parent, args, context) {
        const { userId } = context.expectUserLoggedIn();

        const profiles = await context.prisma.profile.findMany({
          where: {
            AND: [{ userId }, { deletedAt: null }],
          },
          include: { community: true },
        });
        return profiles.map((profile) => profile.community);
      },
    });

    t.field("myCurrentCommunity", {
      type: "Community",
      resolve(parent, args, context) {
        const { communityId } = context.expectUserJoinedCommunity();

        return context.prisma.community.findUnique({
          where: { id: communityId },
        });
      },
    });
  },
});

export const CommunityMutation = extendType({
  type: "Mutation",
  definition(t) {
    // Create community
    t.nonNull.field("createCommunity", {
      type: "Community",
      args: {
        name: nonNull(stringArg()),
      },
      async resolve(parent, args, context) {
        const { userId } = context.expectUserLoggedIn();

        const me = await context.prisma.user.findUnique({
          where: { id: userId },
          include: {
            profiles: {
              include: {
                community: true,
              },
            },
          },
        });
        if (!me) {
          throw new Error("unreachable");
        }
        const profile = await context.prisma.profile.create({
          data: {
            name: me.githubLogin,
            matchingPoint: defaultMatchingPoint,
            bio: me.githubBio,
            user: {
              connect: { id: userId },
            },
            community: {
              create: {
                name: args.name,
              },
            },
          },
        });

        return context.prisma.community.update({
          where: {
            id: profile.communityId,
          },
          data: {
            name: args.name,
            creatorId: profile.id,
          },
        });
      },
    });

    // Update community name
    t.nonNull.field("updateCommunity", {
      type: "Community",
      args: {
        id: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },
      resolve(parent, args, context) {
        return context.prisma.community.update({
          where: { id: args.id },
          data: {
            name: args.name,
          },
        });
      },
    });

    t.nonNull.field("joinCommunity", {
      type: "AuthPayLoad",
      args: {
        communityId: nonNull(stringArg()),
      },
      async resolve(parent, args, context) {
        const { userId } = context.expectUserLoggedIn();
        const { communityId } = args;

        // check if community exists
        const community = await context.prisma.community.findUnique({
          where: { id: communityId },
        });
        if (!community) {
          throw new Error("The community does not exist!");
        }

        // check if user belongs to the community
        const me = await context.prisma.user.findUnique({
          where: { id: userId },
          include: {
            profiles: {
              include: {
                community: true,
              },
            },
          },
        });
        if (!me) {
          throw new Error("unreachable");
        }

        const myProfiles = me.profiles as Profile[];

        let profile = myProfiles.find(
          (profile) => communityId == profile.communityId
        );
        if (!profile) {
          profile = await context.prisma.profile.create({
            data: {
              name: me.githubLogin,
              matchingPoint: defaultMatchingPoint,
              bio: me.githubBio,
              user: {
                connect: { id: userId },
              },
              community: {
                connect: { id: communityId },
              },
            },
          });
        }
        // 一度脱退したコミュニティにもう一度入る場合
        if (!!profile.deletedAt) {
          await context.prisma.profile.update({
            where: { id: profile.id },
            data: { deletedAt: null }
          })
        }

        const token = jwt.sign(
          { userId, communityId, profileId: profile.id },
          jwtKey
        );
        return { token, user: me };
      },
    });

    t.nonNull.field("deleteCommunity", {
      type: "Community",
      args: {
        communityId: nonNull(stringArg()),
      },
      resolve(parent, args, context) {
        const { communityId } = args;
        // todo(takumi) validation
        return context.prisma.community.delete({
          where: { id: communityId },
        });
      },
    });

    t.nonNull.field("updateMyCommunity", {
      type: "Community",
      args: {
        name: stringArg(),
      },
      async resolve(parent, args, context) {
        const { communityId, profileId } = context.expectUserJoinedCommunity();
        const { name } = args;

        const myCommunity = (await context.prisma.community.findUnique({
          where: { id: communityId },
        })) as Community;
        validateOwnership(profileId, myCommunity);

        return context.prisma.community.update({
          where: { id: communityId },
          data: {
            name: name ?? myCommunity.name,
          },
        });
      },
    });
  },
});

const validateOwnership = (profileId: number, community: Community) => {
  if (profileId != community.creatorId) {
    throw new Error("no right to do this");
  }
};
