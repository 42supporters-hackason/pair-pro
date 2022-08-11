import React from "react";
import { Box, CircularProgress } from "@mui/material";

/**
 * ローディング画面
 */
export const LoadingPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mt: "300px",
      }}
    >
      <CircularProgress size={100} />
    </Box>
  );
};
