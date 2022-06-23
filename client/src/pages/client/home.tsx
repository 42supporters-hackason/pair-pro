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
 * home画面
 */
export const HomePage = () => {
  const [openPostModal, setOpenPostModal] = useBoolean(false);
  const { goToApply, goToRecruit } = useClientRoute();
  return (
    <Box sx={{ m: "30px 45px 30px", display: "flex" }}>
      <Box sx={{ width: "60%" }}>
        <Typography fontWeight="bold" sx={{ textAlign: "center", mb: 3 }}>
          マッチング済みの予定
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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
      </Box>
      <Box sx={{ width: "40%", ml: "60px", height: "100%" }}>
        <Box>
          <Typography fontWeight="bold" sx={{ textAlign: "center", mb: 3 }}>
            マッチングする
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              mb: "45px",
              gap: 3,
            }}
          >
            <Button size="large" variant="outlined" onClick={() => goToApply()}>
              自分の好きなテーマで募集する
            </Button>
            <Button
              size="large"
              variant="outlined"
              onClick={() => goToRecruit()}
            >
              募集一覧から気になるマッチング相手を探す
            </Button>
          </Box>
        </Box>
        <Box>
          <Typography
            fontWeight="bold"
            sx={{ textAlign: "center", mb: 2 }}
            variant="subtitle1"
          >
            Profile
          </Typography>
          <Card>
            <Box
              component="img"
              src="https://github-readme-stats.vercel.app/api?username=taisei-13046&theme=onedark&show_icons=true)](https://github.com/anuraghazra/github-readme-stats"
              sx={{ width: "100%" }}
            />
            <Box
              component="img"
              src="https://raw.githubusercontent.com/taisei-13046/taisei-13046/main/profile-summary-card-output/default/1-repos-per-language.svg"
              sx={{ width: "100%" }}
            />
            <Box
              component="img"
              src="https://raw.githubusercontent.com/taisei-13046/taisei-13046/main/profile-summary-card-output/default/3-stats.svg"
              sx={{ width: "100%" }}
            />
          </Card>
        </Box>
      </Box>
      <Modal open={openPostModal} onClose={setOpenPostModal.off}>
        <Box sx={{ m: "100px" }}>
          <Card></Card>
        </Box>
      </Modal>
    </Box>
  );
};
