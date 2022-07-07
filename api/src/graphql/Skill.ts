import { extendType, objectType } from "nexus";
import { languagesObject } from "../utils";

export const Skill = objectType({
  name: "Skill",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
  },
});

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
