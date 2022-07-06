import React, { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { Card } from "../../components/Card";
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
    date: new Date("2000-11-11"),
    name: "taisei-13046",
  },
  {
    id: 2,
    title: "Javaを使ったオブジェクト指向プログラミングを学びたい",
    content:
      "普段はフロントエンドを業務で行っているので、バックエンドについての理解も深めたい",
    language: "JAVA",
    date: new Date("2000-11-11"),
    name: "taisei-13046",
  },
  {
    id: 3,
    title: "Javaを使ったオブジェクト指向プログラミングを学びたい",
    content:
      "普段はフロントエンドを業務で行っているので、バックエンドについての理解も深めたい",
    language: "JAVA",
    date: new Date("2000-11-11"),
    name: "taisei-13046",
  },
];

/**
 * home画面
 */
export const HomePage = () => {
  /**
   * misc.
   */
  const [openPostModal, setOpenPostModal] = useBoolean(false);
  const [selectedId, setSelectedId] = useState<number | undefined>();
  const [showList, setShowList] = useState<"myPostList" | "matchedList">(
    "myPostList"
  );
  const { goToApply, goToRecruit, goToChat } = useClientRoute();

  return (
    <Box sx={{ m: "30px 45px 30px", display: "flex" }}>
      <Box sx={{ width: "60%" }}>
        <Box
          sx={{
            display: "flex",
            mb: 3,
            justifyContent: "center",
            gap: "50px",
          }}
        >
          {showList === "matchedList" ? (
            <>
              <Typography
                fontWeight="bold"
                sx={{ textDecoration: "underline" }}
              >
                マッチング済みの予定
              </Typography>
              <Typography
                fontWeight="bold"
                color="secondary.main"
                onClick={() => setShowList("myPostList")}
                sx={{ cursor: "pointer" }}
              >
                募集中の投稿
              </Typography>
            </>
          ) : (
            <>
              <Typography
                fontWeight="bold"
                color="secondary.main"
                onClick={() => setShowList("matchedList")}
                sx={{ cursor: "pointer" }}
              >
                マッチング済みの予定
              </Typography>
              <Typography
                fontWeight="bold"
                sx={{ textDecoration: "underline" }}
              >
                募集中の投稿
              </Typography>
            </>
          )}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {showList === "matchedList"
            ? demoPostView.map(
                ({ id, title, content, language, date, name }) => (
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
                )
              )
            : demoPostView.map(
                ({ id, title, content, language, date, name }) => (
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
            agreeTitle="チャットルームに移動する"
            onAgree={() => goToChat(selectedId)}
            onClose={setOpenPostModal.off}
          />
        </Box>
      </Modal>
    </Box>
  );
};
