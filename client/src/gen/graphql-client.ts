import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type AuthPayLoad = {
  __typename?: 'AuthPayLoad';
  token: Scalars['String'];
  user: User;
};

export type Community = {
  __typename?: 'Community';
  id: Scalars['String'];
  name: Scalars['String'];
  profiles: Array<Profile>;
};

export type LearnedSkill = {
  __typename?: 'LearnedSkill';
  count: Scalars['Int'];
  skill: Skill;
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdBy: Profile;
  id: Scalars['Int'];
  isRead: Scalars['Boolean'];
  post: Post;
};

export type Mutation = {
  __typename?: 'Mutation';
  authGithub: AuthPayLoad;
  completePairProgramming: Post;
  createCommunity: Community;
  createMessage: Message;
  deleteCommunity: Community;
  deleteMyProfile?: Maybe<AuthPayLoad>;
  deletePost: Post;
  joinCommunity: AuthPayLoad;
  post: Post;
  readMessages: Array<Message>;
  registerNavigator: Post;
  updateCommunity: Community;
  updateMyProfile?: Maybe<Profile>;
  updatePost: Post;
};


export type MutationAuthGithubArgs = {
  code: Scalars['String'];
};


export type MutationCompletePairProgrammingArgs = {
  postId: Scalars['String'];
};


export type MutationCreateCommunityArgs = {
  name: Scalars['String'];
};


export type MutationCreateMessageArgs = {
  content: Scalars['String'];
  postId: Scalars['String'];
};


