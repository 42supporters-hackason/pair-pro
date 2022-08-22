import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Checkbox, Modal, Typography } from "@mui/material";
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
  /**
   * modal state
   */
  const [openPostModal, setOpenPostModal] = useBoolean(false);
  const [openDeleteModal, setOpenDeleteModal] = useBoolean(false);
  const [openCompleteModal, setOpenCompleteModal] = useBoolean(false);
  const [openFinishedPostModal, setOpenFinishedPostModal] = useBoolean(false);

  /**
   * use state
   */
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [completedId, setCompletedId] = useState<string | undefined>();
  const [finishedPostId, setFinishedPostId] = useState<string | undefined>();
  const [completePostCheck, setCompletePostCheck] = useBoolean(false);
  const [showList, setShowList] = useState<
    "myPostList" | "matchedList" | "finishedPost"
  >("matchedList");

  /**
   * graphql hooks .etc
   */
  const { goToApply, goToRecruit, goToChat, goToEditPost } = useClientRoute();
  const { refetch: refetchCurrentCommunity } = useFetchCurrentCommunityQuery();
  const { refetch: refetchMe } = useFetchMeQuery();

  /**
   * page hooks
   */
  const {
    profile,
    myPosts,
    matchedPosts,
    deletePost,
    completePost,
    completedPosts,
    languagesData,
  } = useHomeHooks();

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
          {showList === "matchedList" &&
            matchedPosts &&
            matchedPosts.map(
              ({ id, title, content, languages, name, githubLogin }) => (
                <PostCard
                  key={id}
                  title={title}
                  content={content}
                  languages={languages}
                  name={name}
                  githubLogin={githubLogin}
                  onComplete={() => {
                    setOpenCompleteModal.on();
                    setCompletedId(id);
                  }}
                  onClick={() => {
                    setOpenPostModal.on();
                    setSelectedId(id);
                  }}
                  languagesData={languagesData ?? []}
                />
              )
            )}
          {showList === "myPostList" &&
            myPosts &&
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
          {showList === "finishedPost" &&
            completedPosts &&
            completedPosts.map(
              ({ id, title, content, languages, name, githubLogin }) => (
                <PostCard
                  key={id}
                  title={title}
                  content={content}
                  languages={languages}
                  name={name}
                  githubLogin={githubLogin}
                  onClick={() => {
                    setOpenFinishedPostModal.on();
                    setFinishedPostId(id);
                  }}
                  languagesData={languagesData ?? []}
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
        <Box sx={{ my: "100px", mx: "100px" }}>
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
              languagesData={languagesData ?? []}
            />
          )}
        </Box>
      </Modal>
      <Modal
        open={openFinishedPostModal}
        onClose={setOpenFinishedPostModal.off}
        sx={{ overflow: "scroll" }}
      >
        <Box sx={{ my: "100px", mx: "100px" }}>
          {completedPosts && (
            <ProfileCard
              githubLogin={
                completedPosts.find(({ id }) => id === finishedPostId)
                  ?.githubLogin
              }
              title={
                completedPosts.find(({ id }) => id === finishedPostId)?.title
              }
              content={
                completedPosts.find(({ id }) => id === finishedPostId)?.content
              }
              languages={
                completedPosts.find(({ id }) => id === finishedPostId)
                  ?.languages
              }
              name={
                completedPosts.find(({ id }) => id === finishedPostId)?.name
              }
              bio={completedPosts.find(({ id }) => id === finishedPostId)?.bio}
              hasButton={false}
              languagesData={languagesData ?? []}
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
            onAgree={handleDeletePost}
            onCancel={setOpenDeleteModal.off}
          >
            本当にこの募集を削除してよろしいですか？
          </AgreeModal>
        </Box>
      </Modal>
      <Modal
        open={openCompleteModal}
        onClose={setOpenCompleteModal.off}
        sx={{ top: "40%", mx: "auto", width: "600px" }}
      >
        <Box>
          <AgreeModal
            onAgree={() => {
              if (completedId !== undefined) {
                completePost(completedId);
                setOpenCompleteModal.off();
              }
            }}
            onCancel={setOpenCompleteModal.off}
            disabled={!completePostCheck}
          >
            {completePostCheck && (
              <>
                <Typography fontWeight="bold" variant="h6">
                  お疲れ様でした！！🎉🎉🎉
                </Typography>
                <br />
              </>
            )}
            <b>マッチング相手とのペアプロが終了しましたか？</b>
            <br />
            <br />
            確認チェック
            <Checkbox
              onClick={setCompletePostCheck.toggle}
              checked={completePostCheck}
            />
          </AgreeModal>
        </Box>
      </Modal>
    </Box>
  );
};
