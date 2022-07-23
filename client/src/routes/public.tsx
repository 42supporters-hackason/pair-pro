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

const { CreateCommunityPage } = lazyImport(
  () => import("../pages/public/create/community"),
  "CreateCommunityPage"
);

const LOGIN = "/";
const CREATE = "/create";
const COMMUNITY = "/community";

export const PUBLIC_ROUTE_PATH = {
  LOGIN: `${LOGIN}`,
  COMMUNITY: `${COMMUNITY}`,
  CREATE_COMMUNITY: `${CREATE}${COMMUNITY}`,
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
  {
    path: PUBLIC_ROUTE_PATH.CREATE_COMMUNITY,
    element: <CreateCommunityPage />,
  },
];
