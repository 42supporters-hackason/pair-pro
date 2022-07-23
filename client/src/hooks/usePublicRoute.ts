import { useCallback } from "react";
import { NavigateOptions, useNavigate } from "react-router-dom";
import { PUBLIC_ROUTE_PATH } from "./../routes/public";

/**
 * 権限不必要画面の画面遷移Hooks
 */
export const usePublicRoute = () => {
  const navigate = useNavigate();

  const goToLogin = useCallback(
    (options?: NavigateOptions) => {
      navigate(PUBLIC_ROUTE_PATH.LOGIN, options);
    },
    [navigate]
  );

  const goToCommunity = useCallback(
    (options?: NavigateOptions) => {
      navigate(PUBLIC_ROUTE_PATH.COMMUNITY, options);
    },
    [navigate]
  );

  const goToCreateCommunity = useCallback(
    (options?: NavigateOptions) => {
      navigate(PUBLIC_ROUTE_PATH.CREATE_COMMUNITY, options);
    },
    [navigate]
  );

  return { goToLogin, goToCommunity, goToCreateCommunity };
};
