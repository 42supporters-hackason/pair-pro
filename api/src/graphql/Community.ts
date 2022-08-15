import { Profile, User } from "@prisma/client";
import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import { jwtKey } from "../utils/auth";
import * as jwt from "jsonwebtoken";
import { defaultMatchingPoint } from "./Profile";

export const Community = objectType({
  name: "Community",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("name");
    t.nonNull.list.nonNull.field("profiles", {
      type: "Profile",
      resolve(parent, args, context) {
        return context.prisma.community
          .findUnique({ where: { id: parent.id } })
          .profiles();
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
      args: {
        skip: intArg(),
        take: intArg(),
      },
      async resolve(parent, args, context) {
        const { userId } = context;
        const { skip, take } = args;
        if (!userId) {
          throw new Error("You have to log in");
        }

        const profiles = await context.prisma.profile.findMany({
          where: { userId },
          include: { community: true },
          skip: skip as number | undefined,
          take: take as number | undefined,
        });

        return profiles.map((profile) => profile.community);
      },
    });

    t.field("myCurrentCommunity", {
      type: "Community",
      resolve(parent, args, context) {
        const { userId, communityId } = context;
        if (!communityId) {
          throw new Error("You are not in community!");
        }

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
      resolve(parent, args, context) {
        const { userId } = context;
        if (!userId) {
          throw new Error("You have to log in");
        }
        return context.prisma.community.create({
          data: {
            name: args.name,
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
        const { userId } = context;
        if (!userId) {
          throw new Error("You have to log in");
        }
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
        const { userId } = context;
        const { communityId } = args;
        if (!userId) {
          throw new Error("You have to log in");
        }

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
        return context.prisma.community.delete({
          where: { id: communityId },
        });
      },
    });
  },
});
