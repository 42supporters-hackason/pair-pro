import { gql } from "@apollo/client";

export const SIGNIN = gql`
  mutation SignIn($code: String!) {
    authGithub(code: $code) {
      token
      user {
        name
        githubLogin
        matchingPoint
        bio
      }
    }
  }
`;
