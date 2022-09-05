import { useClientRoute } from "../../hooks/useClientRoute";
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
  /**
   * コミュニティ脱退ハンドラ
   */
  onExitCommunity: () => void;
}

/**
 * 一般ユーザ向けmenu
 */
export const useClientHeaderMenu = ({
  onLogout,
  onChangeCommunity,
  onExitCommunity,
}: Props): ClientMenu => {
  const {
    goToApply,
    goToRecruit,
    goToEditProfile,
    goToMember,
    goToExplanation,
    goToStatistics,
    goToEditCommunity,
  } = useClientRoute();

  return {
    listMenu: [
      {
        label: "ドライバーになる",
        action: goToApply,
      },
      {
        label: "ナビゲータになる",
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
        label: "コミュニティを移動する",
        action: onChangeCommunity,
      },
      {
        label: "コミュニティ名を変更する",
        action: goToEditCommunity,
      },
      {
        label: "アプリの使い方",
        action: goToExplanation,
      },
      {
        label: "コミュニティから脱退する",
        action: onExitCommunity,
      },
      {
        label: "ログアウト",
        action: onLogout,
      },
    ],
  };
};