export type MutationDeleteCommunityArgs = {
  communityId: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationJoinCommunityArgs = {
  communityId: Scalars['String'];
};


export type MutationPostArgs = {
  description: Scalars['String'];
  requiredSkillsId: Array<Scalars['Int']>;
  title: Scalars['String'];
};


export type MutationReadMessagesArgs = {
  postId: Scalars['String'];
};


export type MutationRegisterNavigatorArgs = {
  navigatorId: Scalars['Int'];
  postId: Scalars['String'];
};


export type MutationUpdateCommunityArgs = {
  id: Scalars['String'];
  name: Scalars['String'];
};


export type MutationUpdateMyProfileArgs = {
  bio?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationUpdatePostArgs = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  requiredSkillsIds?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  title?: InputMaybe<Scalars['String']>;
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  count: Scalars['Int'];
  posts: Array<Post>;
};

export type PaginatedProfiles = {
  __typename?: 'PaginatedProfiles';
  count: Scalars['Int'];
  profiles: Array<Profile>;
};

export type PairProgrammingCount = {
  __typename?: 'PairProgrammingCount';
  count: Scalars['Int'];
  profile: Profile;
};

export type Post = {
  __typename?: 'Post';
  completedAt?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  driver?: Maybe<Profile>;
  id: Scalars['String'];
  messages: Array<Message>;
  navigator?: Maybe<Profile>;
  requiredSkills: Array<Skill>;
  title: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  bio: Scalars['String'];
  community: Community;
  driverPost: Array<Post>;
  id: Scalars['Int'];
  matchingPoint: Scalars['Int'];
  name: Scalars['String'];
  navigatorPost: Array<Post>;
  user: User;
};

export type Query = {
  __typename?: 'Query';
  ListDrivenSkills: Array<LearnedSkill>;
  ListDriverPostsRanking: Array<PairProgrammingCount>;
  ListNavigatedSkills: Array<LearnedSkill>;
  ListNavigatorPostsRanking: Array<PairProgrammingCount>;
  accessToken: Video;
  communities: Array<Community>;
  feed: Array<Post>;
  messagesByPostId: Array<Message>;
  myCommunities: Array<Community>;
  myCompletedPosts: Array<Post>;
  myCurrentCommunity?: Maybe<Community>;
  myDrivingPosts: Array<Post>;
  myMatchedPosts: Array<Post>;
  myMatchedPostsWithUnreadMessages: Array<Post>;
  myProfile: Profile;
  post?: Maybe<Post>;
  profile?: Maybe<Profile>;
  profiles: Array<Profile>;
  profilesInMyCommunity: PaginatedProfiles;
  skills: Array<Skill>;
  unmatchedPosts: PaginatedPosts;
};


export type QueryAccessTokenArgs = {
  identity?: InputMaybe<Scalars['String']>;
  room?: InputMaybe<Scalars['String']>;
};


export type QueryMessagesByPostIdArgs = {
  postId: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['String'];
};


export type QueryProfileArgs = {
  id: Scalars['Int'];
};


export type QueryProfilesInMyCommunityArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryUnmatchedPostsArgs = {
  driverNameFilter?: InputMaybe<Scalars['String']>;
  keywordFilter?: InputMaybe<Scalars['String']>;
  requiredSkillsFilter?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type Skill = {
  __typename?: 'Skill';
  category?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  imageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  waitForMessage?: Maybe<Message>;
};


export type SubscriptionWaitForMessageArgs = {
  postId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  githubBio: Scalars['String'];
  githubId: Scalars['String'];
  githubLogin: Scalars['String'];
  id: Scalars['Int'];
  profiles: Array<Profile>;
};

export type Video = {
  __typename?: 'Video';
  accessToken: Scalars['String'];
};

export type SignInMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type SignInMutation = { __typename?: 'Mutation', authGithub: { __typename?: 'AuthPayLoad', token: string, user: { __typename?: 'User', id: number, githubLogin: string, profiles: Array<{ __typename?: 'Profile', id: number, name: string, matchingPoint: number, bio: string }> } } };

export type UpdateProfileMutationVariables = Exact<{
  name: Scalars['String'];
  bio: Scalars['String'];
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateMyProfile?: { __typename?: 'Profile', name: string, bio: string } | null };

export type CreatePostMutationVariables = Exact<{
  description: Scalars['String'];
  title: Scalars['String'];
  requiredSkillsId: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', post: { __typename?: 'Post', description: string, title: string, requiredSkills: Array<{ __typename?: 'Skill', id: number, name: string }>, driver?: { __typename?: 'Profile', id: number, name: string, matchingPoint: number, bio: string, user: { __typename?: 'User', githubLogin: string } } | null } };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'Post', id: string } };

export type MatchPostMutationVariables = Exact<{
  postId: Scalars['String'];
  navigatorId: Scalars['Int'];
}>;


export type MatchPostMutation = { __typename?: 'Mutation', registerNavigator: { __typename?: 'Post', navigator?: { __typename?: 'Profile', id: number, name: string, matchingPoint: number, bio: string, user: { __typename?: 'User', githubLogin: string } } | null } };

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  requiredSkillsIds?: InputMaybe<Array<InputMaybe<Scalars['Int']>> | InputMaybe<Scalars['Int']>>;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Post', id: string } };

export type CompletePostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type CompletePostMutation = { __typename?: 'Mutation', completePairProgramming: { __typename?: 'Post', id: string } };

export type ReadPostMessageMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type ReadPostMessageMutation = { __typename?: 'Mutation', readMessages: Array<{ __typename?: 'Message', id: number }> };

export type SendMessageMutationVariables = Exact<{
  postId: Scalars['String'];
  content: Scalars['String'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Message', id: number, content: string } };

export type CreateCommunityMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateCommunityMutation = { __typename?: 'Mutation', createCommunity: { __typename?: 'Community', id: string, name: string } };

export type JoinCommunityMutationVariables = Exact<{
  communityId: Scalars['String'];
}>;


export type JoinCommunityMutation = { __typename?: 'Mutation', joinCommunity: { __typename?: 'AuthPayLoad', token: string, user: { __typename?: 'User', id: number, githubLogin: string, profiles: Array<{ __typename?: 'Profile', id: number, name: string, matchingPoint: number, bio: string }> } } };

export type ExitCommunityMutationVariables = Exact<{ [key: string]: never; }>;


export type ExitCommunityMutation = { __typename?: 'Mutation', deleteMyProfile?: { __typename?: 'AuthPayLoad', token: string } | null };

export type FetchSkillsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchSkillsQuery = { __typename?: 'Query', skills: Array<{ __typename?: 'Skill', id: number, name: string }> };

export type GetVideoAccessTokenQueryVariables = Exact<{
  identity: Scalars['String'];
  room: Scalars['String'];
}>;


export type GetVideoAccessTokenQuery = { __typename?: 'Query', accessToken: { __typename?: 'Video', accessToken: string } };

export type FetchUnmatchedPostQueryVariables = Exact<{
  driverNameFilter?: InputMaybe<Scalars['String']>;
  requiredSkillsFilter?: InputMaybe<Scalars['Int']>;
  keywordFilter?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
}>;


export type FetchUnmatchedPostQuery = { __typename?: 'Query', unmatchedPosts: { __typename?: 'PaginatedPosts', count: number, posts: Array<{ __typename?: 'Post', id: string, description: string, title: string, driver?: { __typename?: 'Profile', id: number, name: string, matchingPoint: number, bio: string, user: { __typename?: 'User', githubLogin: string } } | null, requiredSkills: Array<{ __typename?: 'Skill', id: number, name: string }> }> } };

export type FetchMyPostQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchMyPostQuery = { __typename?: 'Query', myDrivingPosts: Array<{ __typename?: 'Post', id: string, description: string, title: string, requiredSkills: Array<{ __typename?: 'Skill', id: number, name: string }> }> };

export type FetchMatchedPostQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchMatchedPostQuery = { __typename?: 'Query', myMatchedPosts: Array<{ __typename?: 'Post', id: string, description: string, title: string, navigator?: { __typename?: 'Profile', id: number, name: string, matchingPoint: number, bio: string, user: { __typename?: 'User', githubLogin: string } } | null, driver?: { __typename?: 'Profile', id: number, name: string, matchingPoint: number, bio: string, user: { __typename?: 'User', githubLogin: string } } | null, requiredSkills: Array<{ __typename?: 'Skill', id: number, name: string }> }> };

export type FetchSpecificPostQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type FetchSpecificPostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, description: string, title: string, navigator?: { __typename?: 'Profile', id: number, name: string, matchingPoint: number, bio: string, user: { __typename?: 'User', githubLogin: string } } | null, driver?: { __typename?: 'Profile', id: number, name: string, matchingPoint: number, bio: string, user: { __typename?: 'User', githubLogin: string } } | null, requiredSkills: Array<{ __typename?: 'Skill', id: number, name: string }> } | null };

export type FetchCompletedPostQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchCompletedPostQuery = { __typename?: 'Query', myCompletedPosts: Array<{ __typename?: 'Post', id: string, description: string, title: string, navigator?: { __typename?: 'Profile', id: number, name: string, matchingPoint: number, bio: string, user: { __typename?: 'User', githubLogin: string } } | null, driver?: { __typename?: 'Profile', id: number, name: string, matchingPoint: number, bio: string, user: { __typename?: 'User', githubLogin: string } } | null, requiredSkills: Array<{ __typename?: 'Skill', id: number, name: string }> }> };

export type FetchUnreadPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchUnreadPostsQuery = { __typename?: 'Query', myMatchedPostsWithUnreadMessages: Array<{ __typename?: 'Post', id: string }> };

export type FetchMessagesQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type FetchMessagesQuery = { __typename?: 'Query', messagesByPostId: Array<{ __typename?: 'Message', id: number, content: string, createdBy: { __typename?: 'Profile', id: number, name: string, matchingPoint: number, bio: string, user: { __typename?: 'User', githubLogin: string } } }> };

export type FetchMeQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchMeQuery = { __typename?: 'Query', myProfile: { __typename?: 'Profile', id: number, name: string, matchingPoint: number, bio: string, user: { __typename?: 'User', githubLogin: string } } };

export type FetchMyCommunitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchMyCommunitiesQuery = { __typename?: 'Query', myCommunities: Array<{ __typename?: 'Community', id: string, name: string, profiles: Array<{ __typename?: 'Profile', id: number, name: string, bio: string, user: { __typename?: 'User', githubLogin: string } }> }> };

export type FetchCurrentCommunityQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
}>;


export type FetchCurrentCommunityQuery = { __typename?: 'Query', myCurrentCommunity?: { __typename?: 'Community', id: string, name: string, profiles: Array<{ __typename?: 'Profile', id: number, name: string, bio: string, user: { __typename?: 'User', githubLogin: string } }> } | null, profilesInMyCommunity: { __typename?: 'PaginatedProfiles', count: number, profiles: Array<{ __typename?: 'Profile', id: number, name: string, bio: string, user: { __typename?: 'User', githubLogin: string } }> } };

export type FetchMessageSubscriptionVariables = Exact<{
  postId: Scalars['String'];
}>;


export type FetchMessageSubscription = { __typename?: 'Subscription', waitForMessage?: { __typename?: 'Message', id: number, content: string, createdBy: { __typename?: 'Profile', id: number, name: string, matchingPoint: number, bio: string, user: { __typename?: 'User', githubLogin: string } } } | null };


export const SignInDocument = gql`
    mutation SignIn($code: String!) {
  authGithub(code: $code) {
    token
    user {
      id
      githubLogin
      profiles {
        id
        name
        matchingPoint
        bio
      }
    }
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($name: String!, $bio: String!) {
  updateMyProfile(name: $name, bio: $bio) {
    name
    bio
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      name: // value for 'name'
 *      bio: // value for 'bio'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const CreatePostDocument = gql`
    mutation createPost($description: String!, $title: String!, $requiredSkillsId: [Int!]!) {
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
      matchingPoint
      bio
      user {
        githubLogin
      }
    }
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      description: // value for 'description'
 *      title: // value for 'title'
 *      requiredSkillsId: // value for 'requiredSkillsId'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation deletePost($id: String!) {
  deletePost(id: $id) {
    id
  }
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const MatchPostDocument = gql`
    mutation matchPost($postId: String!, $navigatorId: Int!) {
  registerNavigator(postId: $postId, navigatorId: $navigatorId) {
    navigator {
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
export type MatchPostMutationFn = Apollo.MutationFunction<MatchPostMutation, MatchPostMutationVariables>;

/**
 * __useMatchPostMutation__
 *
 * To run a mutation, you first call `useMatchPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMatchPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [matchPostMutation, { data, loading, error }] = useMatchPostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      navigatorId: // value for 'navigatorId'
 *   },
 * });
 */
