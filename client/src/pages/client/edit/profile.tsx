import React from "react";
import {
  Box,
  Button,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";

export const EditProfilePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: "30px",
        gap: "40px",
        width: "100%",
      }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
        プロフィール編集
      </Typography>
      <TextField sx={{ width: "500px" }} label="名前" />
      <Box>
        <Typography variant="subtitle2" sx={{ mb: "5px", ml: "5px" }}>
          自己紹介
        </Typography>
        <TextareaAutosize
          minRows={7}
          style={{
            width: "470px",
            borderRadius: "15px",
            resize: "none",
            padding: "15px",
          }}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Button
          sx={{
            mb: "35px",
            mt: "15px",
            width: "450px",
            height: "50px",
            borderRadius: "10px",
          }}
          variant="contained"
          type="submit"
        >
          上記の内容で募集をする
        </Button>
        <Button
          sx={{
            mb: "35px",
            mt: "auto",
            width: "450px",
            height: "50px",
            borderRadius: "10px",
          }}
          variant="contained"
          type="button"
          color="secondary"
        >
          戻る
        </Button>
      </Box>
    </Box>
  );
};
