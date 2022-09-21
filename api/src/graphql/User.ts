import { objectType, extendType, stringArg } from "nexus";

export const UserObject = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("githubId");
    t.nonNull.string("githubLogin");
    t.nonNull.string("githubBio");
    t.string("email");
    t.nonNull.list.nonNull.field("profiles", {
      type: "Profile",
      resolve(parent, _args, context) {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .profiles({
            where: { deletedAt: null },
          });
      },
    });
    t.field("setting", {
      type: "Setting",
      resolve(parent, args, context) {
        return context.prisma.setting.findUnique({
          where: { userId: parent.id },
        });
      },
    });
  },
});

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateUser", {
      args: {
        email: stringArg(),
      },
      type: "User",
      async resolve(parent, args, context) {
        const { userId } = context.expectUserLoggedIn();
        const { email } = args;
        return context.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            email: email ?? undefined,
          },
        });
      },
    });
  },
});
