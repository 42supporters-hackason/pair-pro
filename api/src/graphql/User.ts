import { objectType } from "nexus";

export const UserObject = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("githubId");
    t.nonNull.string("githubLogin");
    t.nonNull.string("githubBio");
    t.nonNull.list.nonNull.field("profiles", {
      type: "Profile",
      resolve(parent, _args, context) {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .profiles();
      },
    });
  },
});
