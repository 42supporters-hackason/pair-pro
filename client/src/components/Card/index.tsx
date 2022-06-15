import { Box } from "@mui/system";
import React, { HTMLAttributes } from "react";

export const Card = ({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return <Box {...props}>{children}</Box>;
};
