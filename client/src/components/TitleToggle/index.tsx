import React, { HTMLAttributes } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

interface Props extends HTMLAttributes<HTMLDivElement> {
  /**
   * 選択されているか否か
   */
  selected: boolean;
}

export const TitleToggle = ({ children, selected, ...props }: Props) => {
  return (
    <Box {...props}>
      <Typography
        sx={{
          textDecoration: selected ? "underline" : "none",
          color: selected ? "black" : "secondary.main",
          cursor: selected ? "normal" : "pointer",
        }}
        fontWeight="bold"
      >
        {children}
      </Typography>
    </Box>
  );
};
