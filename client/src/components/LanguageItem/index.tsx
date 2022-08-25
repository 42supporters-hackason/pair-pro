import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Card } from "../Card";

interface Props {
  /**
   * 言語名
   */
  name: string;
  /**
   * 回数
   */
  count: number;
  /**
   * url
   */
  imageUrl?: string | null;
  /**
   * rank順
   */
  rank: number;
}

export const LanguageItem = ({ rank, name, count, imageUrl }: Props) => {
  return (
    <Card>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "40px",
            width: "50%",
          }}
        >
          <Typography fontWeight="bold">{rank}位</Typography>
          <Typography fontWeight="bold" variant="h5">
            {name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "40px",
            width: "20%",
          }}
        >
          <Box component="img" src={imageUrl ?? ""} sx={{ height: "40px" }} />
          <Typography variant="h6" sx={{ alignSelf: "flex-end" }}>
            <b>{count}</b>回
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
