import React from "react";
import { Box, Typography } from "@mui/material";

type Side = "right" | "left";

interface Props {
  /**
   * chat内容
   */
  content: string;
  /**
   * 左右どちらか
   */
  side: Side;
}

/**
 * Chatのメッセージコンポーネント
 */
export const ChatMessage = ({ content, side }: Props) => {
  return (
    <Box sx={{ width: "70%" }}>
      {side === "left" && (
        <Box
          sx={{
            bgcolor: "secondary.light",
            py: 1,
            px: 2,
            borderRadius: 4,
            textAlign: "left",
            display: "inline-block",
            wordBreak: "break-word",
          }}
        >
          <Typography>{content}</Typography>
        </Box>
      )}
      {side === "right" && (
        <Box
          sx={{
            bgcolor: "primary.light",
            py: 1,
            px: 2,
            borderRadius: 4,
            textAlign: "right",
            display: "inline-block",
            wordBreak: "break-word",
          }}
        >
          <Typography>{content}</Typography>
        </Box>
      )}
    </Box>
  );
};
