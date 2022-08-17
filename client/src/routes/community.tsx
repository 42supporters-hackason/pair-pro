import { RouteObject } from "react-router-dom";
import { lazyImport } from "../utils";

const { CreateCommunityPage } = lazyImport(
  () => import("../pages/client/community/create/community"),
  "CreateCommunityPage"
);

const CREATE = "/create";
const COMMUNITY = "/community";

export const COMMUNITY_ROUTE_PATH = {
  CREATE_COMMUNITY: `${CREATE}${COMMUNITY}`,
} as const;

export const communityRoutes: RouteObject[] = [
  {
    path: COMMUNITY_ROUTE_PATH.CREATE_COMMUNITY,
    element: <CreateCommunityPage />,
  },
];
