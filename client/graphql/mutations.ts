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

export const CREATE_POST = gql`
  mutation createPost(
    $description: String!
    $title: String!
    $requiredSkillsId: [Int!]!
  ) {
    post(
      description: $description
      title: $title
      requiredSkillsId: $requiredSkillsId
    ) {
      description
      title
      requiredSkills {
        id
        name
      }
      driver {
        id
        name
        githubLogin
        matchingPoint
        bio
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($postId: String!, $content: String!) {
    createMessage(postId: $postId, content: $content) {
      id
      content
    }
  }
`;
