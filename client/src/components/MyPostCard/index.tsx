import React, { HTMLAttributes } from "react";
import {
  Box,
  Button,
  CardActionArea,
  CardContent,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { Card } from "../Card";

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
   * 編集ボタンを押した際のアクション
   */
  onEdit: () => void;
  /**
   * 削除ボタンを押した際のアクション
   */
  onDelete: () => void;
  sx?: SxProps<Theme>;
}

/**
 * 自分が投稿したPost
 */
export const MyPostCard = ({ title, content, languages, ...props }: Props) => {
  return (
    <Box {...props}>
      <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
        <CardActionArea>
          <CardContent sx={{ m: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 3, px: 3 }}
              >
                <Typography variant="h6">{title}</Typography>
              </Box>
              <Box sx={{ borderRadius: 2, bgcolor: "primary.light", p: 2 }}>
                <Typography variant="subtitle1">{content}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  px: 3,
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Typography variant="subtitle1">使用言語</Typography>
                    {languages.map((language) => (
                      <Typography variant="h6" key={language}>
                        {language}
                      </Typography>
                    ))}
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 5, alignItems: "center" }}>
                  <Button variant="outlined">内容を修正する</Button>
                  <Button variant="outlined">削除する</Button>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};
