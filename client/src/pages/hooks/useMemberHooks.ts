import { useFetchCurrentCommunityQuery } from "../../gen/graphql-client";

/**
 * client/memberで使用されるhooks
 */
export const useMemberHooks = () => {
  const { data: currentCommunityData } = useFetchCurrentCommunityQuery();
  const communityName = currentCommunityData?.myCurrentCommunity?.name;
  const communityMember = currentCommunityData?.myCurrentCommunity?.profiles;
  const communityId = currentCommunityData?.myCurrentCommunity?.id;

  return { communityName, communityMember, communityId };
};
