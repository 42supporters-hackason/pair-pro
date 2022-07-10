import { gql } from "@apollo/client";

export const SIGNIN = gql`
  mutation SignIn($code: String!) {
    authGithub(code: $code) {
      token
      user {
        id
        name
        githubLogin
        matchingPoint
        bio
      }
    }
  }
`;
