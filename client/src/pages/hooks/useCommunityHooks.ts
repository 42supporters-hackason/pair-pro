import {
  useFetchMyCommunitiesQuery,
  useJoinCommunityMutation,
} from "../../gen/graphql-client";
import { useClientRoute } from "./../../hooks/useClientRoute";
import { tokenStorage } from "./../../utils/local-storage/token";
import { useHomeHooks } from "./useHomeHooks";

/**
 * public/communityで使用されるHooks
 */
export const useCommunityHooks = () => {
  const { data: myCommunities, refetch: refecthMyCommunities } =
    useFetchMyCommunitiesQuery();
  const [joinCommunityMutation] = useJoinCommunityMutation();
  const { refetchMatchedPosts, refetchMyPosts } = useHomeHooks();
  const { goToHome } = useClientRoute();

  const joinCommunity = async (id: string) => {
    await joinCommunityMutation({
      variables: { communityId: id },
      onCompleted: (data) => {
        tokenStorage.save(data.joinCommunity.token);
        refetchMatchedPosts();
        refetchMyPosts();
        goToHome({ replace: true });
      },
    });
  };

  return { myCommunities, refecthMyCommunities, joinCommunity };
};
