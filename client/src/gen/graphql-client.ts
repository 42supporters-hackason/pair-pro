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

export type Message = {
  __typename?: 'Message';
  content: Scalars['String'];
  id: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authGithub: AuthPayLoad;
  post: Post;
  updateMe?: Maybe<User>;
};


export type MutationAuthGithubArgs = {
  code: Scalars['String'];
};


export type MutationPostArgs = {
  description: Scalars['String'];
  requiredSkillsId: Array<Scalars['Int']>;
  title: Scalars['String'];
};


export type MutationUpdateMeArgs = {
  bio?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  completedAt?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  driver?: Maybe<User>;
  id: Scalars['Int'];
  messages: Array<Message>;
  navigator?: Maybe<User>;
  requiredSkills: Array<Skill>;
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  feed: Array<Post>;
  me: User;
  post?: Maybe<Post>;
  skills: Array<Skill>;
  unmatchedPosts: Array<Maybe<Post>>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type Skill = {
  __typename?: 'Skill';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  bio: Scalars['String'];
  driverPost: Array<Post>;
  githubId: Scalars['String'];
  githubLogin: Scalars['String'];
  id: Scalars['Int'];
  matchingPoint: Scalars['Int'];
  name: Scalars['String'];
  navigatorPost: Array<Post>;
};

export type SignInMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type SignInMutation = { __typename?: 'Mutation', authGithub: { __typename?: 'AuthPayLoad', token: string, user: { __typename?: 'User', id: number, name: string, githubLogin: string, matchingPoint: number, bio: string } } };

export type UpdateProfileMutationVariables = Exact<{
  name: Scalars['String'];
  bio: Scalars['String'];
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateMe?: { __typename?: 'User', name: string, bio: string } | null };

export type CreatePostMutationVariables = Exact<{
  description: Scalars['String'];
  title: Scalars['String'];
  requiredSkillsId: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', post: { __typename?: 'Post', description: string, title: string, requiredSkills: Array<{ __typename?: 'Skill', id: number, name: string }>, driver?: { __typename?: 'User', id: number, name: string, githubLogin: string, matchingPoint: number, bio: string } | null } };

export type FetchSkillsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchSkillsQuery = { __typename?: 'Query', skills: Array<{ __typename?: 'Skill', id: number, name: string }> };


export const SignInDocument = gql`
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
  updateMe(name: $name, bio: $bio) {
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
      githubLogin
      matchingPoint
      bio
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