import { gql } from "@apollo/client";

/**
 * skills
 */
export const FETCH_SKILLS = gql`
  query fetchSkills {
    skills {
      id
      name
    }
  }
`;

export const GET_VIDEO_ACCESS_TOKEN = gql`
  query getVideoAccessToken($identity: String!, $room: String!) {
    accessToken(identity: $identity, room: $room) {
      accessToken
    }
  }
`;

/**
 * post
 */
export const FETCH_UNMATCHED_POST = gql`
  query fetchUnmatchedPost {
    unmatchedPosts {
      id
      description
      title
      driver {
        id
        name
        matchingPoint
        bio
        user {
          githubLogin
        }
      }
      requiredSkills {
        id
        name
      }
    }
  }
`;

export const FETCH_MY_POST = gql`
  query fetchMyPost {
    myDrivingPosts {
      id
      description
      title
      requiredSkills {
        id
        name
      }
    }
  }
`;

export const FETCH_MATCHED_POST = gql`
  query fetchMatchedPost {
    myMatchedPosts {
      id
      description
      title
      navigator {
        id
        name
        matchingPoint
        bio
        user {
          githubLogin
        }
      }
      driver {
        id
        name
        matchingPoint
        bio
        user {
          githubLogin
        }
      }
      requiredSkills {
        id
        name
      }
    }
  }
`;

export const FETCH_SPECIFIC_POST = gql`
  query fetchSpecificPost($id: String!) {
    post(id: $id) {
      id
      description
      title
      navigator {
        id
        name
        matchingPoint
        bio
        user {
          githubLogin
        }
      }
      driver {
        id
        name
        matchingPoint
        bio
        user {
          githubLogin
        }
      }
      requiredSkills {
        id
        name
      }
    }
  }
`;

export const FETCH_COMPLETED_POST = gql`
  query fetchCompletedPost {
    myCompletedPosts {
      id
      description
      title
      navigator {
        id
        name
        matchingPoint
        bio
        user {
          githubLogin
        }
      }
      driver {
        id
        name
        matchingPoint
        bio
        user {
          githubLogin
        }
      }
      requiredSkills {
        id
        name
      }
    }
  }
`;

/**
 * message
 */
export const FETCH_MESSAGES = gql`
  query fetchMessages($postId: String!) {
    messagesByPostId(postId: $postId) {
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

/**
 * user
 */
export const FETCH_ME = gql`
  query fetchMe {
    myProfile {
      id
      name
      matchingPoint
      bio
      user {
        githubLogin
      }
    }
  }
`;

/**
 * community
 */
export const FETCH_MY_COMMUNITIES = gql`
  query fetchMyCommunities {
    myCommunities {
      id
      name
      profiles {
        id
        name
        bio
        user {
          githubLogin
        }
      }
    }
  }
`;

export const FETCH_CURRENT_COMMUNITY = gql`
  query fetchCurrentCommunity {
    myCurrentCommunity {
      id
      name
      profiles {
        id
        name
        bio
        user {
          githubLogin
        }
      }
    }
  }
`;
