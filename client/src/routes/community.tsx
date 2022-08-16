import { RouteObject } from "react-router-dom";
import { lazyImport } from "../utils";

const { CommunityPage } = lazyImport(
  () => import("../pages/public/community"),
  "CommunityPage"
);

const { CreateCommunityPage } = lazyImport(
  () => import("../pages/public/create/community"),
  "CreateCommunityPage"
);

const CREATE = "/create";
const COMMUNITY = "/community";

export const COMMUNITY_ROUTE_PATH = {
  COMMUNITY: `${COMMUNITY}`,
  CREATE_COMMUNITY: `${CREATE}${COMMUNITY}`,
} as const;

export const communityRoutes: RouteObject[] = [
  {
    path: COMMUNITY_ROUTE_PATH.COMMUNITY,
    element: <CommunityPage />,
  },
  {
    path: COMMUNITY_ROUTE_PATH.CREATE_COMMUNITY,
    element: <CreateCommunityPage />,
  },
];
