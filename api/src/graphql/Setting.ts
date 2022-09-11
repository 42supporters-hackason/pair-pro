import { booleanArg, extendType, objectType } from "nexus";

export const SettingObject = objectType({
  name: "Setting",
  definition(t) {
    t.nonNull.boolean("sendEmailOnMatching");
  },
});

export const SettingMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("UpdateUserSettings", {
      type: "Setting",
      args: {
        sendEmailOnMatching: booleanArg(),
      },
      resolve(parent, args, context) {
        const { userId } = context.expectUserLoggedIn();
        const { sendEmailOnMatching } = args;
        const data: { [key: string]: any } = {
          sendEmailOnMatching,
        };
        return context.prisma.setting.upsert({
          where: { userId },
          update: data,
          create: {
            userId,
            ...data
          },
        });
      },
    });
  },
});
