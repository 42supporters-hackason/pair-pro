import React from "react";
import { Box, Button, Typography } from "@mui/material";
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
            gap: "35px",
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
              gap: 2,
              alignItems: "center",
            }}
          >
            <Typography>タイトル</Typography>
            <Typography variant="h5">{title}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: "column",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Typography>内容</Typography>
            <Typography
              variant="h5"
              sx={{ overflowWrap: "break-word", wordBreak: "break-all" }}
            >
              {content}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography>使用言語</Typography>
            {languages &&
              languages.map((language) => (
                <Typography key={language} variant="h5">
                  {language}
                </Typography>
              ))}
          </Box>
          <Button
            variant="contained"
            sx={{
              mx: "auto",
              mt: "auto",
              width: "80%",
              height: "50px",
              borderRadius: "10px",
            }}
            onClick={onAgree}
          >
            上記の内容で募集する
          </Button>
          <Button
            sx={{
              mx: "auto",
              width: "80%",
              height: "50px",
              borderRadius: "10px",
            }}
            variant="contained"
            type="button"
            color="secondary"
            onClick={onCancel}
          >
            戻る
          </Button>
        </Box>
      </Card>
    </Box>
  );
};
