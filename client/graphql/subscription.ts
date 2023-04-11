import { gql } from "@apollo/client";

export const FETCH_MESSAGE = gql`
  subscription fetchMessage($postId: String!) {
    waitForMessage(postId: $postId) {
      id
      content
      createdBy {
        id
        name
        matchingPoint
        bio
        user {
          githubLogin
        }
      }
    }
  }
`;

export const MESSAGE_NOTIFICATION = gql`
  subscription messageNotification {
    waitForMessageNotification {
      id
    }
  }
`;
