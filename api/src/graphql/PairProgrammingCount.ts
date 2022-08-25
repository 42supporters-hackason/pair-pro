import { extendType, objectType } from "nexus";

export const PairProgrammingCountObject = objectType({
  name: "PairProgrammingCount",
  definition(t) {
    t.nonNull.field("profile", { type: "Profile" });
    t.nonNull.int("count");
  },
});

export const PairProgrammingCountQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("ListNavigatorPostsRanking", {
      type: "PairProgrammingCount",
      async resolve(parent, args, context) {
        const { communityId } = context.expectUserJoinedCommunity();

        const profiles = await context.prisma.profile.findMany({
          where: { communityId },
          include: {
            navigatorPost: {
              where: {
                completedAt: { not: null },
              },
            },
          },
        });
        return profiles
          .map((profile) => ({
            profile: profile,
            count: profile.navigatorPost.length,
          }))
          .sort((a, b) => b.count - a.count); // 降順にソート
      },
    });

    t.nonNull.list.nonNull.field("ListDriverPostsRanking", {
      type: "PairProgrammingCount",
      async resolve(parent, args, context) {
        const { communityId } = context.expectUserJoinedCommunity();

        const profiles = await context.prisma.profile.findMany({
          where: { communityId },
          include: {
            driverPost: {
              where: {
                completedAt: { not: null },
              },
            },
          },
        });
        return profiles
          .map((profile) => ({
            profile: profile,
            count: profile.driverPost.length,
          }))
          .sort((a, b) => b.count - a.count); // 降順にソート
      },
    });
  },
});
