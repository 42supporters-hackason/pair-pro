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
import format from "date-fns/format";

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
  language: string;
  /**
   * 実施日時
   */
  date?: Date;
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
  language,
  date,
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
                  <Typography variant="h6">{language}</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Typography variant="subtitle1">日時</Typography>
                  <Typography variant="h6">
                    {date && format(date, "yyyy/MM/dd")}
                  </Typography>
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
