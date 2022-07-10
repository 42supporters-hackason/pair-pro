import { Suspense, useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet, useSearchParams } from "react-router-dom";
import { GeneralHeader } from "../../components/GeneralHeader";
import { useAuth } from "../../context/auth";

const DEMO_MP = 2;

/**
 * Client画面共通のLayout
 */
export const ClientLayout = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const { isLogin, signIn } = useAuth();

  useEffect(() => {
    if (!isLogin && code !== null) {
      signIn(code);
    }
  }, [code, signIn, isLogin]);

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
