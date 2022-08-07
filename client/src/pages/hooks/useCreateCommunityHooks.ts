import { useCallback } from "react";
import {
  useCreateCommunityMutation,
  useJoinCommunityMutation,
} from "../../gen/graphql-client";
import { useClientRoute } from "./../../hooks/useClientRoute";
import { tokenStorage } from "./../../utils/local-storage/token";

/**
 * client/create/communityで使用されるhooks
 */
export const useCreateCommunityHooks = () => {
  const [createCommunityMutation] = useCreateCommunityMutation();
  const [joinCommunityMutation] = useJoinCommunityMutation();
  const { goToHome } = useClientRoute();

  const createCommunity = useCallback(
    (communityName: string) => {
      createCommunityMutation({
        variables: {
          name: communityName,
        },
        onCompleted: (data) => {
          joinCommunityMutation({
            variables: {
              communityId: data.createCommunity.id,
            },
            onCompleted: (data) => {
              tokenStorage.save(data.joinCommunity.token);
              goToHome({ replace: true });
            },
          });
        },
      });
    },
    [createCommunityMutation, joinCommunityMutation, goToHome]
  );

  return { createCommunity };
};
