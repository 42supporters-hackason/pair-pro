import { UnsignedInt } from "graphql-scalars/mocks";
import { extendType, intArg, objectType } from "nexus";

export const PopularSkillsCountObject = objectType({
  name: "PopularSkillsCount",
  definition(t) {
    t.nonNull.field("skill", { type: "Skill" });
    t.nonNull.int("count");
  },
});

export const PopularSkillsCountQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("ListPopularSkillsRanking", {
      type: "PopularSkillsCount",
      args: {
        take: intArg(),
      },
      async resolve(parent, args, context) {
        const { communityId } = context.expectUserJoinedCommunity();
        const { take } = args;
        const profiles = await context.prisma.profile.findMany({
          where: { communityId },
        });

        const skills = await context.prisma.skill.findMany({
          include: {
            requiredBy: {
              where: {
                driverId: {
                  in: profiles.map((p) => p.id),
                },
                completedAt: { not: null },
              },
            },
          },
        });

        const formattedSkills = skills
          .sort((a, b) => b.requiredBy.length - a.requiredBy.length)
          .map((skill) => ({
            skill,
            count: skill.requiredBy.length,
          }));
        if (take) {
          return formattedSkills.slice(0, take);
        }
        return formattedSkills;
      },
    });
  },
});
