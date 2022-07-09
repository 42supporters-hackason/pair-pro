import React, { HTMLAttributes } from "react";
import { Box, Button, SxProps, Typography } from "@mui/material";
import { Theme } from "@mui/system";
import { Card } from "../Card";

interface Props extends HTMLAttributes<HTMLDivElement> {
  /**
   * githubId
   */
  githubId?: string;
  /**
   * タイトル
   */
  title?: string;
  /**
   * 内容
   */
  content?: string;
  /**
   * 使用言語
   */
  languages?: string[];
  /**
   * ボタンの有無
   */
  hasButton?: boolean;
  /**
   * 合意の場合のテキスト
   */
  agreeTitle?: string;
  /**
   * 合意の場合のアクション
   */
  onAgree?: () => void;
  /**
   * 閉じるアクション
   */
  onClose?: () => void;
  sx?: SxProps<Theme>;
}

/**
 * ユーザ情報を表示するカード
 */
export const ProfileCard = ({
  githubId = "taisei-13046",
  title,
  content,
  languages,
  hasButton = false,
  agreeTitle,
  onAgree,
  onClose,
  ...props
}: Props) => {
  return (
    <Box {...props}>
      <Card>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <Typography variant="h5">{githubId}</Typography>
          <Typography variant="h6">Status</Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Box
              component="img"
              sx={{ height: "150px" }}
              src={`https://github-readme-stats.vercel.app/api?username=${githubId}&theme=onedark&show_icons=true`}
            />
            <Box
              component="img"
              sx={{ height: "150px" }}
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${githubId}&layout=compact`}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>募集タイトル</Typography>
            <Typography fontWeight="bold" variant="subtitle2">
              {title}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>募集詳細</Typography>
            <Typography fontWeight="bold" variant="subtitle2">
              {content}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>使用言語</Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              {languages &&
                languages.map((language) => (
                  <Typography
                    fontWeight="bold"
                    variant="subtitle2"
                    key={language}
                  >
                    {language}
                  </Typography>
                ))}
            </Box>
          </Box>
          {hasButton && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              <Button
                sx={{
                  mt: "15px",
                  width: "450px",
                  height: "40px",
                  borderRadius: "10px",
                }}
                variant="contained"
                onClick={onAgree}
              >
                {agreeTitle}
              </Button>
              <Button
                sx={{
                  mt: "auto",
                  width: "450px",
                  height: "40px",
                  borderRadius: "10px",
                }}
                variant="contained"
                type="button"
                color="secondary"
                onClick={onClose}
              >
                閉じる
              </Button>
            </Box>
          )}
        </Box>
      </Card>
    </Box>
  );
};
