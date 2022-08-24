import { useRoutes } from "react-router-dom";
import { useAuth } from "../context/auth";
import { clientRoutes } from "./client";
import { communityRoutes } from "./community";
import { publicRoutes } from "./public";

/**
 * アプリ全体のルーティング定義コンポーネント
 */
export const AppRoutes = () => {
  const { loginStatus } = useAuth();
  const routes = [...publicRoutes];
  if (loginStatus === "authFinished") {
    routes.push(...communityRoutes);
  }
  if (loginStatus === "logined") {
    routes.push(...clientRoutes);
  }
  const element = useRoutes(routes);
  return element;
};
