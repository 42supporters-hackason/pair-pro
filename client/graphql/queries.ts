import { gql } from "@apollo/client";

export const FETCH_SKILLS = gql`
  query fetchSkills {
    skills {
      id
      name
    }
  }
`;

export const FETCH_UNMATCHED_POST = gql`
  query fetchUnmatchedPost {
    unmatchedPosts {
      id
      description
      title
      driver {
        id
        name
        githubLogin
        matchingPoint
        bio
      }
      requiredSkills {
        id
        name
      }
    }
  }
`;
