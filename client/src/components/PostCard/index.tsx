import React, { HTMLAttributes } from "react";
import {
  Avatar,
  Box,
  CardActionArea,
  CardContent,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";

export interface Props extends HTMLAttributes<HTMLDivElement> {
  /**
   * タイトル
   */
  title: string;
  /**
   * 内容
   */
  content: string;
  /**
   * 使用言語
   */
  languages: string[];
  /**
   * 名前
   */
  name?: string;
  sx?: SxProps<Theme>;
}

/**
 * 投稿された内容を表示するカードコンポーネント
 */
export const PostCard = ({
  title,
  content,
  languages,
  name,
  ...props
}: Props) => {
  return (
    <Box {...props}>
      <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
        <CardActionArea>
          <CardContent sx={{ m: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Avatar src={`https://github.com/${name}.png`} />
                <Typography variant="h6">{title}</Typography>
              </Box>
              <Box sx={{ borderRadius: 2, bgcolor: "primary.light", p: 2 }}>
                <Typography variant="subtitle1">{content}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", gap: 10, alignItems: "center", px: 3 }}
              >
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Typography variant="subtitle1">使用言語</Typography>
                  {languages.map((language) => (
                    <Typography variant="h6" key={language}>
                      {language}
                    </Typography>
                  ))}
                </Box>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Typography variant="subtitle1">名前</Typography>
                  <Typography variant="h6">{name}</Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};
