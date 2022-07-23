import { RouteObject } from "react-router-dom";
import { lazyImport } from "../utils";

const { LoginPage } = lazyImport(
  () => import("../pages/public/login"),
  "LoginPage"
);

const { CommunityPage } = lazyImport(
  () => import("../pages/public/community"),
  "CommunityPage"
);

const LOGIN = "/";
const COMMUNITY = "/community";

export const PUBLIC_ROUTE_PATH = {
  LOGIN: `${LOGIN}`,
  COMMUNITY: `${COMMUNITY}`,
} as const;

export const publicRoutes: RouteObject[] = [
  {
    path: PUBLIC_ROUTE_PATH.LOGIN,
    element: <LoginPage />,
  },
  {
    path: PUBLIC_ROUTE_PATH.COMMUNITY,
    element: <CommunityPage />,
  },
];
