import { extendType, objectType } from "nexus"

export const Message = objectType({
  name: "Message",
  definition(t) {
    t.nonNull.int("id");
    // TODO createdAt
    t.nonNull.string("content");
  }
})
