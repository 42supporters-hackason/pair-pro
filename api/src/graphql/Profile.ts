import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import { Community, Profile, User } from "@prisma/client";
export const defaultMatchingPoint = 3;
import { jwtKey } from "../utils/auth";
import * as jwt from "jsonwebtoken";

export const ProfileObject = objectType({
  name: "Profile",
  definition(t) {
    t.nonNull.int("id");
    // TODO createdAt
    t.nonNull.string("name");
    t.nonNull.int("matchingPoint");
    t.nonNull.string("bio");
    t.nonNull.list.nonNull.field("driverPost", {
      type: "Post",
      resolve(parent, _args, context) {
        return context.prisma.profile
          .findUnique({
            where: { id: parent.id },
          })
          .driverPost();
      },
    });
    t.nonNull.list.nonNull.field("navigatorPost", {
      type: "Post",
      resolve(parent, args, context) {
        return context.prisma.profile
          .findUnique({
            where: { id: parent.id },
          })
          .navigatorPost();
      },
    });
    t.nonNull.field("user", {
      type: "User",
      async resolve(parent, _args, context) {
        return (await context.prisma.profile
          .findUnique({
            where: { id: parent.id },
          })
          .user()) as User;
      },
    });
    t.nonNull.field("community", {
      type: "Community",
      async resolve(parent, args, context) {
        return (await context.prisma.profile
          .findUnique({
            where: { id: parent.id },
          })
          .community()) as Community;
      },
    });
    t.nonNull.list.nonNull.field("createdCommunities", {
      type: "Community",
      resolve(parent, args, context) {
        return context.prisma.profile
          .findUnique({
            where: { id: parent.id },
          })
          .createdCommunities();
      }
    })
  },
});

export const PaginatedProfilesObject = objectType({
  name: "PaginatedProfiles",
  definition(t) {
    t.nonNull.list.nonNull.field("profiles", { type: ProfileObject });
    t.nonNull.int("count");
  },
});

export const ProfileQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("profiles", {
      type: "Profile",
      resolve(parent, args, context) {
        return context.prisma.profile.findMany();
      },
    });
    t.field("profile", {
      type: "Profile",
      args: {
        id: nonNull(intArg()),
      },
      resolve(parent, args, context) {
        const { id } = args;
        return context.prisma.profile.findUnique({
          where: { id },
        });
      },
    });
    t.nonNull.field("myProfile", {
      type: "Profile",
      async resolve(parent, args, context) {
        const { profileId } = context.expectUserJoinedCommunity();

        const profile = await context.prisma.profile.findUnique({
          where: { id: profileId },
        });
        return profile as Profile;
      },
    });
    t.nonNull.field("profilesInMyCommunity", {
      type: "PaginatedProfiles",
      args: {
        skip: intArg(),
        take: intArg(),
      },
      async resolve(parent, args, context) {
        const { communityId } = context.expectUserJoinedCommunity();
        const { skip, take } = args;

        const profiles = await context.prisma.profile.findMany({
          where: { communityId },
          skip: skip as number | undefined,
          take: take as number | undefined,
        });
        const count = await context.prisma.profile.count({
          where: { communityId },
        });

        return { profiles, count };
      },
    });
  },
});

export const ProfileMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateMyProfile", {
      type: "Profile",
      args: {
        name: stringArg(),
        bio: stringArg(),
      },
      async resolve(parent, args, context) {
        const { name, bio } = args;
        const { profileId } = context.expectUserJoinedCommunity();

        const oldMyProfile = (await context.prisma.profile.findUnique({
          where: { id: profileId },
        })) as Profile;

        const updatedMyProfile = context.prisma.profile.update({
          where: { id: profileId },
          data: {
            name: name ?? oldMyProfile.name,
            bio: bio ?? oldMyProfile.bio,
          },
        });

        return updatedMyProfile;
      },
    });
    t.field("deleteMyProfile", {
      type: "AuthPayLoad",
      async resolve(parent, args, context) {
        const { userId, profileId } = context.expectUserJoinedCommunity();

        await context.prisma.profile.delete({
          where: { id: profileId },
        });

        const me = (await context.prisma.user.findUnique({
          where: { id: userId },
        })) as User;

        const token = jwt.sign({ userId }, jwtKey);

        return { token, user: me };
      },
    });
  },
});