export function useMatchPostMutation(baseOptions?: Apollo.MutationHookOptions<MatchPostMutation, MatchPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MatchPostMutation, MatchPostMutationVariables>(MatchPostDocument, options);
      }
export type MatchPostMutationHookResult = ReturnType<typeof useMatchPostMutation>;
export type MatchPostMutationResult = Apollo.MutationResult<MatchPostMutation>;
export type MatchPostMutationOptions = Apollo.BaseMutationOptions<MatchPostMutation, MatchPostMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($id: String!, $title: String, $description: String, $requiredSkillsIds: [Int]) {
  updatePost(
    id: $id
    title: $title
    description: $description
    requiredSkillsIds: $requiredSkillsIds
  ) {
    id
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      requiredSkillsIds: // value for 'requiredSkillsIds'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const CompletePostDocument = gql`
    mutation completePost($postId: String!) {
  completePairProgramming(postId: $postId) {
    id
  }
}
    `;
export type CompletePostMutationFn = Apollo.MutationFunction<CompletePostMutation, CompletePostMutationVariables>;

/**
 * __useCompletePostMutation__
 *
 * To run a mutation, you first call `useCompletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completePostMutation, { data, loading, error }] = useCompletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCompletePostMutation(baseOptions?: Apollo.MutationHookOptions<CompletePostMutation, CompletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompletePostMutation, CompletePostMutationVariables>(CompletePostDocument, options);
      }
export type CompletePostMutationHookResult = ReturnType<typeof useCompletePostMutation>;
export type CompletePostMutationResult = Apollo.MutationResult<CompletePostMutation>;
export type CompletePostMutationOptions = Apollo.BaseMutationOptions<CompletePostMutation, CompletePostMutationVariables>;
export const ReadPostMessageDocument = gql`
    mutation readPostMessage($postId: String!) {
  readMessages(postId: $postId) {
    id
  }
}
    `;
export type ReadPostMessageMutationFn = Apollo.MutationFunction<ReadPostMessageMutation, ReadPostMessageMutationVariables>;

/**
 * __useReadPostMessageMutation__
 *
 * To run a mutation, you first call `useReadPostMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadPostMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readPostMessageMutation, { data, loading, error }] = useReadPostMessageMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useReadPostMessageMutation(baseOptions?: Apollo.MutationHookOptions<ReadPostMessageMutation, ReadPostMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReadPostMessageMutation, ReadPostMessageMutationVariables>(ReadPostMessageDocument, options);
      }
export type ReadPostMessageMutationHookResult = ReturnType<typeof useReadPostMessageMutation>;
export type ReadPostMessageMutationResult = Apollo.MutationResult<ReadPostMessageMutation>;
export type ReadPostMessageMutationOptions = Apollo.BaseMutationOptions<ReadPostMessageMutation, ReadPostMessageMutationVariables>;
export const SendMessageDocument = gql`
    mutation sendMessage($postId: String!, $content: String!) {
  createMessage(postId: $postId, content: $content) {
    id
    content
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const CreateCommunityDocument = gql`
    mutation createCommunity($name: String!) {
  createCommunity(name: $name) {
    id
    name
  }
}
    `;
export type CreateCommunityMutationFn = Apollo.MutationFunction<CreateCommunityMutation, CreateCommunityMutationVariables>;

/**
 * __useCreateCommunityMutation__
 *
 * To run a mutation, you first call `useCreateCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommunityMutation, { data, loading, error }] = useCreateCommunityMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateCommunityMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommunityMutation, CreateCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommunityMutation, CreateCommunityMutationVariables>(CreateCommunityDocument, options);
      }
export type CreateCommunityMutationHookResult = ReturnType<typeof useCreateCommunityMutation>;
export type CreateCommunityMutationResult = Apollo.MutationResult<CreateCommunityMutation>;
export type CreateCommunityMutationOptions = Apollo.BaseMutationOptions<CreateCommunityMutation, CreateCommunityMutationVariables>;
export const JoinCommunityDocument = gql`
    mutation joinCommunity($communityId: String!) {
  joinCommunity(communityId: $communityId) {
    token
    user {
      id
      githubLogin
      profiles {
        id
        name
        matchingPoint
        bio
      }
    }
  }
}
    `;
export type JoinCommunityMutationFn = Apollo.MutationFunction<JoinCommunityMutation, JoinCommunityMutationVariables>;

/**
 * __useJoinCommunityMutation__
 *
 * To run a mutation, you first call `useJoinCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinCommunityMutation, { data, loading, error }] = useJoinCommunityMutation({
 *   variables: {
 *      communityId: // value for 'communityId'
 *   },
 * });
 */
export function useJoinCommunityMutation(baseOptions?: Apollo.MutationHookOptions<JoinCommunityMutation, JoinCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinCommunityMutation, JoinCommunityMutationVariables>(JoinCommunityDocument, options);
      }
export type JoinCommunityMutationHookResult = ReturnType<typeof useJoinCommunityMutation>;
export type JoinCommunityMutationResult = Apollo.MutationResult<JoinCommunityMutation>;
export type JoinCommunityMutationOptions = Apollo.BaseMutationOptions<JoinCommunityMutation, JoinCommunityMutationVariables>;
export const ExitCommunityDocument = gql`
    mutation exitCommunity {
  deleteMyProfile {
    token
  }
}
    `;
export type ExitCommunityMutationFn = Apollo.MutationFunction<ExitCommunityMutation, ExitCommunityMutationVariables>;

/**
 * __useExitCommunityMutation__
 *
 * To run a mutation, you first call `useExitCommunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExitCommunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [exitCommunityMutation, { data, loading, error }] = useExitCommunityMutation({
 *   variables: {
 *   },
 * });
 */
export function useExitCommunityMutation(baseOptions?: Apollo.MutationHookOptions<ExitCommunityMutation, ExitCommunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ExitCommunityMutation, ExitCommunityMutationVariables>(ExitCommunityDocument, options);
      }
export type ExitCommunityMutationHookResult = ReturnType<typeof useExitCommunityMutation>;
export type ExitCommunityMutationResult = Apollo.MutationResult<ExitCommunityMutation>;
export type ExitCommunityMutationOptions = Apollo.BaseMutationOptions<ExitCommunityMutation, ExitCommunityMutationVariables>;
export const FetchSkillsDocument = gql`
    query fetchSkills {
  skills {
    id
    name
  }
}
    `;

/**
 * __useFetchSkillsQuery__
 *
 * To run a query within a React component, call `useFetchSkillsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchSkillsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchSkillsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchSkillsQuery(baseOptions?: Apollo.QueryHookOptions<FetchSkillsQuery, FetchSkillsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchSkillsQuery, FetchSkillsQueryVariables>(FetchSkillsDocument, options);
      }
export function useFetchSkillsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchSkillsQuery, FetchSkillsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchSkillsQuery, FetchSkillsQueryVariables>(FetchSkillsDocument, options);
        }
export type FetchSkillsQueryHookResult = ReturnType<typeof useFetchSkillsQuery>;
export type FetchSkillsLazyQueryHookResult = ReturnType<typeof useFetchSkillsLazyQuery>;
export type FetchSkillsQueryResult = Apollo.QueryResult<FetchSkillsQuery, FetchSkillsQueryVariables>;
export const GetVideoAccessTokenDocument = gql`
    query getVideoAccessToken($identity: String!, $room: String!) {
  accessToken(identity: $identity, room: $room) {
    accessToken
  }
}
    `;

/**
 * __useGetVideoAccessTokenQuery__
 *
 * To run a query within a React component, call `useGetVideoAccessTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideoAccessTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideoAccessTokenQuery({
 *   variables: {
 *      identity: // value for 'identity'
 *      room: // value for 'room'
 *   },
 * });
 */
export function useGetVideoAccessTokenQuery(baseOptions: Apollo.QueryHookOptions<GetVideoAccessTokenQuery, GetVideoAccessTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideoAccessTokenQuery, GetVideoAccessTokenQueryVariables>(GetVideoAccessTokenDocument, options);
      }
export function useGetVideoAccessTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideoAccessTokenQuery, GetVideoAccessTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideoAccessTokenQuery, GetVideoAccessTokenQueryVariables>(GetVideoAccessTokenDocument, options);
        }
