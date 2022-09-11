import { extendType, nonNull, objectType, stringArg } from "nexus";
import axios, { AxiosError } from "axios";
import * as jwt from "jsonwebtoken";
import { stringify, parse } from "querystring";
import { jwtKey } from "../utils/auth";
import { User } from "@prisma/client";

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
        const access_token = await getAccessToken(code);

        const {
          id: githubId,
          login: githubLogin,
          bio: githubBio,
          email,
        } = await getGithubInfo(access_token);

        let user = (await context.prisma.user.findFirst({
          where: { githubId },
        })) as User;

        if (!user) {
          user = await context.prisma.user.create({
            data: {
              githubLogin,
              githubId,
              githubBio: githubBio ?? "",
              email: email ?? "",
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
  const json = parse(data);
  if (!json.access_token) {
    console.error(
      `error: ${json.error ?? ""} ${json.error_description ?? ""} ${
        json.error_uri ?? ""
      }`
    );
    throw new Error(`Failed at getting access token:${json.error_description}`);
  }
  return json.access_token as string;
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
  const { data: data } = await axios.get("https://api.github.com/user/emails", {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  const primaryEmail = data.find((email: any) => email.primary);
  if (!primaryEmail) {
    console.error("error: no primary email");
  }
  return { ...user.data.viewer, email: primaryEmail?.email };
}
