/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./src/context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  AuthPayLoad: { // root type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Community: { // root type
    id: string; // String!
    name: string; // String!
  }
  LearnedSkill: { // root type
    count: number; // Int!
    skill: NexusGenRootTypes['Skill']; // Skill!
  }
  Message: { // root type
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    isRead: boolean; // Boolean!
  }
  Mutation: {};
  PaginatedPosts: { // root type
    count: number; // Int!
    posts: NexusGenRootTypes['Post'][]; // [Post!]!
  }
  PaginatedProfiles: { // root type
    count: number; // Int!
    profiles: NexusGenRootTypes['Profile'][]; // [Profile!]!
  }
  PairProgrammingCount: { // root type
    count: number; // Int!
    profile: NexusGenRootTypes['Profile']; // Profile!
  }
  PopularSkillsCount: { // root type
    count: number; // Int!
    skill: NexusGenRootTypes['Skill']; // Skill!
  }
  Post: { // root type
    completedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    id: string; // String!
    title: string; // String!
  }
  Profile: { // root type
    bio: string; // String!
    id: number; // Int!
    matchingPoint: number; // Int!
    name: string; // String!
  }
  Query: {};
  Skill: { // root type
    category?: string | null; // String
    id: number; // Int!
    imageUrl?: string | null; // String
    name: string; // String!
  }
  Subscription: {};
  User: { // root type
    githubBio: string; // String!
    githubId: string; // String!
    githubLogin: string; // String!
    id: number; // Int!
  }
  Video: { // root type
    accessToken: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  AuthPayLoad: { // field return type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Community: { // field return type
    id: string; // String!
    name: string; // String!
    profiles: NexusGenRootTypes['Profile'][]; // [Profile!]!
  }
  LearnedSkill: { // field return type
    count: number; // Int!
    skill: NexusGenRootTypes['Skill']; // Skill!
  }
  Message: { // field return type
    content: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    createdBy: NexusGenRootTypes['Profile']; // Profile!
    id: number; // Int!
    isRead: boolean; // Boolean!
    post: NexusGenRootTypes['Post']; // Post!
  }
  Mutation: { // field return type
    authGithub: NexusGenRootTypes['AuthPayLoad']; // AuthPayLoad!
    completePairProgramming: NexusGenRootTypes['Post']; // Post!
    createCommunity: NexusGenRootTypes['Community']; // Community!
    createMessage: NexusGenRootTypes['Message']; // Message!
    deleteCommunity: NexusGenRootTypes['Community']; // Community!
    deleteMyProfile: NexusGenRootTypes['AuthPayLoad'] | null; // AuthPayLoad
    deletePost: NexusGenRootTypes['Post']; // Post!
    joinCommunity: NexusGenRootTypes['AuthPayLoad']; // AuthPayLoad!
    markMessagesAsRead: NexusGenRootTypes['Message'][]; // [Message!]!
    post: NexusGenRootTypes['Post']; // Post!
    registerNavigator: NexusGenRootTypes['Post']; // Post!
    updateCommunity: NexusGenRootTypes['Community']; // Community!
    updateMyProfile: NexusGenRootTypes['Profile'] | null; // Profile
    updatePost: NexusGenRootTypes['Post']; // Post!
  }
  PaginatedPosts: { // field return type
    count: number; // Int!
    posts: NexusGenRootTypes['Post'][]; // [Post!]!
  }
  PaginatedProfiles: { // field return type
    count: number; // Int!
    profiles: NexusGenRootTypes['Profile'][]; // [Profile!]!
  }
  PairProgrammingCount: { // field return type
    count: number; // Int!
    profile: NexusGenRootTypes['Profile']; // Profile!
  }
  PopularSkillsCount: { // field return type
    count: number; // Int!
    skill: NexusGenRootTypes['Skill']; // Skill!
  }
  Post: { // field return type
    completedAt: NexusGenScalars['DateTime'] | null; // DateTime
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    driver: NexusGenRootTypes['Profile'] | null; // Profile
    id: string; // String!
    messages: NexusGenRootTypes['Message'][]; // [Message!]!
    navigator: NexusGenRootTypes['Profile'] | null; // Profile
    requiredSkills: NexusGenRootTypes['Skill'][]; // [Skill!]!
    title: string; // String!
  }
  Profile: { // field return type
    bio: string; // String!
    community: NexusGenRootTypes['Community']; // Community!
    driverPost: NexusGenRootTypes['Post'][]; // [Post!]!
    id: number; // Int!
    matchingPoint: number; // Int!
    name: string; // String!
    navigatorPost: NexusGenRootTypes['Post'][]; // [Post!]!
    user: NexusGenRootTypes['User']; // User!
  }
  Query: { // field return type
    ListDrivenSkills: NexusGenRootTypes['LearnedSkill'][]; // [LearnedSkill!]!
    ListDriverPostsRanking: NexusGenRootTypes['PairProgrammingCount'][]; // [PairProgrammingCount!]!
    ListNavigatedSkills: NexusGenRootTypes['LearnedSkill'][]; // [LearnedSkill!]!
    ListNavigatorPostsRanking: NexusGenRootTypes['PairProgrammingCount'][]; // [PairProgrammingCount!]!
    ListPopularSkillsRanking: NexusGenRootTypes['PopularSkillsCount'][]; // [PopularSkillsCount!]!
    accessToken: NexusGenRootTypes['Video']; // Video!
    communities: NexusGenRootTypes['Community'][]; // [Community!]!
    feed: NexusGenRootTypes['Post'][]; // [Post!]!
    messagesByPostId: NexusGenRootTypes['Message'][]; // [Message!]!
    myCommunities: NexusGenRootTypes['Community'][]; // [Community!]!
    myCompletedPosts: NexusGenRootTypes['Post'][]; // [Post!]!
    myCurrentCommunity: NexusGenRootTypes['Community'] | null; // Community
    myDrivingPosts: NexusGenRootTypes['Post'][]; // [Post!]!
    myMatchedPosts: NexusGenRootTypes['Post'][]; // [Post!]!
    myMatchedPostsWithUnreadMessages: NexusGenRootTypes['Post'][]; // [Post!]!
    myProfile: NexusGenRootTypes['Profile']; // Profile!
    post: NexusGenRootTypes['Post'] | null; // Post
    profile: NexusGenRootTypes['Profile'] | null; // Profile
    profiles: NexusGenRootTypes['Profile'][]; // [Profile!]!
    profilesInMyCommunity: NexusGenRootTypes['PaginatedProfiles']; // PaginatedProfiles!
    skills: NexusGenRootTypes['Skill'][]; // [Skill!]!
    unmatchedPosts: NexusGenRootTypes['PaginatedPosts']; // PaginatedPosts!
  }
  Skill: { // field return type
    category: string | null; // String
    id: number; // Int!
    imageUrl: string | null; // String
    name: string; // String!
  }
  Subscription: { // field return type
    waitForMessage: NexusGenRootTypes['Message'] | null; // Message
  }
  User: { // field return type
    githubBio: string; // String!
    githubId: string; // String!
    githubLogin: string; // String!
    id: number; // Int!
    profiles: NexusGenRootTypes['Profile'][]; // [Profile!]!
  }
  Video: { // field return type
    accessToken: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayLoad: { // field return type name
    token: 'String'
    user: 'User'
  }
  Community: { // field return type name
    id: 'String'
    name: 'String'
    profiles: 'Profile'
  }
  LearnedSkill: { // field return type name
    count: 'Int'
    skill: 'Skill'
  }
  Message: { // field return type name
    content: 'String'
    createdAt: 'DateTime'
    createdBy: 'Profile'
    id: 'Int'
    isRead: 'Boolean'
    post: 'Post'
  }
  Mutation: { // field return type name
    authGithub: 'AuthPayLoad'
    completePairProgramming: 'Post'
    createCommunity: 'Community'
    createMessage: 'Message'
    deleteCommunity: 'Community'
    deleteMyProfile: 'AuthPayLoad'
    deletePost: 'Post'
    joinCommunity: 'AuthPayLoad'
    markMessagesAsRead: 'Message'
    post: 'Post'
    registerNavigator: 'Post'
    updateCommunity: 'Community'
    updateMyProfile: 'Profile'
    updatePost: 'Post'
  }
  PaginatedPosts: { // field return type name
    count: 'Int'
    posts: 'Post'
  }
  PaginatedProfiles: { // field return type name
    count: 'Int'
    profiles: 'Profile'
  }
  PairProgrammingCount: { // field return type name
    count: 'Int'
    profile: 'Profile'
  }
  PopularSkillsCount: { // field return type name
    count: 'Int'
    skill: 'Skill'
  }
  Post: { // field return type name
    completedAt: 'DateTime'
    createdAt: 'DateTime'
    description: 'String'
    driver: 'Profile'
    id: 'String'
    messages: 'Message'
    navigator: 'Profile'
    requiredSkills: 'Skill'
    title: 'String'
  }
  Profile: { // field return type name
    bio: 'String'
    community: 'Community'
    driverPost: 'Post'
    id: 'Int'
    matchingPoint: 'Int'
    name: 'String'
    navigatorPost: 'Post'
    user: 'User'
  }
  Query: { // field return type name
    ListDrivenSkills: 'LearnedSkill'
    ListDriverPostsRanking: 'PairProgrammingCount'
    ListNavigatedSkills: 'LearnedSkill'
    ListNavigatorPostsRanking: 'PairProgrammingCount'
    ListPopularSkillsRanking: 'PopularSkillsCount'
    accessToken: 'Video'
    communities: 'Community'
    feed: 'Post'
    messagesByPostId: 'Message'
    myCommunities: 'Community'
    myCompletedPosts: 'Post'
    myCurrentCommunity: 'Community'
    myDrivingPosts: 'Post'
    myMatchedPosts: 'Post'
    myMatchedPostsWithUnreadMessages: 'Post'
    myProfile: 'Profile'
    post: 'Post'
    profile: 'Profile'
    profiles: 'Profile'
    profilesInMyCommunity: 'PaginatedProfiles'
    skills: 'Skill'
    unmatchedPosts: 'PaginatedPosts'
  }
  Skill: { // field return type name
    category: 'String'
    id: 'Int'
    imageUrl: 'String'
    name: 'String'
  }
  Subscription: { // field return type name
    waitForMessage: 'Message'
  }
  User: { // field return type name
    githubBio: 'String'
    githubId: 'String'
    githubLogin: 'String'
    id: 'Int'
    profiles: 'Profile'
  }
  Video: { // field return type name
    accessToken: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    authGithub: { // args
      code: string; // String!
    }
    completePairProgramming: { // args
      postId: string; // String!
    }
    createCommunity: { // args
      name: string; // String!
    }
    createMessage: { // args
      content: string; // String!
      postId: string; // String!
    }
    deleteCommunity: { // args
      communityId: string; // String!
    }
    deletePost: { // args
      id: string; // String!
    }
    joinCommunity: { // args
      communityId: string; // String!
    }
    markMessagesAsRead: { // args
      postId: string; // String!
    }
    post: { // args
      description: string; // String!
      requiredSkillsId: number[]; // [Int!]!
      title: string; // String!
    }
    registerNavigator: { // args
      navigatorId: number; // Int!
      postId: string; // String!
    }
    updateCommunity: { // args
      id: string; // String!
      name: string; // String!
    }
    updateMyProfile: { // args
      bio?: string | null; // String
      name?: string | null; // String
    }
    updatePost: { // args
      description?: string | null; // String
      id: string; // String!
      requiredSkillsIds?: Array<number | null> | null; // [Int]
      title?: string | null; // String
    }
  }
  Query: {
    ListPopularSkillsRanking: { // args
      take?: number | null; // Int
    }
    accessToken: { // args
      identity?: string | null; // String
      room?: string | null; // String
    }
    messagesByPostId: { // args
      postId: string; // String!
    }
    post: { // args
      id: string; // String!
    }
    profile: { // args
      id: number; // Int!
    }
    profilesInMyCommunity: { // args
      skip?: number | null; // Int
      take?: number | null; // Int
    }
    unmatchedPosts: { // args
      driverNameFilter?: string | null; // String
      keywordFilter?: string | null; // String
      requiredSkillsFilter?: number | null; // Int
      skip?: number | null; // Int
      take?: number | null; // Int
    }
  }
  Subscription: {
    waitForMessage: { // args
      postId: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}