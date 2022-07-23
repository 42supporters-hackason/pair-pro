import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { usePublicRoute } from "../../../hooks/usePublicRoute";

export const CreateCommunityPage = () => {
  const { goToCommunity } = usePublicRoute();
  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "primary.light",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          新しいcomunityの名前を入力してください
        </Typography>
        <TextField label="community名" sx={{ mt: "45px", width: "450px" }} />
        <Button
          variant="contained"
          sx={{
            mt: "45px",
            width: "350px",
            height: "50px",
            borderRadius: "20px",
            fontWeight: "bold",
          }}
        >
          作成する
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            mt: "20px",
            width: "350px",
            height: "50px",
            borderRadius: "20px",
            fontWeight: "bold",
            color: "black",
          }}
          onClick={() => goToCommunity()}
        >
          戻る
        </Button>
      </Box>
    </Box>
  );
};
