import React, { useState, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { BackButton } from "../../components/BackButton";
import { PostCard } from "../../components/PostCard";
import { ProfileCard } from "../../components/ProfileCard";
import { useProfile } from "../../context/auth";
import { useBoolean } from "../../hooks/useBoolean";
import { useClientRoute } from "../../hooks/useClientRoute";
import { useRecruitHooks } from "../hooks/useRecruitHooks";
import {
  RecruitFilterSchema,
  recruitFilterSchema,
} from "../validation/recruit_filter_validation";

interface FilterProps {
  /**
   * ユーザ名の絞り込み
   */
  driverNameFilter?: string;
  /**
   * 使用言語の絞り込み
   */
  requiredSkillsFilter?: number;
}

/**
 * 募集一覧ページ
 */
export const RecruitPage = () => {
  /**
   * misc.
   */
  const [openPostModal, setOpenPostModal] = useBoolean(false);
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const { goToHome } = useClientRoute();
  const { profile } = useProfile();
  const [filterState, setFilterState] = useState<FilterProps>();

  /**
   * page hooks
   */
  const {
    posts,
    languages,
    matchPost,
    skillsData,
    refetchPosts,
    communityMember,
  } = useRecruitHooks({
    driverNameFilter: filterState?.driverNameFilter,
    requiredSkillsFilter: filterState?.requiredSkillsFilter,
  });

  /**
   * form validation
   */
  const { control, getValues } = useForm<RecruitFilterSchema>({
    resolver: zodResolver(recruitFilterSchema),
  });

  /**
   * event-handler
   */
  const handleFilter = useCallback(() => {
    const formValue = getValues();
    setFilterState({
      driverNameFilter: formValue.name,
      requiredSkillsFilter: skillsData?.skills.find(
        ({ name }) => name === formValue.language
      )?.id as number,
    });
    setTimeout(() => refetchPosts(), 10);
  }, [setFilterState, getValues, skillsData, refetchPosts]);

  const handleMatch = useCallback(() => {
    if (selectedId !== undefined && profile?.id !== undefined) {
      matchPost({
        selectedId,
        profileId: profile?.id,
        closeModal: setOpenPostModal.off,
      });
    }
  }, [selectedId, profile, matchPost, setOpenPostModal]);

  return (
    <Box sx={{ mx: "100px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ textAlign: "center", mt: "30px" }}
        >
          気になるマッチング相手を探す
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "25%" }}>
            <Controller
              name="language"
              control={control}
              render={({ field: { onChange } }) => (
                <Autocomplete
                  options={languages ?? []}
                  renderInput={(params) => (
                    <TextField {...params} label="使用言語" />
                  )}
                  onChange={(_, data) => {
                    onChange(data);
                    return data;
                  }}
                />
              )}
            />
          </Box>
          <Box sx={{ width: "20%" }}>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange } }) => (
                <Autocomplete
                  options={communityMember ?? []}
                  renderInput={(params) => (
                    <TextField {...params} label="ユーザ名" />
                  )}
                  onChange={(_, data) => {
                    onChange(data);
                    return data;
                  }}
                />
              )}
            />
          </Box>
          <Button
            sx={{
              mb: "35px",
              mt: "15px",
              width: "15%",
              borderRadius: "10px",
            }}
            variant="contained"
            onClick={handleFilter}
          >
            絞り込む
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {posts &&
            posts.map(({ id, title, content, language, name, githubLogin }) => (
              <PostCard
                key={id}
                title={title}
                content={content}
                languages={language}
                githubLogin={githubLogin}
                name={name}
                onClick={() => {
                  setOpenPostModal.on();
                  setSelectedId(id);
                }}
              />
            ))}
        </Box>
        <BackButton
          style={{ margin: "0 auto", width: "350px" }}
          onClick={() => goToHome()}
        >
          戻る
        </BackButton>
      </Box>
      <Modal
        open={openPostModal}
        onClose={setOpenPostModal.off}
        sx={{ overflow: "scroll" }}
      >
        <Box sx={{ my: "50px", mx: "100px" }}>
          {posts && (
            <ProfileCard
              githubLogin={
                posts.find(({ id }) => id === selectedId)?.githubLogin
              }
              title={posts.find(({ id }) => id === selectedId)?.title}
              content={posts.find(({ id }) => id === selectedId)?.content}
              languages={posts.find(({ id }) => id === selectedId)?.language}
              name={posts.find(({ id }) => id === selectedId)?.name}
              bio={posts.find(({ id }) => id === selectedId)?.bio}
              hasButton={true}
              agreeTitle="マッチングする"
              onClose={setOpenPostModal.off}
              onAgree={handleMatch}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};
