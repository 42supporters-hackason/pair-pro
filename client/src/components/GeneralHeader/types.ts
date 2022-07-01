export interface MenuNode {
  /**
   * Headerのラベル
   */
  label: string;
  /**
   * クリック時のアクション
   */
  action: () => void;
}

export interface ClientMenu {
  listMenu: MenuNode[];
  userMenu: MenuNode[];
}
