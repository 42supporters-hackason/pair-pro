import { gql } from "@apollo/client";

/**
 * skills
 */
export const FETCH_SKILLS = gql`
  query fetchSkills {
    skills {
      id
      name
      imageUrl
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
  query fetchUnmatchedPost(
    $driverNameFilter: String
    $requiredSkillsFilter: Int
    $keywordFilter: String
    $skip: Int
    $take: Int
  ) {
    unmatchedPosts(
      driverNameFilter: $driverNameFilter
      requiredSkillsFilter: $requiredSkillsFilter
      keywordFilter: $keywordFilter
      skip: $skip
      take: $take
    ) {
      posts {
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
      count
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

export const FETCH_UNREAD_POSTS = gql`
  query fetchUnreadPosts {
    myMatchedPostsWithUnreadMessages {
      id
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
  query fetchCurrentCommunity($skip: Int, $take: Int) {
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
    profilesInMyCommunity(skip: $skip, take: $take) {
      count
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

/**
 * statistics
 */
export const FETCH_NAVIGATED_SKILLS_LIST = gql`
  query fetchNavigatedSkillsList {
    ListNavigatedSkills {
      count
      skill {
        id
        name
        imageUrl
      }
    }
  }
`;

export const FETCH_DRIVEN_SKILLS_LIST = gql`
  query fetchDrivenSkillsList {
    ListDrivenSkills {
      count
      skill {
        id
        name
        imageUrl
      }
    }
  }
`;

export const FETCH_NAVIGATOR_RANKING = gql`
  query fetchNavigatorRanking {
    ListNavigatorPostsRanking {
      count
      profile {
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

export const FETCH_DRIVER_RANKING = gql`
  query fetchDriverRanking {
    ListDriverPostsRanking {
      count
      profile {
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

export const FETCH_POPULAR_SKILLS_LIST = gql`
  query fetchPopularSkillsList($take: Int) {
    ListPopularSkillsRanking(take: $take) {
      count
      skill {
        id
        name
        imageUrl
      }
    }
  }
`;
