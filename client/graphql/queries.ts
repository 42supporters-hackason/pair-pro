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
        githubLogin
        matchingPoint
        bio
      }
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

export const FETCH_SPECIFIC_POST = gql`
  query fetchSpecificPost($id: String!) {
    post(id: $id) {
      id
      description
      title
      navigator {
        id
        name
        githubLogin
        matchingPoint
        bio
      }
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
        githubLogin
        matchingPoint
        bio
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
      githubLogin
      matchingPoint
      bio
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
        githubLogin
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
        githubLogin
      }
    }
  }
`;