export type GetVideoAccessTokenQueryHookResult = ReturnType<typeof useGetVideoAccessTokenQuery>;
export type GetVideoAccessTokenLazyQueryHookResult = ReturnType<typeof useGetVideoAccessTokenLazyQuery>;
export type GetVideoAccessTokenQueryResult = Apollo.QueryResult<GetVideoAccessTokenQuery, GetVideoAccessTokenQueryVariables>;
export const FetchUnmatchedPostDocument = gql`
    query fetchUnmatchedPost($driverNameFilter: String, $requiredSkillsFilter: Int, $keywordFilter: String, $skip: Int, $take: Int) {
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

/**
 * __useFetchUnmatchedPostQuery__
 *
 * To run a query within a React component, call `useFetchUnmatchedPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUnmatchedPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUnmatchedPostQuery({
 *   variables: {
 *      driverNameFilter: // value for 'driverNameFilter'
 *      requiredSkillsFilter: // value for 'requiredSkillsFilter'
 *      keywordFilter: // value for 'keywordFilter'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useFetchUnmatchedPostQuery(baseOptions?: Apollo.QueryHookOptions<FetchUnmatchedPostQuery, FetchUnmatchedPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchUnmatchedPostQuery, FetchUnmatchedPostQueryVariables>(FetchUnmatchedPostDocument, options);
      }
export function useFetchUnmatchedPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchUnmatchedPostQuery, FetchUnmatchedPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchUnmatchedPostQuery, FetchUnmatchedPostQueryVariables>(FetchUnmatchedPostDocument, options);
        }
export type FetchUnmatchedPostQueryHookResult = ReturnType<typeof useFetchUnmatchedPostQuery>;
export type FetchUnmatchedPostLazyQueryHookResult = ReturnType<typeof useFetchUnmatchedPostLazyQuery>;
export type FetchUnmatchedPostQueryResult = Apollo.QueryResult<FetchUnmatchedPostQuery, FetchUnmatchedPostQueryVariables>;
export const FetchMyPostDocument = gql`
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

/**
 * __useFetchMyPostQuery__
 *
 * To run a query within a React component, call `useFetchMyPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchMyPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchMyPostQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchMyPostQuery(baseOptions?: Apollo.QueryHookOptions<FetchMyPostQuery, FetchMyPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchMyPostQuery, FetchMyPostQueryVariables>(FetchMyPostDocument, options);
      }
export function useFetchMyPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchMyPostQuery, FetchMyPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchMyPostQuery, FetchMyPostQueryVariables>(FetchMyPostDocument, options);
        }
