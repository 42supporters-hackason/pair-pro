import React, { useCallback } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { useAuth } from "../../context/auth";
import { useClientRoute } from "../../hooks/useClientRoute";
import { usePublicRoute } from "../../hooks/usePublicRoute";

/**
 * ローディング画面
 */
export const LoadingPage = () => {
  const { loginStatus } = useAuth();
  const { goToHome } = useClientRoute();
  const { goToCommunity, goToLogin } = usePublicRoute();

  const handleBackPage = useCallback(() => {
    if (loginStatus === "authFinished") {
      goToCommunity({ replace: true });
    }
    if (loginStatus === "logined") {
      goToHome({ replace: true });
    }
    goToLogin({ replace: true });
  }, [goToCommunity, goToHome, goToLogin, loginStatus]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mt: "300px",
        gap: "50px",
      }}
    >
      <CircularProgress size={100} />
      <Button
        variant="contained"
        color="secondary"
        sx={{ height: "50px", borderRadius: "40px", fontSize: "20px", px: 3 }}
        onClick={handleBackPage}
      >
        前のページに戻る
      </Button>
    </Box>
  );
};
