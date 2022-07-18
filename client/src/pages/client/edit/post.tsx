import React, { useCallback, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useFetchSpecificPostQuery } from "../../../gen/graphql-client";
import { useClientRoute } from "../../../hooks/useClientRoute";
import { unreachable } from "../../../utils";
import { useEditPostHooks } from "../../hooks/useEditPostHooks";
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

  const { data: postData, loading: postLoading } = useFetchSpecificPostQuery({
    variables: {
      id: postId ?? unreachable(),
    },
  });

  /**
   * page hooks
   */
  const { languagesData } = useEditPostHooks();

  const languages = languagesData?.skills.map(({ name }) => name);

  /**
   * validation
   */
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<EditPostSchema>({
    resolver: zodResolver(editPostSchema),
    shouldUnregister: false,
  });

  const editFormData = getValues();

  /**
   * event-handler
   */
  const handleEditPost = useCallback(() => {
    console.log();
  }, []);

  useEffect(() => {
    setValue("title", postData?.post?.title ?? "");
    setValue("content", postData?.post?.description ?? "");
  }, [setValue, postData]);

  if (postLoading) {
    return <CircularProgress />;
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
        情報を入力してマッチング相手を募集しましょう
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
            borderRadius: "10px",
          }}
          variant="contained"
          type="submit"
        >
          上記の内容で募集をする
        </Button>
      </Box>
      <Button
        sx={{
          mb: "35px",
          mt: "auto",
          width: "450px",
          height: "50px",
          borderRadius: "10px",
        }}
        variant="contained"
        type="button"
        color="secondary"
        onClick={() => goToHome()}
      >
        戻る
      </Button>
    </Box>
  );
};
