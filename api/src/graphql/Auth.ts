import { extendType, nonNull, objectType, stringArg } from "nexus";
import { Token } from "graphql";
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
    t.nonNull.field("auth", {
      type: "Auth",
    });
  },
});

export const AuthObject = objectType({
  name: "Auth",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("githubId");
    t.nonNull.string("githubLogin");
    t.nonNull.list.nonNull.field("users", {
      type: "User",
      resolve(parent, _args, context) {
        return context.prisma.auth.findUnique({
          where: {id: parent.id },
        }).users();
      }
    })
  }
})

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
        const access_token = await getAccessToken(code) as string;

        const {
          id: githubId,
          login: githubLogin,
          bio,
        } = await getGithubInfo(access_token);

        let auth = await context.prisma.auth.findFirst({
          where: { githubId },
        });

        if (!auth) {
          auth = await context.prisma.auth.create({
            data: {
              githubLogin,
              githubId,
            },
          });
        }

        const token = jwt.sign({ authId: auth.id }, jwtKey);

        return {
          token,
          auth,
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
