import React, { HTMLAttributes } from "react";
import { Box, Button, SxProps, Typography } from "@mui/material";
import { Theme } from "@mui/system";
import { BackButton } from "../BackButton";
import { Card } from "../Card";

interface LanguagesDataType {
  name: string;
  imageUrl?: string | null;
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  /**
   * プロフィール名
   */
  name?: string;
  /**
   * githubLogin
   */
  githubLogin?: string;
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
   * 自己紹介
   */
  bio?: string;
  /**
   * ボタンの有無
   */
  hasButton?: boolean;
  /**
   * 合意の場合のテキスト
   */
  agreeTitle?: string;
  /**
   * 言語のデータ
   */
  languagesData: LanguagesDataType[];
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
  name,
  githubLogin,
  title,
  content,
  languages,
  bio,
  hasButton = false,
  agreeTitle,
  languagesData,
  onAgree,
  onClose,
  ...props
}: Props) => {
  return (
    <Box {...props}>
      <Card>
        <Box sx={{ display: "flex", gap: 3, p: 3, width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              p: 3,
              width: "40%",
              borderRadius: "20px",
            }}
          >
            <Box>
              <Typography>名前</Typography>
              <Typography fontWeight="bold">{name}</Typography>
            </Box>
            {bio && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography>自己紹介</Typography>
                <Typography fontWeight="bold">{bio}</Typography>
              </Box>
            )}
            <Box>
              <Typography>Status</Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                <Box
                  component="img"
                  sx={{ width: "350px" }}
                  src={`https://github-readme-stats.vercel.app/api?username=${githubLogin}&theme=onedark&show_icons=true`}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              boxShadow: "rgba(55, 49, 49, 0.2) 0px 2px 8px 0px",
              p: 3,
              mr: 3,
              gap: 3,
              width: "100%",
              borderRadius: "20px",
            }}
          >
            <Box>
              <Typography>募集タイトル</Typography>
              <Typography fontWeight="bold" variant="h6">
                {title}
              </Typography>
            </Box>
            <Box>
              <Typography>募集詳細</Typography>
              <Typography fontWeight="bold" variant="h6">
                {content}
              </Typography>
            </Box>
            <Box>
              <Typography>使用言語</Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                {languages &&
                  languages.map((language) => {
                    return (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        key={language}
                      >
                        <Typography fontWeight="bold" variant="h6">
                          {language}
                        </Typography>
                        <Box
                          component="img"
                          src={
                            languagesData.find(({ name }) => name === language)
                              ?.imageUrl ?? ""
                          }
                          sx={{ width: "40px", height: "40px" }}
                        />
                      </Box>
                    );
                  })}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          {hasButton && (
            <Box sx={{ display: "flex", gap: "25px" }}>
              <Button
                sx={{
                  mt: "auto",
                  height: "50px",
                  borderRadius: "20px",
                  width: "250px",
                }}
                variant="contained"
                onClick={onAgree}
              >
                {agreeTitle}
              </Button>
              <BackButton
                style={{ width: "250px", marginTop: "auto" }}
                onClick={onClose}
              >
                閉じる
              </BackButton>
            </Box>
          )}
        </Box>
      </Card>
    </Box>
  );
};
