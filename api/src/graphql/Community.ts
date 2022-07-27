import { User } from "@prisma/client";
import { extendType, objectType } from "nexus";

export const Community = objectType({
  name: "Community",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.list.field("users", {
      type: "User",
      resolve(parent, args, context) {
        return context.prisma.community
          .findUnique({ where: { id: parent.id } })
          .users();
      }
    });
  },
});


export const CommunityQuery = extendType({
  type: "Query",
  definition(t) {
    // List all communities
    t.nonNull.list.nonNull.field("listAllCommunities", {
      type: "Community",
      resolve(parent, args, context) {
        return context.prisma.community.findMany();
      }
    });

  },
})
