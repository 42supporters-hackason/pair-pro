import { useClientRoute } from "../../hooks/useClientRoute";
import { tokenStorage } from "../../utils/local-storage/token";
import { usePublicRoute } from "./../../hooks/usePublicRoute";
import { ClientMenu } from "./types";

/**
 * 一般ユーザ向けmenu
 */
export const useClientHeaderMenu = (): ClientMenu => {
  const { goToApply, goToRecruit, goToEditProfile } = useClientRoute();
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
        action: goToEditProfile,
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
