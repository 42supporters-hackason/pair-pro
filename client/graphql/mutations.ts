import { gql } from "@apollo/client";

export const SIGNIN = gql`
  mutation SignIn() {
    authGithub() {
      token
      user
    }
  }
`;
