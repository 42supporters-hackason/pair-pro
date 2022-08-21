import { Skill } from "@prisma/client";
import { extendType, objectType } from "nexus";
import { Context } from "../context";

export const LearnedSkill = objectType({
  name: "LearnedSkill",
  definition(t) {
    t.nonNull.int("count");
    t.nonNull.field("skill", { type: "Skill" });
  },
});

interface countObject {
  [key: number]: number;
}

interface learnedSkillsCountObject {
  count: number;
  skill: Skill;
}

// 集計処理
// skill idをkey, intをvalueとして走査し、incrementする
function countSkillsUsedOnPosts(skillsOfAllPosts: Skill[]): countObject {
  const counts: countObject = {};
  for (let i = 0; i < skillsOfAllPosts.length; ++i) {
    const skill = skillsOfAllPosts[i];
    const id: number = skill.id;
    if (counts[id]) {
      counts[id]++;
    } else {
      counts[id] = 1;
    }
  }
  return counts;
}

// TODO N + 1 問題
async function formatForLearnedSkillObject(
  context: Context,
  counts: countObject
) {
  let learnedSkills: learnedSkillsCountObject[] = [];
  for (let skillId in counts) {
    learnedSkills.push({
      count: counts[skillId],
      skill: (await context.prisma.skill.findUnique({
        where: { id: Number(skillId) },
      })) as Skill,
    });
  }
  return learnedSkills;
}

export const LearnedSkillQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("ListNavigatedSkills", {
      type: "LearnedSkill",
      async resolve(parent, args, context) {
        const { profileId } = context.expectUserJoinedCommunity();
        const posts = await context.prisma.post.findMany({
          where: { navigatorId: profileId },
          include: { requiredSkills: true },
        });

        const skillsOfAllPosts = posts.map((post) => post.requiredSkills);
        const counts: countObject = countSkillsUsedOnPosts(
          skillsOfAllPosts.flat(1)
        );

        // 集計結果を適切な形式に直す
        // とりあえず形式をreturn objectTypeに揃えて配列に突っ込む
        let learnedSkills: learnedSkillsCountObject[] =
          await formatForLearnedSkillObject(context, counts);

        // count順でsortする
        learnedSkills.sort((a, b) => b.count - a.count);
        return learnedSkills;
      },
    }),
      t.nonNull.list.nonNull.field("ListDrivenSkills", {
        type: "LearnedSkill",
        async resolve(parent, args, context) {
          const { profileId } = context.expectUserJoinedCommunity();
          const posts = await context.prisma.post.findMany({
            where: { driverId: profileId },
            include: { requiredSkills: true },
          });

          const skillsOfAllPosts = posts.map((post) => post.requiredSkills);
          const counts: countObject = countSkillsUsedOnPosts(
            skillsOfAllPosts.flat(1)
          );

          let learnedSkills: learnedSkillsCountObject[] =
            await formatForLearnedSkillObject(context, counts);

          learnedSkills.sort((a, b) => b.count - a.count);
          return learnedSkills;
        },
      });
  },
});
