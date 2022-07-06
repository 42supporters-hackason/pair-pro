import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Card } from "../Card";

interface Props {
  /**
   * 文言
   */
  content: string;
  /**
   * 「はい」を押した際のアクション
   */
  onAgree: () => void;
  /**
   * 「いいえ」を押した際のアクション
   */
  onCancel: () => void;
}

/**
 * 「はい」「いいえ」を答えるModalコンポーネント
 */
export const AgreeModal = ({ content, onAgree, onCancel }: Props) => {
  return (
    <Card>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography sx={{ textAlign: "center" }}>{content}</Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: "25px" }}>
          <Button
            sx={{
              mt: "15px",
              width: "200px",
              height: "40px",
              borderRadius: "10px",
            }}
            variant="contained"
            onClick={onAgree}
          >
            はい
          </Button>
          <Button
            sx={{
              mt: "auto",
              width: "200px",
              height: "40px",
              borderRadius: "10px",
            }}
            variant="contained"
            type="button"
            color="secondary"
            onClick={onCancel}
          >
            いいえ
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
