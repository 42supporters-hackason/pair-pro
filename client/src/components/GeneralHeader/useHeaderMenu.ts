import { useClientRoute } from "../../hooks/useClientRoute";
import { noop } from "../../utils";
import { tokenStorage } from "../../utils/local-storage/token";
import { usePublicRoute } from "./../../hooks/usePublicRoute";
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
          tokenStorage.clear();
          goToLogin();
        },
      },
    ],
  };
};
