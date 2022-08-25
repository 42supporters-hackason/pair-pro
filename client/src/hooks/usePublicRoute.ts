import { useCallback } from "react";
import { NavigateOptions, useNavigate } from "react-router-dom";
import { PUBLIC_ROUTE_PATH } from "./../routes/public";

/**
 * 権限不必要画面の画面遷移Hooks
 */
export const usePublicRoute = () => {
  const navigate = useNavigate();

  const goToCommunity = useCallback(
    (options?: NavigateOptions) => {
      navigate(PUBLIC_ROUTE_PATH.COMMUNITY, options);
    },
    [navigate]
  );

  const goToLogin = useCallback(
    (options?: NavigateOptions) => {
      navigate(PUBLIC_ROUTE_PATH.LOGIN, options);
    },
    [navigate]
  );

  const goToNotFound = useCallback(
    (options?: NavigateOptions) => {
      navigate(PUBLIC_ROUTE_PATH.NOT_FOUND, options);
    },
    [navigate]
  );

  return { goToLogin, goToCommunity, goToNotFound };
};
