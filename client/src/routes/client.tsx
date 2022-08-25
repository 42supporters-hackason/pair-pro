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

const { EditProfilePage } = lazyImport(
  () => import("../pages/client/edit/profile"),
  "EditProfilePage"
);

const { EditPostPage } = lazyImport(
  () => import("../pages/client/edit/post"),
  "EditPostPage"
);

const { ExplanationPage } = lazyImport(
  () => import("../pages/client/explanation"),
  "ExplanationPage"
);

const { MemberPage } = lazyImport(
  () => import("../pages/client/member"),
  "MemberPage"
);

const { StatisticsPage } = lazyImport(
  () => import("../pages/client/statistics"),
  "StatisticsPage"
);

const HOME = "home";
const APPLY = "apply";
const RECRUIT = "recruit";
const CHAT = "chat";
const EDIT = "edit";
const PROFILE = "profile";
const POST = "post";
const EXPLANATION = "explanation";
const MEMBER = "member";
const STATISTICS = "statistics";

export const CLIENT_ROUTE_PATH = {
  HOME: `/${HOME}`,
  APPLY: `/${APPLY}`,
  RECRUIT: `/${RECRUIT}`,
  CHAT: `/${CHAT}`,
  EDIT_PROFILE: `/${EDIT}/${PROFILE}`,
  EDIT_POST: `/${EDIT}/${POST}`,
  EXPLANATION: `/${EXPLANATION}`,
  MEMBER: `/${MEMBER}`,
  STATISTICS: `/${STATISTICS}`,
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
      {
        path: CLIENT_ROUTE_PATH.EDIT_PROFILE,
        element: <EditProfilePage />,
      },
      {
        path: CLIENT_ROUTE_PATH.EDIT_POST,
        element: <EditPostPage />,
      },
      {
        path: CLIENT_ROUTE_PATH.EXPLANATION,
        element: <ExplanationPage />,
      },
      {
        path: CLIENT_ROUTE_PATH.MEMBER,
        element: <MemberPage />,
      },
      {
        path: CLIENT_ROUTE_PATH.STATISTICS,
        element: <StatisticsPage />,
      },
    ],
  },
];
