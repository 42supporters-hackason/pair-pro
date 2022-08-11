import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { AgreeModal } from "../../components/AgreeModal";
import { GithubProfile } from "../../components/GithubProfile";
import { HomeTitleToggle } from "../../components/HomeTitleToggle";
import { MyPostCard } from "../../components/MyPostCard";
import { PostCard } from "../../components/PostCard";
import { ProfileCard } from "../../components/ProfileCard";
import {
  useFetchCurrentCommunityQuery,
  useFetchMeQuery,
} from "../../gen/graphql-client";
import { useBoolean } from "../../hooks/useBoolean";
import { useClientRoute } from "../../hooks/useClientRoute";
import { useHomeHooks } from "../hooks/useHomeHooks";

/**
 * home画面
 */
export const HomePage = () => {
  /**
   * misc.
   */
  const [openPostModal, setOpenPostModal] = useBoolean(false);
  const [openDeleteModal, setOpenDeleteModal] = useBoolean(false);
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [showList, setShowList] = useState<"myPostList" | "matchedList">(
    "matchedList"
  );
  const { goToApply, goToRecruit, goToChat, goToEditPost } = useClientRoute();
  const { refetch: refetchCurrentCommunity } = useFetchCurrentCommunityQuery();
  const { refetch: refetchMe } = useFetchMeQuery();

  /**
   * page hooks
   */
  const { profile, myPosts, matchedPosts, deletePost } = useHomeHooks();

  /**
   * event-handler
   */
  const handleDeletePost = useCallback(async () => {
    if (selectedId) {
      deletePost({
        selectedId,
        closeModal: setOpenDeleteModal.off,
      });
    }
  }, [deletePost, selectedId, setOpenDeleteModal]);

  useEffect(() => {
    refetchCurrentCommunity();
    refetchMe();
  }, [refetchCurrentCommunity, refetchMe]);

  return (
    <Box sx={{ m: "30px 45px 30px", display: "flex" }}>
      <Box sx={{ width: "60%" }}>
        <HomeTitleToggle showList={showList} setShowList={setShowList} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {showList === "matchedList"
            ? matchedPosts &&
              matchedPosts.map(
                ({ id, title, content, languages, name, githubLogin }) => (
                  <PostCard
                    key={id}
                    title={title}
                    content={content}
                    languages={languages}
                    name={name}
                    githubLogin={githubLogin}
                    onClick={() => {
                      setOpenPostModal.on();
                      setSelectedId(id);
                    }}
                  />
                )
              )
            : myPosts &&
              myPosts.map(({ id, title, content, languages }) => (
                <MyPostCard
                  key={id}
                  title={title}
                  content={content}
                  languages={languages}
                  onEdit={() => goToEditPost(id)}
                  onDelete={() => {
                    setSelectedId(id);
                    setOpenDeleteModal.on();
                  }}
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
            <Button
              sx={{ borderRadius: "20px" }}
              size="large"
              variant="outlined"
              onClick={() => goToApply()}
            >
              自分の好きなテーマで募集する
            </Button>
            <Button
              size="large"
              variant="outlined"
              sx={{ borderRadius: "20px" }}
              onClick={() => goToRecruit()}
            >
              募集一覧から気になるマッチング相手を探す
            </Button>
          </Box>
        </Box>
        <GithubProfile
          githubLogin={profile?.githubLogin}
          name={profile?.name}
          bio={profile?.bio}
        />
      </Box>
      <Modal
        open={openPostModal}
        onClose={setOpenPostModal.off}
        sx={{ overflow: "scroll" }}
      >
        <Box sx={{ my: "50px", mx: "100px" }}>
          {matchedPosts && (
            <ProfileCard
              githubLogin={
                matchedPosts.find(({ id }) => id === selectedId)?.githubLogin
              }
              title={matchedPosts.find(({ id }) => id === selectedId)?.title}
              content={
                matchedPosts.find(({ id }) => id === selectedId)?.content
              }
              languages={
                matchedPosts.find(({ id }) => id === selectedId)?.languages
              }
              name={matchedPosts.find(({ id }) => id === selectedId)?.name}
              bio={matchedPosts.find(({ id }) => id === selectedId)?.bio}
              hasButton={true}
              agreeTitle="チャットルームに移動する"
              onAgree={() => goToChat(selectedId)}
              onClose={setOpenPostModal.off}
            />
          )}
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
            onAgree={handleDeletePost}
            onCancel={setOpenDeleteModal.off}
          />
        </Box>
      </Modal>
    </Box>
  );
};
