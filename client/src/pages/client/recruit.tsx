import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { Card } from "../../components/Card";
import { PostCard, Props as PostCardProps } from "../../components/PostCard";
import { useBoolean } from "../../hooks/useBoolean";
import { useClientRoute } from "../../hooks/useClientRoute";

const demoPostView: PostCardProps[] = [
  {
    initialName: "AA",
    title: "Javaを使ったオブジェクト指向プログラミングを学びたい",
    content:
      "普段はフロントエンドを業務で行っているので、バックエンドについての理解も深めたい",
    language: "JAVA",
    date: "2000-11-11",
    name: "hoge joge",
  },
  {
    initialName: "AA",
    title: "Javaを使ったオブジェクト指向プログラミングを学びたい",
    content:
      "普段はフロントエンドを業務で行っているので、バックエンドについての理解も深めたい",
    language: "JAVA",
    date: "2000-11-11",
    name: "hoge joge",
  },
  {
    initialName: "AA",
    title: "Javaを使ったオブジェクト指向プログラミングを学びたい",
    content:
      "普段はフロントエンドを業務で行っているので、バックエンドについての理解も深めたい",
    language: "JAVA",
    date: "2000-11-11",
    name: "hoge joge",
  },
];

/**
 * 募集一覧ページ
 */
export const RecruitPage = () => {
  const [openPostModal, setOpenPostModal] = useBoolean(false);
  const { goToHome } = useClientRoute();
  return (
    <Box sx={{ mx: "100px" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ textAlign: "center", mt: "30px" }}
        >
          気になるマッチング相手を探す
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
          {demoPostView.map(
            ({ initialName, title, content, language, date, name }, index) => (
              <PostCard
                key={index}
                initialName={initialName}
                title={title}
                content={content}
                language={language}
                date={date}
                name={name}
                onClick={setOpenPostModal.on}
              />
            )
          )}
        </Box>
        <Button
          sx={{
            mx: "auto",
            width: "450px",
            my: 3,
            height: "50px",
            borderRadius: "10px",
          }}
          variant="contained"
          color="secondary"
          onClick={() => goToHome()}
        >
          戻る
        </Button>
      </Box>
      <Modal open={openPostModal} onClose={setOpenPostModal.off}>
        <Box sx={{ m: "100px" }}>
          <Card></Card>
        </Box>
      </Modal>
    </Box>
  );
};
