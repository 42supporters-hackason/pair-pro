import {
  Box,
  Grid,
  Input,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import React from "react";

/**
 * p2p相手とやり取りをするページ
 */
export const ChatPage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "70%", display: "flex" }}>
        ビデオチャット機能を追加する予定
      </Box>
      <Box sx={{ width: "30%", display: "flex", flexDirection: "column" }}>
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
        <Box sx={{ height: "450px" }}>チャット</Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: "15px",
            alignItems: "flex-end",
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
          <SendRoundedIcon sx={{ cursor: "pointer", mb: "10px" }} />
        </Box>
      </Box>
    </Box>
  );
};
