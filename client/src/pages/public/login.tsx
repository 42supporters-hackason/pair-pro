import { Box, Typography } from "@mui/material";
import backgroundImg from "../../assets/p2p_background.jpg";
import React from "react";

export const LoginPage = () => {
  return (
    <>
      <Box
        component="img"
        src={backgroundImg}
        sx={{
          height: "100vh",
          width: "100%",
          position: "absolute",
          zIndex: "-999",
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{
            m: "115px auto 0",
            alignItems: "center",
            justifyContent: "ceter",
          }}
          variant="h3"
          fontWeight="bold"
        >
          P 2 P M a c h i n g
        </Typography>
      </Box>
    </>
  );
};
