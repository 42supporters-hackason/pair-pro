import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Card } from "../../components/Card";
import { PostCard, Props as PostCardProps } from "../../components/PostCard";

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

export const HomePage = () => {
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
              />
            )
          )}
        </Box>
      </Box>
      <Box sx={{ width: "40%", mx: "60px", height: "100%" }}>
        <Box>
          <Typography fontWeight="bold" sx={{ textAlign: "center", mb: 3 }}>
            マッチングする
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              mb: 2,
              gap: 1,
            }}
          >
            <Button size="large" variant="outlined">
              自分の好きなテーマで募集する
            </Button>
            <Button size="large" variant="outlined">
              募集一覧から好きな投稿を見つける
            </Button>
          </Box>
        </Box>
        <Box>
          <Typography sx={{ textAlign: "center", mb: 2 }} variant="h6">
            Profile
          </Typography>
          <Card></Card>
        </Box>
      </Box>
    </Box>
  );
};
