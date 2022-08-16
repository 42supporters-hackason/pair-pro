import { useCallback } from "react";
import { NavigateOptions, useNavigate } from "react-router-dom";
import { COMMUNITY_ROUTE_PATH } from "./../routes/community";

/**
 * コミュニティ画面の画面遷移Hooks
 */
export const useCommunityRoute = () => {
  const navigate = useNavigate();

  const goToCommunity = useCallback(
    (options?: NavigateOptions) => {
      navigate(COMMUNITY_ROUTE_PATH.COMMUNITY, options);
    },
    [navigate]
  );

  const goToCreateCommunity = useCallback(
    (options?: NavigateOptions) => {
      navigate(COMMUNITY_ROUTE_PATH.CREATE_COMMUNITY, options);
    },
    [navigate]
  );

  return { goToCommunity, goToCreateCommunity };
};
