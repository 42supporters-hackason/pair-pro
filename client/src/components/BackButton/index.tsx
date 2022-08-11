import React from "react";
import { ButtonProps, Button } from "@mui/material";

/**
 * 戻る系のグレーボタン
 */
export const BackButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      sx={{
        height: "50px",
        borderRadius: "20px",
        fontWeight: "bold",
        color: "secondary.dark",
        ["&:hover"]: {
          bgcolor: "secondary.main",
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
