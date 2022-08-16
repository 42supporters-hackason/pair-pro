import { RouteObject } from "react-router-dom";
import { lazyImport } from "../utils";

const { CommunityPage } = lazyImport(
  () => import("../pages/public/community"),
  "CommunityPage"
);

const { LoginPage } = lazyImport(
  () => import("../pages/public/login"),
  "LoginPage"
);

const { NotFoundPage } = lazyImport(
  () => import("../pages/public/not_found"),
  "NotFoundPage"
);

const LOGIN = "/";
const CREATE = "/create";
const COMMUNITY = "/community";

export const PUBLIC_ROUTE_PATH = {
  LOGIN: `${LOGIN}`,
  COMMUNITY: `${COMMUNITY}`,
} as const;

export const publicRoutes: RouteObject[] = [
  {
    path: PUBLIC_ROUTE_PATH.COMMUNITY,
    element: <CommunityPage />,
  },
  {
    path: PUBLIC_ROUTE_PATH.LOGIN,
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
