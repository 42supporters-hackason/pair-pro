import { extendType, objectType, stringArg } from "nexus";

export const Video = objectType({
  name: "Video",
  definition(t) {
    t.nonNull.string("accessToken");
  },
});

export const VideoQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("accessToken", {
      type: "Video",
      args: {
        identity: stringArg(),
        room: stringArg(),
      },
      resolve(parent, args, content, info) {
        const AccessToken = require("twilio").jwt.AccessToken;
        const VideoGrant = AccessToken.VideoGrant;
        const token = new AccessToken(
          process.env.TWILIO_ACCOUNT_SID,
          process.env.TWILIO_API_KEY,
          process.env.TWILIO_API_SECRET
        );
        token.identity = args.identity;
        const grant = new VideoGrant();
        grant.room = args.room;
        token.addGrant(grant);

        return { accessToken: token.toJwt() };
      },
    });
  },
});
