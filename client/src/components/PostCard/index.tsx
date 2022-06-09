import React, { HTMLAttributes } from "react";
import Card from "@mui/material/Card";
import {
  Avatar,
  Box,
  CardActionArea,
  CardContent,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";

interface Props extends HTMLAttributes<HTMLDivElement> {
  initialName: string;
  title: string;
  content: string;
  language: string[];
  sx?: SxProps<Theme>;
}

/**
 * 投稿された内容を表示するカードコンポーネント
 */
export const PostCard = ({
  initialName,
  title,
  content,
  language,
  ...props
}: Props) => {
  return (
    <Box {...props}>
      <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
        <CardActionArea>
          <CardContent sx={{ m: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Avatar>{initialName}</Avatar>
                <Typography variant="h6">{title}</Typography>
              </Box>
              <Box sx={{ borderRadius: 2, bgcolor: "primary.main" }}>
                <Typography variant="subtitle1">{content}</Typography>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};
