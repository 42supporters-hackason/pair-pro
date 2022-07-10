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

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($name: String!, $bio: String!) {
    updateMe(name: $name, bio: $bio) {
      name
      bio
    }
  }
`;
