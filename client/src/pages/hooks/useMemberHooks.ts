import { useFetchCurrentCommunityQuery } from "../../gen/graphql-client";

/**
 * client/memberで使用されるhooks
 */
export const useMemberHooks = () => {
  const { data: currentCommunityData } = useFetchCurrentCommunityQuery();
  const communityName = currentCommunityData?.myCurrentCommunity?.name;
  const communityId = currentCommunityData?.myCurrentCommunity?.id;
  const communityMember = currentCommunityData?.profilesInMyCommunity.profiles;
  const paginationCount = currentCommunityData?.profilesInMyCommunity.count;

  return { communityName, communityMember, communityId, paginationCount };
};