export type FetchMyPostQueryHookResult = ReturnType<typeof useFetchMyPostQuery>;
export type FetchMyPostLazyQueryHookResult = ReturnType<typeof useFetchMyPostLazyQuery>;
export type FetchMyPostQueryResult = Apollo.QueryResult<FetchMyPostQuery, FetchMyPostQueryVariables>;
export const FetchMatchedPostDocument = gql`
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

/**
 * __useFetchMatchedPostQuery__
 *
 * To run a query within a React component, call `useFetchMatchedPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchMatchedPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchMatchedPostQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchMatchedPostQuery(baseOptions?: Apollo.QueryHookOptions<FetchMatchedPostQuery, FetchMatchedPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchMatchedPostQuery, FetchMatchedPostQueryVariables>(FetchMatchedPostDocument, options);
      }
export function useFetchMatchedPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchMatchedPostQuery, FetchMatchedPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchMatchedPostQuery, FetchMatchedPostQueryVariables>(FetchMatchedPostDocument, options);
        }
export type FetchMatchedPostQueryHookResult = ReturnType<typeof useFetchMatchedPostQuery>;
export type FetchMatchedPostLazyQueryHookResult = ReturnType<typeof useFetchMatchedPostLazyQuery>;
export type FetchMatchedPostQueryResult = Apollo.QueryResult<FetchMatchedPostQuery, FetchMatchedPostQueryVariables>;
export const FetchSpecificPostDocument = gql`
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

/**
 * __useFetchSpecificPostQuery__
 *
 * To run a query within a React component, call `useFetchSpecificPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchSpecificPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchSpecificPostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFetchSpecificPostQuery(baseOptions: Apollo.QueryHookOptions<FetchSpecificPostQuery, FetchSpecificPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchSpecificPostQuery, FetchSpecificPostQueryVariables>(FetchSpecificPostDocument, options);
      }
