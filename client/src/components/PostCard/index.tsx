import React, { HTMLAttributes } from "react";
import {
  Avatar,
  Box,
  Button,
  CardActionArea,
  CardContent,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";

interface LanguagesDataType {
  name: string;
  imageUrl?: string | null;
}

export interface Props extends HTMLAttributes<HTMLDivElement> {
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
   * 名前
   */
  name?: string;
  /**
   * githubLogin
   */
  githubLogin?: string;
  /**
   * 言語のデータ
   */
  languagesData: LanguagesDataType[];
  /*
   * ぺあぷろ完了のアクション
   */
  onComplete?: () => void;
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
  githubLogin,
  languagesData,
  onComplete,
  onClick,
  ...props
}: Props) => {
  return (
    <Box {...props} sx={{ position: "relative" }}>
      <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
        <CardActionArea>
          <CardContent sx={{ m: 1 }} onClick={onClick}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Avatar src={`https://github.com/${githubLogin}.png`} />
                <Typography variant="h6">{title}</Typography>
              </Box>
              <Box sx={{ borderRadius: 2, bgcolor: "primary.light", p: 2 }}>
                <Typography variant="subtitle1">{content}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", gap: 10, alignItems: "center", px: 3 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    width: "50%",
                  }}
                >
                  <Typography variant="subtitle1">使用言語</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {languages &&
                      languages.map((language) => (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1px",
                          }}
                          key={language}
                        >
                          {languagesData.find(({ name }) => name === language)
                            ?.imageUrl ? (
                            <>
                              <Box
                                component="img"
                                src={
                                  languagesData.find(
                                    ({ name }) => name === language
                                  )?.imageUrl ?? ""
                                }
                                sx={{ width: "50px", height: "50px" }}
                              />
                              <Typography
                                sx={{ fontSize: "6px", mt: "auto", mb: "10px" }}
                              >
                                {language}
                              </Typography>
                            </>
                          ) : (
                            <Typography variant="h6">{language}</Typography>
                          )}
                        </Box>
                      ))}
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Typography variant="subtitle1">名前</Typography>
                  <Typography variant="h6">{name}</Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
        {onComplete && (
          <Box sx={{ position: "absolute", bottom: "15px", right: "40px" }}>
            <Button
              variant="contained"
              sx={{
                borderRadius: "999px",
                height: "40px",
                px: 3,
              }}
              onClick={onComplete}
            >
              ぺあぷろ完了！
            </Button>
          </Box>
        )}
      </Card>
    </Box>
  );
};
