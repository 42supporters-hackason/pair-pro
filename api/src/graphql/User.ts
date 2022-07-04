import { extendType, objectType } from "nexus"

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id");
    // TODO createdAt
    t.nonNull.string("name");
    t.nonNull.int("matchingPoint");
    t.nonNull.string("githubId");
    t.nonNull.string("bio");
  }
})
