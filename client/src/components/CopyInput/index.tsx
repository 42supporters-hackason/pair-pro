import React, { useCallback } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { CardActionArea, Typography } from "@mui/material";
import { Box } from "@mui/system";
import copy from "copy-to-clipboard";

interface Props {
  value: string;
}

/**
 * クリップボードにコピーするためのコンポーネント
 */
export const CopyInput = ({ value }: Props) => {
  const handleCopy = useCallback(() => {
    copy(value);
  }, [value]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: 2,
        borderColor: "primary.main",
        px: 2,
        py: "5px",
        borderRadius: "10px",
        gap: 3,
      }}
    >
      <Typography>{value}</Typography>
      <Box onClick={handleCopy}>
        <CardActionArea
          sx={{
            display: "inline-flex",
            width: "auto",
            borderRadius: 3,
            p: "5px",
          }}
        >
          <AssignmentIcon color="primary" sx={{ cursor: "pointer" }} />
        </CardActionArea>
      </Box>
    </Box>
  );
};
