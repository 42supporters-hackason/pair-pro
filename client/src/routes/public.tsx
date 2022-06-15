import { RouteObject } from "react-router-dom";
import { lazyImport } from "../utils";

const { LoginPage } = lazyImport(
  () => import("../pages/public/login"),
  "LoginPage"
);

const { SignupPage } = lazyImport(
  () => import("../pages/public/signup"),
  "SignupPage"
);

const LOGIN = "login";
const SIGNUP = "signup";

export const PUBLIC_ROUTE_PATH = {
  LOGIN: `/${LOGIN}`,
  SIGNUP: `/${SIGNUP}`,
} as const;

export const publicRoutes: RouteObject[] = [
  {
    path: PUBLIC_ROUTE_PATH.LOGIN,
    element: <LoginPage />,
  },
  {
    path: PUBLIC_ROUTE_PATH.SIGNUP,
    element: <SignupPage />,
  },
];
