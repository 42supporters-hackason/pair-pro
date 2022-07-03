import { usePublicRoute } from "./../../hooks/usePublicRoute";
import { accessTokenStorage } from "./../../utils/local-storage/access_token";
import { useClientRoute } from "../../hooks/useClientRoute";
import { noop } from "../../utils";
import { ClientMenu } from "./types";

/**
 * 一般ユーザ向けmenu
 */
export const useClientHeaderMenu = (): ClientMenu => {
  const { goToApply, goToRecruit } = useClientRoute();
  const { goToLogin } = usePublicRoute();

  return {
    listMenu: [
      {
        label: "募集する",
        action: goToApply,
      },
      {
        label: "一覧を見る",
        action: goToRecruit,
      },
    ],
    userMenu: [
      {
        label: "プロフィール",
        action: noop,
      },
      {
        label: "ログアウト",
        action: () => {
          accessTokenStorage.clear();
          goToApply();
        },
      },
    ],
  };
};
