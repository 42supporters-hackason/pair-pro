import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

/**
 * client/member
 */
export const MemberPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: "30px",
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        42tokyo
      </Typography>
    </Box>
  );
};
