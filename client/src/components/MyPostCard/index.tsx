import React, { HTMLAttributes } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
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
export const MyPostCard = ({
  title,
  content,
  languages,
  onEdit,
  onDelete,
  ...props
}: Props) => {
  return (
    <Box {...props}>
      <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
        <CardContent sx={{ m: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3, px: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  wordBreak: "break-all",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {title}
              </Typography>
            </Box>
            <Box sx={{ borderRadius: 2, bgcolor: "primary.light", p: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  wordBreak: "break-all",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "3",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {content}
              </Typography>
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
                <Button variant="outlined" onClick={onEdit}>
                  修正
                  <EditIcon />
                </Button>
                <Button variant="outlined" onClick={onDelete}>
                  削除
                  <DeleteIcon />
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