export function useFetchSpecificPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchSpecificPostQuery, FetchSpecificPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchSpecificPostQuery, FetchSpecificPostQueryVariables>(FetchSpecificPostDocument, options);
        }
export type FetchSpecificPostQueryHookResult = ReturnType<typeof useFetchSpecificPostQuery>;
export type FetchSpecificPostLazyQueryHookResult = ReturnType<typeof useFetchSpecificPostLazyQuery>;
export type FetchSpecificPostQueryResult = Apollo.QueryResult<FetchSpecificPostQuery, FetchSpecificPostQueryVariables>;
export const FetchCompletedPostDocument = gql`
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
 * __useFetchCompletedPostQuery__
 *
 * To run a query within a React component, call `useFetchCompletedPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchCompletedPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchCompletedPostQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchCompletedPostQuery(baseOptions?: Apollo.QueryHookOptions<FetchCompletedPostQuery, FetchCompletedPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchCompletedPostQuery, FetchCompletedPostQueryVariables>(FetchCompletedPostDocument, options);
      }
export function useFetchCompletedPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchCompletedPostQuery, FetchCompletedPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchCompletedPostQuery, FetchCompletedPostQueryVariables>(FetchCompletedPostDocument, options);
        }
export type FetchCompletedPostQueryHookResult = ReturnType<typeof useFetchCompletedPostQuery>;
export type FetchCompletedPostLazyQueryHookResult = ReturnType<typeof useFetchCompletedPostLazyQuery>;
export type FetchCompletedPostQueryResult = Apollo.QueryResult<FetchCompletedPostQuery, FetchCompletedPostQueryVariables>;
export const FetchUnreadPostsDocument = gql`
    query fetchUnreadPosts {
  myMatchedPostsWithUnreadMessages {
    id
  }
}
    `;

