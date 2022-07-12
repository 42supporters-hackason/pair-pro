import React, { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { AgreeModal } from "../../components/AgreeModal";
import { GithubProfile } from "../../components/GithubProfile";
import { HomeTitleToggle } from "../../components/HomeTitleToggle";
import { MyPostCard } from "../../components/MyPostCard";
import { PostCard } from "../../components/PostCard";
import { ProfileCard } from "../../components/ProfileCard";
import { useProfile } from "../../context/auth";
import { useBoolean } from "../../hooks/useBoolean";
import { useClientRoute } from "../../hooks/useClientRoute";
import { noop } from "../../utils";
import { useHomeHooks } from "../hooks/useHomeHooks";

const demoPostView = [
  {
    id: 1,
    title: "Javaを使ったオブジェクト指向プログラミングを学びたい",
    content:
      "普段はフロントエンドを業務で行っているので、バックエンドについての理解も深めたい",
    language: ["JAVA", "C言語"],
    name: "taisei-13046",
  },
  {
    id: 2,
    title: "Javaを使ったオブジェクト指向プログラミングを学びたい",
    content:
      "普段はフロントエンドを業務で行っているので、バックエンドについての理解も深めたい",
    language: ["JAVA", "C言語"],
    name: "taisei-13046",
  },
  {
    id: 3,
    title: "Javaを使ったオブジェクト指向プログラミングを学びたい",
    content:
      "普段はフロントエンドを業務で行っているので、バックエンドについての理解も深めたい",
    language: ["JAVA", "C言語"],
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
  const [openDeleteModal, setOpenDeleteModal] = useBoolean(false);
  const [selectedId, setSelectedId] = useState<number | undefined>();
  const [showList, setShowList] = useState<"myPostList" | "matchedList">(
    "matchedList"
  );
  const { goToApply, goToRecruit, goToChat } = useClientRoute();
  const { profile } = useProfile();

  /**
   * page hooks
   */
  const { myPosts, matchedPosts } = useHomeHooks();

  return (
    <Box sx={{ m: "30px 45px 30px", display: "flex" }}>
      <Box sx={{ width: "60%" }}>
        <HomeTitleToggle showList={showList} setShowList={setShowList} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {showList === "matchedList"
            ? matchedPosts &&
              matchedPosts.map(({ id, title, content, languages, name }) => (
                <PostCard
                  key={id}
                  title={title}
                  content={content}
                  languages={languages}
                  name={name}
                  onClick={() => {
                    setOpenPostModal.on();
                    setSelectedId(id);
                  }}
                />
              ))
            : myPosts &&
              myPosts.map(({ id, title, content, languages }) => (
                <MyPostCard
                  key={id}
                  title={title}
                  content={content}
                  languages={languages}
                  onEdit={noop}
                  onDelete={setOpenDeleteModal.on}
                />
              ))}
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
        <GithubProfile
          githubLogin={profile.githubLogin}
          name={profile.name}
          bio={profile.bio}
        />
      </Box>
      <Modal
        open={openPostModal}
        onClose={setOpenPostModal.off}
        sx={{ overflow: "scroll" }}
      >
        <Box sx={{ my: "50px", mx: "100px" }}>
          <ProfileCard
            githubLogin={
              matchedPosts &&
              matchedPosts.find(({ id }) => id === selectedId)?.githubLogin
            }
            title={
              matchedPosts &&
              matchedPosts.find(({ id }) => id === selectedId)?.title
            }
            content={
              matchedPosts &&
              matchedPosts.find(({ id }) => id === selectedId)?.content
            }
            languages={
              matchedPosts &&
              matchedPosts.find(({ id }) => id === selectedId)?.languages
            }
            name={
              matchedPosts &&
              matchedPosts.find(({ id }) => id === selectedId)?.name
            }
            hasButton={true}
            agreeTitle="チャットルームに移動する"
            onAgree={() => goToChat(selectedId)}
            onClose={setOpenPostModal.off}
          />
        </Box>
      </Modal>
      <Modal
        open={openDeleteModal}
        onClose={setOpenDeleteModal.off}
        sx={{ top: "40%", mx: "auto", width: "600px" }}
      >
        <Box>
          <AgreeModal
            content="本当にこの募集を削除してよろしいですか？"
            onAgree={noop}
            onCancel={setOpenDeleteModal.off}
          />
        </Box>
      </Modal>
    </Box>
  );
};
