import { Box, SxProps, Theme } from "@mui/material";
import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  sx?: SxProps<Theme>;
}

/**
 * IconをWrapするコンポーネント
 */
export const IconButton = ({ children, ...props }: Props) => {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        display: "inline-flex",
        p: 2,
        borderRadius: 4,
        boxShadow: 3,
        m: "auto",
        cursor: "pointer",
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
