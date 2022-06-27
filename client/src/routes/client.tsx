import { RouteObject } from "react-router-dom";
import { ClientLayout } from "../pages/components/ClientLayout";
import { lazyImport } from "../utils";

const { HomePage } = lazyImport(
  () => import("../pages/client/home"),
  "HomePage"
);

const { ApplyPage } = lazyImport(
  () => import("../pages/client/apply"),
  "ApplyPage"
);

const { RecruitPage } = lazyImport(
  () => import("../pages/client/recruit"),
  "RecruitPage"
);

const { ChatPage } = lazyImport(
  () => import("../pages/client/chat"),
  "ChatPage"
);

const HOME = "home";
const APPLY = "apply";
const RECRUIT = "recruit";
const CHAT = "chat";

export const CLIENT_ROUTE_PATH = {
  HOME: `/${HOME}`,
  APPLY: `/${APPLY}`,
  RECRUIT: `/${RECRUIT}`,
  CHAT: `/${CHAT}`,
} as const;

export const clientRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        path: CLIENT_ROUTE_PATH.HOME,
        element: <HomePage />,
      },
      {
        path: CLIENT_ROUTE_PATH.APPLY,
        element: <ApplyPage />,
      },
      {
        path: CLIENT_ROUTE_PATH.RECRUIT,
        element: <RecruitPage />,
      },
      {
        path: CLIENT_ROUTE_PATH.CHAT,
        element: <ChatPage />,
      },
    ],
  },
];
