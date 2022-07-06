import { extendType, objectType } from "nexus";
import json from "../assets/json/languages.json";

export const Skill = objectType({
  name: "Skill",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
  },
});

/**
 * 全ての言語名を持ったオブジェクトの配列
 * idはjsonの順番でそれぞれindexを付与
 */
const languagesObject = json.languages.map((language, index) => ({
  id: index,
  name: language,
}));

export const SkillQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("skills", {
      type: "Skill",
      resolve(parent, args, context, info) {
        return languagesObject;
      },
    });
  },
});
