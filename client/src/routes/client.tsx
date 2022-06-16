import { RouteObject } from "react-router-dom";
import { lazyImport } from "../utils";

const { HomePage } = lazyImport(
  () => import("../pages/client/home"),
  "HomePage"
);

const { ApplyPage } = lazyImport(
  () => import("../pages/client/apply"),
  "ApplyPage"
);

const { RecrutePage } = lazyImport(
  () => import("../pages/client/recrute"),
  "RecrutePage"
);

const HOME = "home";
const APPLY = "apply";
const RECRUTE = "recrute";

export const CLIENT_ROUTE_PATH = {
  HOME: `/${HOME}`,
  APPLY: `/${APPLY}`,
  RECRUTE: `/${RECRUTE}`,
} as const;

export const clientRoutes: RouteObject[] = [
  {
    path: CLIENT_ROUTE_PATH.HOME,
    element: <HomePage />,
  },
  {
    path: CLIENT_ROUTE_PATH.APPLY,
    element: <ApplyPage />,
  },
  {
    path: CLIENT_ROUTE_PATH.RECRUTE,
    element: <RecrutePage />,
  },
];
