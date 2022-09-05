import { useCallback } from "react";
import { NavigateOptions, useNavigate } from "react-router-dom";
import { CLIENT_ROUTE_PATH } from "../routes/client";

/**
 * 一般画面の画面遷移Hooks
 */
export const useClientRoute = () => {
  const navigate = useNavigate();

  const goToHome = useCallback(
    (options?: NavigateOptions) => {
      navigate(CLIENT_ROUTE_PATH.HOME, options);
    },
    [navigate]
  );

  const goToApply = useCallback(
    (options?: NavigateOptions) => {
      navigate(CLIENT_ROUTE_PATH.APPLY, options);
    },
    [navigate]
  );

  const goToRecruit = useCallback(
    (options?: NavigateOptions) => {
      navigate(CLIENT_ROUTE_PATH.RECRUIT, options);
    },
    [navigate]
  );

  const goToEditProfile = useCallback(
    (options?: NavigateOptions) => {
      navigate(CLIENT_ROUTE_PATH.EDIT_PROFILE, options);
    },
    [navigate]
  );

  const goToEditCommunity = useCallback(
    (options?: NavigateOptions) => {
      navigate(CLIENT_ROUTE_PATH.EDIT_COMMUNITY, options);
    },
    [navigate]
  );

  const goToExplanation = useCallback(
    (options?: NavigateOptions) => {
      navigate(CLIENT_ROUTE_PATH.EXPLANATION, options);
    },
    [navigate]
  );

  const goToMember = useCallback(
    (options?: NavigateOptions) => {
      navigate(CLIENT_ROUTE_PATH.MEMBER, options);
    },
    [navigate]
  );

  const goToStatistics = useCallback(
    (options?: NavigateOptions) => {
      navigate(CLIENT_ROUTE_PATH.STATISTICS, options);
    },
    [navigate]
  );

  const goToEditPost = useCallback(
    (id?: string, options?: NavigateOptions) => {
      if (id === undefined) {
        return;
      }
      navigate(
        {
          pathname: CLIENT_ROUTE_PATH.EDIT_POST,
          search: `?post_id=${id}`,
        },
        options
      );
    },
    [navigate]
  );

  const goToChat = useCallback(
    (id?: string, options?: NavigateOptions) => {
      if (id === undefined) {
        return;
      }
      navigate(
        {
          pathname: CLIENT_ROUTE_PATH.CHAT,
          search: `?room_id=${id}`,
        },
        options
      );
    },
    [navigate]
  );

  return {
    goToHome,
    goToApply,
    goToRecruit,
    goToEditProfile,
    goToEditPost,
    goToEditCommunity,
    goToExplanation,
    goToMember,
    goToChat,
    goToStatistics,
  };
};
