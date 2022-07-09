import { Suspense, useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet, useSearchParams } from "react-router-dom";
import { GeneralHeader } from "../../components/GeneralHeader";
import { useIsLogin, useProfile } from "../../context/auth";
import { useSignInMutation } from "../../gen/graphql-client";
import { usePublicRoute } from "../../hooks/usePublicRoute";
import { tokenStorage } from "../../utils/local-storage/token";

const DEMO_MP = 2;

/**
 * Client画面共通のLayout
 */
export const ClientLayout = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const { isLogin, setIsLogin } = useIsLogin();
  const { setProfile } = useProfile();
  const { goToLogin } = usePublicRoute();
  const [signInMutation] = useSignInMutation();

  useEffect(() => {
    const signIn = async () => {
      if (code !== null && tokenStorage.load() === null) {
        await signInMutation({
          variables: { code },
          onCompleted: (data) => {
            tokenStorage.save(data?.authGithub.token ?? "");
            setIsLogin.on();
            setProfile({
              githubLogin: data?.authGithub.user.githubLogin,
              name: data?.authGithub.user.name,
              matchingPoint: data?.authGithub.user.matchingPoint,
              bio: data?.authGithub.user.bio,
            });
          },
        });
        if (tokenStorage.load() === null) {
          goToLogin();
        }
      }
    };

    if (!isLogin) {
      signIn();
    }
  }, [signInMutation, isLogin, code, goToLogin, setIsLogin, setProfile]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: "100vh",
      }}
    >
      <GeneralHeader matchingPoint={DEMO_MP} />
      <Box sx={{ flex: "1" }}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  );
};