/**
 * __useFetchUnreadPostsQuery__
 *
 * To run a query within a React component, call `useFetchUnreadPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUnreadPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUnreadPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchUnreadPostsQuery(baseOptions?: Apollo.QueryHookOptions<FetchUnreadPostsQuery, FetchUnreadPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchUnreadPostsQuery, FetchUnreadPostsQueryVariables>(FetchUnreadPostsDocument, options);
      }
export function useFetchUnreadPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchUnreadPostsQuery, FetchUnreadPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchUnreadPostsQuery, FetchUnreadPostsQueryVariables>(FetchUnreadPostsDocument, options);
        }
export type FetchUnreadPostsQueryHookResult = ReturnType<typeof useFetchUnreadPostsQuery>;
export type FetchUnreadPostsLazyQueryHookResult = ReturnType<typeof useFetchUnreadPostsLazyQuery>;
export type FetchUnreadPostsQueryResult = Apollo.QueryResult<FetchUnreadPostsQuery, FetchUnreadPostsQueryVariables>;
export const FetchMessagesDocument = gql`
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
 * __useFetchMessagesQuery__
 *
 * To run a query within a React component, call `useFetchMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchMessagesQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useFetchMessagesQuery(baseOptions: Apollo.QueryHookOptions<FetchMessagesQuery, FetchMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchMessagesQuery, FetchMessagesQueryVariables>(FetchMessagesDocument, options);
      }
export function useFetchMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchMessagesQuery, FetchMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchMessagesQuery, FetchMessagesQueryVariables>(FetchMessagesDocument, options);
        }
export type FetchMessagesQueryHookResult = ReturnType<typeof useFetchMessagesQuery>;
export type FetchMessagesLazyQueryHookResult = ReturnType<typeof useFetchMessagesLazyQuery>;
export type FetchMessagesQueryResult = Apollo.QueryResult<FetchMessagesQuery, FetchMessagesQueryVariables>;
export const FetchMeDocument = gql`
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
 * __useFetchMeQuery__
 *
 * To run a query within a React component, call `useFetchMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchMeQuery(baseOptions?: Apollo.QueryHookOptions<FetchMeQuery, FetchMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchMeQuery, FetchMeQueryVariables>(FetchMeDocument, options);
      }
export function useFetchMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchMeQuery, FetchMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchMeQuery, FetchMeQueryVariables>(FetchMeDocument, options);
        }
export type FetchMeQueryHookResult = ReturnType<typeof useFetchMeQuery>;
export type FetchMeLazyQueryHookResult = ReturnType<typeof useFetchMeLazyQuery>;
export type FetchMeQueryResult = Apollo.QueryResult<FetchMeQuery, FetchMeQueryVariables>;
export const FetchMyCommunitiesDocument = gql`
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

/**
 * __useFetchMyCommunitiesQuery__
 *
 * To run a query within a React component, call `useFetchMyCommunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchMyCommunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchMyCommunitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchMyCommunitiesQuery(baseOptions?: Apollo.QueryHookOptions<FetchMyCommunitiesQuery, FetchMyCommunitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchMyCommunitiesQuery, FetchMyCommunitiesQueryVariables>(FetchMyCommunitiesDocument, options);
      }
export function useFetchMyCommunitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchMyCommunitiesQuery, FetchMyCommunitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchMyCommunitiesQuery, FetchMyCommunitiesQueryVariables>(FetchMyCommunitiesDocument, options);
        }
export type FetchMyCommunitiesQueryHookResult = ReturnType<typeof useFetchMyCommunitiesQuery>;
export type FetchMyCommunitiesLazyQueryHookResult = ReturnType<typeof useFetchMyCommunitiesLazyQuery>;
export type FetchMyCommunitiesQueryResult = Apollo.QueryResult<FetchMyCommunitiesQuery, FetchMyCommunitiesQueryVariables>;
export const FetchCurrentCommunityDocument = gql`
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
 * __useFetchCurrentCommunityQuery__
 *
 * To run a query within a React component, call `useFetchCurrentCommunityQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchCurrentCommunityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchCurrentCommunityQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useFetchCurrentCommunityQuery(baseOptions?: Apollo.QueryHookOptions<FetchCurrentCommunityQuery, FetchCurrentCommunityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchCurrentCommunityQuery, FetchCurrentCommunityQueryVariables>(FetchCurrentCommunityDocument, options);
      }
export function useFetchCurrentCommunityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchCurrentCommunityQuery, FetchCurrentCommunityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchCurrentCommunityQuery, FetchCurrentCommunityQueryVariables>(FetchCurrentCommunityDocument, options);
        }
export type FetchCurrentCommunityQueryHookResult = ReturnType<typeof useFetchCurrentCommunityQuery>;
export type FetchCurrentCommunityLazyQueryHookResult = ReturnType<typeof useFetchCurrentCommunityLazyQuery>;
export type FetchCurrentCommunityQueryResult = Apollo.QueryResult<FetchCurrentCommunityQuery, FetchCurrentCommunityQueryVariables>;
export const FetchMessageDocument = gql`
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

/**
 * __useFetchMessageSubscription__
 *
 * To run a query within a React component, call `useFetchMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useFetchMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchMessageSubscription({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useFetchMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<FetchMessageSubscription, FetchMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<FetchMessageSubscription, FetchMessageSubscriptionVariables>(FetchMessageDocument, options);
      }
export type FetchMessageSubscriptionHookResult = ReturnType<typeof useFetchMessageSubscription>;
export type FetchMessageSubscriptionResult = Apollo.SubscriptionResult<FetchMessageSubscription>;