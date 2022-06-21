import { useClientRoute } from "../../hooks/useClientRoute";
import { MenuNode } from "./types";

/**
 * 一般ユーザ向けmenu
 */
export const useClientHeaderMenu = (): MenuNode[] => {
  const { goToApply, goToRecruit } = useClientRoute();

  return [
    {
      label: "募集する",
      action: goToApply,
    },
    {
      label: "一覧を見る",
      action: goToRecruit,
    },
  ];
};
