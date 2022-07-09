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
    <Box>
      {side === "left" && (
        <Box
          sx={{
            textAlign: "left",
          }}
        >
          <Typography
            sx={{
              bgcolor: "secondary.light",
              py: 1,
              px: 2,
              borderRadius: 4,
              borderTopLeftRadius: 1,
              display: "inline-block",
              wordBreak: "break-word",
              maxWidth: "70%",
            }}
          >
            {content}
          </Typography>
        </Box>
      )}
      {side === "right" && (
        <Box
          sx={{
            textAlign: "right",
          }}
        >
          <Typography
            sx={{
              bgcolor: "primary.dark",
              color: "primary.contrastText",
              py: 1,
              px: 2,
              borderRadius: 4,
              borderTopRightRadius: 1,
              display: "inline-block",
              wordBreak: "break-word",
              maxWidth: "70%",
              textAlign: "left",
            }}
          >
            {content}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
