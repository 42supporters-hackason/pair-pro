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
        bgcolor: "#fff",
        widht: "100%",
        height: "100%",
        p: 4,
        borderRadius: 4,
        boxShadow: 3,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
