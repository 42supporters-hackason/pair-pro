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
import { PostCard } from "../../components/PostCard";
import { ProfileCard } from "../../components/ProfileCard";
import { useFetchSkillsQuery } from "../../gen/graphql-client";
import { useBoolean } from "../../hooks/useBoolean";
import { useClientRoute } from "../../hooks/useClientRoute";
import {
  RecruitFilterSchema,
  recruitFilterSchema,
} from "../validation/recruit_filter_validation";

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
 * 募集一覧ページ
 */
export const RecruitPage = () => {
  /**
   * misc.
   */
  const [openPostModal, setOpenPostModal] = useBoolean(false);
  const [selectedId, setSelectedId] = useState<number | undefined>();
  const { goToHome } = useClientRoute();
  const { data } = useFetchSkillsQuery();

  const languages = data?.skills.map(({ name }) => name);

  /**
   * form validation
   */
  const { register, control, handleSubmit } = useForm<RecruitFilterSchema>({
    resolver: zodResolver(recruitFilterSchema),
  });

  /**
   * event-handler
   */
  const handleFilter = useCallback(() => {
    console.log();
  }, []);

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
          component="form"
          onSubmit={handleSubmit(handleFilter)}
        >
          <Box sx={{ width: "25%" }}>
            <Controller
              name="languages"
              control={control}
              render={({ field: { onChange } }) => (
                <Autocomplete
                  options={languages ?? []}
                  multiple
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
          <TextField
            variant="outlined"
            label="ユーザ名"
            sx={{ width: "25%" }}
            {...register("name")}
          />
          <TextField
            variant="outlined"
            label="キーワード"
            sx={{ width: "25%" }}
            {...register("keyword")}
          />
          <Button
            sx={{
              mb: "35px",
              mt: "15px",
              width: "15%",
              borderRadius: "10px",
            }}
            variant="contained"
            type="submit"
          >
            絞り込む
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {demoPostView.map(({ id, title, content, language, name }) => (
            <PostCard
              key={id}
              title={title}
              content={content}
              languages={language}
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
            githubLogin={demoPostView.find(({ id }) => id === selectedId)?.name}
            title={demoPostView.find(({ id }) => id === selectedId)?.title}
            content={demoPostView.find(({ id }) => id === selectedId)?.content}
            languages={
              demoPostView.find(({ id }) => id === selectedId)?.language
            }
            hasButton={true}
            agreeTitle="マッチングする"
            onClose={setOpenPostModal.off}
          />
        </Box>
      </Modal>
    </Box>
  );
};
