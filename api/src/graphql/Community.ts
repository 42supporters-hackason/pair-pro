import { User } from "@prisma/client";
import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";

export const Community = objectType({
  name: "Community",
  definition(t) {
    t.nonNull.string("id");
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

    // List communities that user has
    // t.nonNull.list.nonNull.field("listCommunities", {
    //   type: "Community",
    //   async resolve(parent, args, context) {
    //     // auth の id を取得して特定したら、持っているUser一覧を取得
    //     // 各UserからCommunityを取得し、一覧にまとめる
    //   }
    // });
  },
})

export const CommunityMutation = extendType({
  type: "Mutation",
  definition(t) {
    // Create community
    t.nonNull.field("createCommunity", {
      type: "Community",
      args: {
        name: nonNull(stringArg())
      },
      resolve(parent, args, context) {
        const { userId } = context;
        if (!userId) {
          throw new Error("You have to log in");
        }
        return context.prisma.community.create({
          data: {
            name: args.name,
            users: {
              connect: { id: userId }
            }
          }
        })
      }
    });

    // Update community name
    t.nonNull.field("updateCommunity", {
      type: "Community",
      args: {
        id: nonNull(intArg()),
        name: nonNull(stringArg())
      },
      resolve(parent, args, context) {
        const { userId } = context;
        if (!userId) {
          throw new Error("You have to log in");
        }
        return context.prisma.community.update({
          where: { id: args.id },
          data: {
            name: args.name,
          }
        })
      }
    });

    // Belong community
    t.nonNull.field("belongCommunity", {
      type: "Community",
      args: {
        communityId: nonNull(intArg()),
      },
      resolve(parent, args, context) {
        const { userId } = context;
        const  { communityId } = args;
        if (!userId) {
          throw new Error("You have to log in");
        }
        return context.prisma.user.update({
          where: { id: userId },
          data: {
            communityId: communityId
          }
        })
      }
    });

    // Delete community
    t.nonNull.field("deleteCommunity", {
      type: "Community",
      args: {
        communityId: nonNull(intArg()),
      },
      resolve(parent, args, context) {
        const { userId } = context;
        const  { communityId } = args;
        if (!userId) {
          throw new Error("You have to log in");
        }
        return context.prisma.community.delete({
          where: { id: communityId },
        })
      }
    })
  },
})
