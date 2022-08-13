import { useClientRoute } from "../../hooks/useClientRoute";
import { usePublicRoute } from "../../hooks/usePublicRoute";
import { ClientMenu } from "./types";

interface Props {
  /**
   * ログアウトハンドラ
   */
  onLogout: () => void;
  /**
   * コミュニティ変更ハンドラ
   */
  onChangeCommunity: () => void;
}

/**
 * 一般ユーザ向けmenu
 */
export const useClientHeaderMenu = ({
  onLogout,
  onChangeCommunity,
}: Props): ClientMenu => {
  const {
    goToApply,
    goToRecruit,
    goToEditProfile,
    goToMember,
    goToExplanation,
    goToStatistics,
  } = useClientRoute();
  const { goToCommunity } = usePublicRoute();

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
      {
        label: "ランキングを見る",
        action: goToStatistics,
      },
    ],
    userMenu: [
      {
        label: "プロフィール編集",
        action: goToEditProfile,
      },
      {
        label: "コミュニティを変更する",
        action: onChangeCommunity,
      },
      {
        label: "アプリの使い方",
        action: goToExplanation,
      },
      {
        label: "ログアウト",
        action: onLogout,
      },
    ],
  };
};
