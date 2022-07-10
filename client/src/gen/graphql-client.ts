import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthPayLoad = {
  __typename?: "AuthPayLoad";
  token: Scalars["String"];
  user: User;
};

export type Message = {
  __typename?: "Message";
  content: Scalars["String"];
  id: Scalars["Int"];
};

export type Mutation = {
  __typename?: "Mutation";
  authGithub: AuthPayLoad;
  post: Post;
  updateMe?: Maybe<User>;
};

export type MutationAuthGithubArgs = {
  code: Scalars["String"];
};

export type MutationPostArgs = {
  description: Scalars["String"];
  title: Scalars["String"];
};

export type MutationUpdateMeArgs = {
  bio?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type Post = {
  __typename?: "Post";
  description: Scalars["String"];
  id: Scalars["Int"];
  title: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  feed: Array<Post>;
  me: User;
  skills: Array<Skill>;
  user?: Maybe<User>;
  users: Array<User>;
};

export type QueryUserArgs = {
  id: Scalars["Int"];
};

export type Skill = {
  __typename?: "Skill";
  id: Scalars["Int"];
  name: Scalars["String"];
};

export type User = {
  __typename?: "User";
  bio: Scalars["String"];
  driverPost: Array<Post>;
  githubId: Scalars["String"];
  githubLogin: Scalars["String"];
  id: Scalars["Int"];
  matchingPoint: Scalars["Int"];
  name: Scalars["String"];
  navigatorPost: Array<Post>;
};

export type SignInMutationVariables = Exact<{
  code: Scalars["String"];
}>;

export type SignInMutation = {
  __typename?: "Mutation";
  authGithub: {
    __typename?: "AuthPayLoad";
    token: string;
    user: {
      __typename?: "User";
      id: number;
      name: string;
      githubLogin: string;
      matchingPoint: number;
      bio: string;
    };
  };
};

export type UpdateProfileMutationVariables = Exact<{
  name: Scalars["String"];
  bio: Scalars["String"];
}>;

export type UpdateProfileMutation = {
  __typename?: "Mutation";
  updateMe?: { __typename?: "User"; name: string; bio: string } | null;
};

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
export type SignInMutationFn = Apollo.MutationFunction<
  SignInMutation,
  SignInMutationVariables
>;

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
export function useSignInMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignInMutation,
    SignInMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignInMutation, SignInMutationVariables>(
    SignInDocument,
    options
  );
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  SignInMutation,
  SignInMutationVariables
>;
export const UpdateProfileDocument = gql`
  mutation UpdateProfile($name: String!, $bio: String!) {
    updateMe(name: $name, bio: $bio) {
      name
      bio
    }
  }
`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>;

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
export function useUpdateProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >(UpdateProfileDocument, options);
}
export type UpdateProfileMutationHookResult = ReturnType<
  typeof useUpdateProfileMutation
>;
export type UpdateProfileMutationResult =
  Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>;
