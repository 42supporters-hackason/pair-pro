import { useRoutes } from "react-router-dom";
import { clientRoutes } from "./client";
import { publicRoutes } from "./public";

/**
 * アプリ全体のルーティング定義コンポーネント
 */
export const AppRoutes = () => {
  const routes = [...publicRoutes, ...clientRoutes];
  const element = useRoutes(routes);
  return element;
};
