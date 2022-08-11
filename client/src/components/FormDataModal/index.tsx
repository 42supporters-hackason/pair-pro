import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { BackButton } from "../BackButton";
import { Card } from "../Card";

interface Props {
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
   * 募集するを押した際のアクション
   */
  onAgree: () => void;
  /**
   * キャンセルするアクション
   */
  onCancel: () => void;
}

/**
 * 募集フォーム入力後の確認Modal
 */
export const FormDataModal = ({
  title,
  content,
  languages,
  onAgree,
  onCancel,
}: Props) => {
  return (
    <Box>
      <Card>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            justifyContent: "center",
            mx: 3,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            入力内容確認
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              alignItems: "flex-start",
              p: 2,
              boxShadow: "rgba(55, 49, 49, 0.2) 0px 2px 8px 0px",
              borderRadius: 3,
            }}
          >
            <Typography variant="subtitle2">タイトル</Typography>
            <Typography
              fontWeight="bold"
              sx={{
                textAlign: "left",
              }}
            >
              {title}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexDirection: "column",
              flexWrap: "wrap",
              alignItems: "flex-start",
              p: 2,
              boxShadow: "rgba(55, 49, 49, 0.2) 0px 2px 8px 0px",
              borderRadius: 3,
            }}
          >
            <Typography variant="subtitle2">内容</Typography>
            <Typography
              sx={{
                overflowWrap: "break-word",
                wordBreak: "break-all",
                textAlign: "left",
              }}
              fontWeight="bold"
            >
              {content}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexDirection: "column",
              alignItems: "flex-start",
              p: 2,
              boxShadow: "rgba(55, 49, 49, 0.2) 0px 2px 8px 0px",
              borderRadius: 3,
            }}
          >
            <Typography variant="subtitle2">使用言語</Typography>
            {languages &&
              languages.map((language) => (
                <Typography key={language} fontWeight="bold">
                  {language}
                </Typography>
              ))}
          </Box>
          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              variant="contained"
              sx={{
                mx: "auto",
                mt: "auto",
                width: "50%",
                height: "50px",
                borderRadius: "20px",
              }}
              onClick={onAgree}
            >
              上記の内容で募集する
            </Button>
            <BackButton
              style={{ width: "50%", margin: "0 auto" }}
              onClick={onCancel}
            >
              戻る
            </BackButton>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
