import { useClientRoute } from "../../hooks/useClientRoute";
import { ClientMenu } from "./types";

interface Props {
  /**
   * ログアウトハンドラ
   */
  onLogout: () => void;
}

/**
 * 一般ユーザ向けmenu
 */
export const useClientHeaderMenu = ({ onLogout }: Props): ClientMenu => {
  const { goToApply, goToRecruit, goToEditProfile, goToMember } =
    useClientRoute();

  return {
    listMenu: [
      {
        label: "ペアプロを募集する",
        action: goToApply,
      },
      {
        label: "投稿一覧を見る",
        action: goToRecruit,
      },
      {
        label: "メンバーを見る",
        action: goToMember,
      },
    ],
    userMenu: [
      {
        label: "プロフィール",
        action: goToEditProfile,
      },
      {
        label: "ログアウト",
        action: onLogout,
      },
    ],
  };
};
