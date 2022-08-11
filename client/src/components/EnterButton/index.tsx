import React from "react";
import { Button, ButtonProps } from "@mui/material";

export const EnterButton = ({ ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      variant="outlined"
      sx={{
        width: "40%",
        height: "60px",
        m: "auto",
        fontWeight: "bold",
        fontSize: "20px",
      }}
    >
      入室する
    </Button>
  );
};
