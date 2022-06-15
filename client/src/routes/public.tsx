import { RouteObject } from "react-router-dom";
import { lazyImport } from "../utils";

const { LoginPage } = lazyImport(
  () => import("../pages/public/login"),
  "LoginPage"
);

const LOGIN = "login";

export const PUBLIC_ROUTE_PATH = {
  LOGIN: `/${LOGIN}`,
} as const;

export const publicRoutes: RouteObject[] = [
  {
    path: PUBLIC_ROUTE_PATH.LOGIN,
    element: <LoginPage />,
  },
];
