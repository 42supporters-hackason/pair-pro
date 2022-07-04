import { objectType } from "nexus"

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.nonNull.int("id");
    // TODO createdAt
    t.nonNull.string("description");
    t.nonNull.string("title");
  }
}) 
