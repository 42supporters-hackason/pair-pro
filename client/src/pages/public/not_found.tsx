import React, { useCallback } from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAuth } from "../../context/auth";
import { useClientRoute } from "../../hooks/useClientRoute";
import { usePublicRoute } from "../../hooks/usePublicRoute";

export const NotFoundPage = () => {
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
    <Box sx={{ height: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: "200px",
          gap: "50px",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Not Found Page
        </Typography>
        <Button
          variant="contained"
          sx={{ height: "50px", borderRadius: "40px", fontSize: "20px", px: 3 }}
          onClick={handleBackPage}
        >
          前のページに戻る
        </Button>
      </Box>
    </Box>
  );
};
