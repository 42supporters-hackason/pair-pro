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
  } = useClientRoute();

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
