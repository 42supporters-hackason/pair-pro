import { Box, TextareaAutosize, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import React from "react";
import { Card } from "../../components/Card";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

/**
 * p2p相手とやり取りをするページ
 */
export const ChatPage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "70%", height: "calc(100vh - 68.5px)", m: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "calc(100% - 68.5px)",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", height: "80%", width: "100%", gap: 3 }}>
            <Box sx={{ width: "50%" }}>
              <Card>自分</Card>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Card>相手</Card>
            </Box>
          </Box>
          <Box></Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 68.5px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            borderBottom: 1,
            borderColor: "primary.main",
            py: "30px",
          }}
        >
          <Typography fontWeight="bold">タイトル</Typography>
          <CloseIcon sx={{ mr: "10px", cursor: "pointer" }} />
        </Box>
        <Box sx={{ m: "15px" }}>チャット</Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "15px",
            mt: "auto",
            mb: "10px",
          }}
        >
          <TextareaAutosize
            minRows={3}
            maxRows={3}
            style={{
              width: "80%",
              borderRadius: "15px",
              resize: "none",
              padding: "15px",
            }}
          />
          <SendRoundedIcon sx={{ cursor: "pointer", mb: "10px", mt: "auto" }} />
        </Box>
      </Box>
    </Box>
  );
};
