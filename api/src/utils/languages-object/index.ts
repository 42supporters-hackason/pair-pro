import json from "../../assets/json/languages.json";

/**
 * 全ての言語名を持ったオブジェクトの配列
 * idはjsonの順番でそれぞれindexを付与
 */
export const languagesObject = json.languages.map((language, index) => ({
  id: index,
  name: language,
}));
