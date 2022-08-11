import { useFetchMyCommunitiesQuery } from "../../gen/graphql-client";

/**
 * public/communityで使用されるHooks
 */
export const useCommunityHooks = () => {
  const { data: myCommunities, refetch: refecthMyCommunities } =
    useFetchMyCommunitiesQuery();

  return { myCommunities, refecthMyCommunities };
};
