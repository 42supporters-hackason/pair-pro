import { useCallback } from "react";
import { useAuth } from "../../context/auth";
import {
  useCreateCommunityMutation,
  useJoinCommunityMutation,
} from "../../gen/graphql-client";
import { useClientRoute } from "./../../hooks/useClientRoute";
import { loginStatusStorage } from "./../../utils/local-storage/login_status";
import { tokenStorage } from "./../../utils/local-storage/token";

/**
 * client/create/communityで使用されるhooks
 */
export const useCreateCommunityHooks = () => {
  const [createCommunityMutation] = useCreateCommunityMutation();
  const [joinCommunityMutation] = useJoinCommunityMutation();
  const { goToHome } = useClientRoute();
  const { setLoginStatus } = useAuth();

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
              loginStatusStorage.save("logined");
              setLoginStatus("logined");
              goToHome({ replace: true });
            },
          });
        },
      });
    },
    [createCommunityMutation, joinCommunityMutation, goToHome, setLoginStatus]
  );

  return { createCommunity };
};
