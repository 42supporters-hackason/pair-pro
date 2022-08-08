import { extendType, nonNull, objectType, stringArg } from "nexus";
import axios, { AxiosError } from "axios";
import * as jwt from "jsonwebtoken";
import { stringify, parse } from "querystring";
import { jwtKey } from "../utils/auth";

const clientId = process.env.GH_CLIENT_ID;
const clientSecret = process.env.GH_CLIENT_SECRET;

const apiUrl = "https://api.github.com/graphql";
const accessTokenUrl = "https://github.com/login/oauth/access_token";

export const AuthPayLoad = objectType({
  name: "AuthPayLoad",
  definition(t) {
    t.nonNull.string("token");
    t.nonNull.field("user", {
      type: "User",
    });
  },
});

export const AuthMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("authGithub", {
      type: "AuthPayLoad",
      args: {
        code: nonNull(stringArg()),
      },
      async resolve(_parent, args, context) {
        const { code } = args;
        const access_token = (await getAccessToken(code)) as string;
        
        if (!access_token) {
          throw new Error("Failed at getting access token")
        }
        const {
          id: githubId,
          login: githubLogin,
          bio: githubBio,
        } = await getGithubInfo(access_token);

        let user = await context.prisma.user.findFirst({
          where: { githubId },
        });

        if (!user) {
          user = await context.prisma.user.create({
            data: {
              githubLogin,
              githubId,
              githubBio,
            },
          });
        }

        const token = jwt.sign({ userId: user.id }, jwtKey);

        return {
          token,
          user,
        };
      },
    });
  },
});

async function getAccessToken(code: string) {
  const { data } = await axios.post(
    accessTokenUrl,
    stringify({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code: code,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return parse(data).access_token;
}

async function getGithubInfo(access_token: string) {
  const { data: user } = await axios.post(
    apiUrl,
    {
      query: "query { viewer { id login bio } }",
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return user.data.viewer;
}
