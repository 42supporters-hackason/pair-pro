import React, { ReactNode } from "react";
import { Box, Button, Typography } from "@mui/material";
import { BackButton } from "../BackButton";
import { Card } from "../Card";

interface Props {
  /**
   * 文言
   */
  children: ReactNode;
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
export const AgreeModal = ({ children, onAgree, onCancel }: Props) => {
  return (
    <Card>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography sx={{ textAlign: "center" }}>{children}</Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: "25px" }}>
          <Button
            sx={{
              mt: "15px",
              width: "200px",
              height: "40px",
              borderRadius: "20px",
            }}
            variant="contained"
            onClick={onAgree}
          >
            はい
          </Button>
          <BackButton
            style={{ width: "200px", height: "40px", marginTop: "auto" }}
            onClick={onCancel}
          >
            いいえ
          </BackButton>
        </Box>
      </Box>
    </Card>
  );
};
