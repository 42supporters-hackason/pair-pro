import React, { useCallback, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  Box,
  Button,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { BackButton } from "../../../components/BackButton";
import { useClientRoute } from "../../../hooks/useClientRoute";
import { unreachable } from "../../../utils";
import { useEditPostHooks } from "../../hooks/useEditPostHooks";
import { LoadingPage } from "../../public/loading";
import {
  editPostSchema,
  EditPostSchema,
} from "../../validation/edit_post_validation";

/**
 * POSTを更新するPage
 */
export const EditPostPage = () => {
  /**
   * misc.
   */
  const { goToHome } = useClientRoute();
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("post_id");

  /**
   * page hooks
   */
  const { languagesData, updatePost, postData, postLoading } = useEditPostHooks(
    postId ?? unreachable()
  );

  const languages = languagesData?.skills.map(({ name }) => name);

  /**
   * validation
   */
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditPostSchema>({
    resolver: zodResolver(editPostSchema),
    shouldUnregister: false,
  });
  const editFormData = watch();

  /**
   * event-handler
   */
  const handleEditPost = useCallback(async () => {
    updatePost(editFormData);
  }, [updatePost, editFormData]);

  useEffect(() => {
    setValue("title", postData?.post?.title ?? "");
    setValue("content", postData?.post?.description ?? "");
    setValue(
      "language",
      postData?.post?.requiredSkills.map(({ name }) => name) ?? []
    );
  }, [setValue, postData]);

  /**
   * RHFのdefault valueに値をsetするためにfetchが完了するまで待つ
   */
  if (postLoading || editFormData.language === undefined) {
    return <LoadingPage />;
  }

  return (
    <Box
      sx={{
        m: "30px 45px 30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ textAlign: "center" }}>
        入力情報の更新
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "35px",
          width: "100%",
          mt: 3,
        }}
        component="form"
        onSubmit={handleSubmit(handleEditPost)}
      >
        <Box>
          <TextField
            variant="standard"
            label="タイトル"
            sx={{ width: "500px" }}
            {...register("title")}
          />
          {errors.title && (
            <Typography sx={{ mt: "5px", color: "error.main" }}>
              {errors.title.message}
            </Typography>
          )}
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: "5px", ml: "5px" }}>
            内容
          </Typography>
          <TextareaAutosize
            minRows={3}
            style={{
              width: "470px",
              borderRadius: "15px",
              resize: "none",
              padding: "15px",
            }}
            {...register("content")}
          />
          {errors.content && (
            <Typography sx={{ mt: "5px", color: "error.main" }}>
              {errors.content.message}
            </Typography>
          )}
        </Box>
        <Box sx={{ width: "500px" }}>
          <Controller
            control={control}
            name="language"
            render={({ field: { onChange } }) => (
              <Autocomplete
                options={languages ?? []}
                multiple
                value={editFormData.language}
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
          {errors.language && (
            <Typography sx={{ mt: "5px", color: "error.main" }}>
              使用言語を入力してください
            </Typography>
          )}
        </Box>
        <Button
          sx={{
            mb: "35px",
            mt: "15px",
            width: "450px",
            height: "50px",
            borderRadius: "20px",
          }}
          variant="contained"
          type="submit"
        >
          更新する
        </Button>
      </Box>
      <BackButton style={{ width: "450px" }} onClick={() => goToHome()}>
        戻る
      </BackButton>
    </Box>
  );
};
