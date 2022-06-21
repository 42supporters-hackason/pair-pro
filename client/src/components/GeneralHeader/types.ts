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
