import { Box, SxProps, Theme } from "@mui/system";
import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  sx?: SxProps<Theme>;
}

/**
 * Cardコンポーネント
 */
export const Card = ({ children, ...props }: Props) => {
  return (
    <Box
      sx={{
        bgcolor: "primary.light",
        widht: "100%",
        height: "100%",
        p: 2,
        borderRadius: 2,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
