import React, { useState, useCallback, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Box,
  Button,
  Modal,
  Pagination,
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

const TAKE_PAGINATION = 10;

interface FilterProps {
  /**
   * ユーザ名の絞り込み
   */
  driverNameFilter?: string;
  /**
   * 使用言語の絞り込み
   */
  requiredSkillsFilter?: number;
  /**
   * キーワード検索
   */
  keywordFilter?: string;
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
  const [pagination, setPagination] = useState<number>(0);
  const { goToHome } = useClientRoute();
  const { profile } = useProfile();
  const [filterState, setFilterState] = useState<FilterProps>();
  const ref = useRef<HTMLDivElement>(null);

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
    paginationCount,
  } = useRecruitHooks({
    driverNameFilter: filterState?.driverNameFilter,
    requiredSkillsFilter: filterState?.requiredSkillsFilter,
    keywordFilter: filterState?.keywordFilter,
    take: TAKE_PAGINATION,
    skip: pagination,
  });

  /**
   * form validation
   */
  const { register, control, getValues } = useForm<RecruitFilterSchema>({
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
      keywordFilter: formValue.keyword,
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

  const handleChangePagination = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      setPagination(value);
      ref.current?.scrollIntoView();
    },
    [setPagination]
  );

  return (
    <Box sx={{ mx: "100px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }} ref={ref}>
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
          <Box sx={{ width: "20%" }}>
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
          <Box sx={{ width: "20%" }}>
            <TextField
              sx={{ width: "100%" }}
              {...register("keyword")}
              label="キーワード"
            />
          </Box>
          <Button
            sx={{
              borderRadius: "999px",
            }}
            variant="contained"
            onClick={handleFilter}
          >
            <SearchIcon />
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
        <Box sx={{ mx: "auto" }}>
          <Pagination
            color="primary"
            count={paginationCount}
            size="large"
            page={pagination}
            onChange={handleChangePagination}
          />
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
