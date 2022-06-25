import React, { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { PostCard } from "../../components/PostCard";
import { ProfileCard } from "../../components/ProfileCard";
import { useBoolean } from "../../hooks/useBoolean";
import { useClientRoute } from "../../hooks/useClientRoute";

const demoPostView = [
  {
    id: 1,
    title: "Javaを使ったオブジェクト指向プログラミングを学びたい",
    content:
      "普段はフロントエンドを業務で行っているので、バックエンドについての理解も深めたい",
    language: "JAVA",
    date: "2000-11-11",
    name: "taisei-13046",
  },
  {
    id: 2,
    title: "Javaを使ったオブジェクト指向プログラミングを学びたい",
    content:
      "普段はフロントエンドを業務で行っているので、バックエンドについての理解も深めたい",
    language: "JAVA",
    date: "2000-11-11",
    name: "taisei-13046",
  },
  {
    id: 3,
    title: "Javaを使ったオブジェクト指向プログラミングを学びたい",
    content:
      "普段はフロントエンドを業務で行っているので、バックエンドについての理解も深めたい",
    language: "JAVA",
    date: "2000-11-11",
    name: "taisei-13046",
  },
];

/**
 * 募集一覧ページ
 */
export const RecruitPage = () => {
  const [openPostModal, setOpenPostModal] = useBoolean(false);
  const [selectedId, setSelectedId] = useState<number | undefined>();
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
          {demoPostView.map(({ id, title, content, language, date, name }) => (
            <PostCard
              key={id}
              title={title}
              content={content}
              language={language}
              date={date}
              name={name}
              onClick={() => {
                setOpenPostModal.on();
                setSelectedId(id);
              }}
            />
          ))}
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
      <Modal
        open={openPostModal}
        onClose={setOpenPostModal.off}
        sx={{ overflow: "scroll" }}
      >
        <Box sx={{ my: "50px", mx: "100px" }}>
          <ProfileCard
            githubId={demoPostView.find(({ id }) => id === selectedId)?.name}
            title={demoPostView.find(({ id }) => id === selectedId)?.title}
            content={demoPostView.find(({ id }) => id === selectedId)?.content}
            date={demoPostView.find(({ id }) => id === selectedId)?.date}
            language={
              demoPostView.find(({ id }) => id === selectedId)?.language
            }
            hasButton={true}
            onClose={setOpenPostModal.off}
          />
        </Box>
      </Modal>
    </Box>
  );
};
