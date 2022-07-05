import React, { HTMLAttributes } from "react";
import {
  CardActionArea,
  CardContent,
  SxProps,
  Theme,
  Box,
} from "@mui/material";

interface Props extends HTMLAttributes<HTMLDivElement> {
  sx?: SxProps<Theme>;
}

/**
 * IconをWrapするコンポーネント
 */
export const IconButton = ({ children, ...props }: Props) => {
  return (
    <Box {...props}>
      <CardActionArea sx={{ borderRadius: 4 }}>
        <CardContent
          sx={{
            bgcolor: "#fff",
            display: "inline-flex",
            p: 2,
            borderRadius: 4,
            boxShadow: 3,
            m: "auto",
            cursor: "pointer",
          }}
        >
          {children}
        </CardContent>
      </CardActionArea>
    </Box>
  );
};
