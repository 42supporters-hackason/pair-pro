import { extendType, objectType } from "nexus"

export const Skill = objectType({
  name: "Skill",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
  }
})
