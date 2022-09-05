import React, { useCallback, useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { BackButton } from "../../../components/BackButton";
import {
  useEditCommunityNameMutation,
  useFetchCurrentCommunityQuery,
  useFetchMeQuery,
} from "../../../gen/graphql-client";
import { useClientRoute } from "../../../hooks/useClientRoute";
import { LoadingPage } from "../../public/loading";
import {
  editCommunityNameSchema,
  EditCommunityNameSchema,
} from "../../validation/edit_community_name_validation";

/**
 * コミュニティ名を更新するPage
 */
export const EditCommunityPage = () => {
  /**
   * misc.
   */
  const { goToHome } = useClientRoute();
  const { data: currentCommunity, loading } = useFetchCurrentCommunityQuery();
  const { data: meData } = useFetchMeQuery();
  const [editCommunityName] = useEditCommunityNameMutation();

  const isEditable = useMemo(() => {
    if (currentCommunity?.myCurrentCommunity?.creator && meData?.myProfile) {
      return (
        currentCommunity?.myCurrentCommunity?.creator.id ===
        meData?.myProfile.id
      );
    }
    return false;
  }, [currentCommunity, meData]);

  /**
   * validation
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<EditCommunityNameSchema>({
    resolver: zodResolver(editCommunityNameSchema),
    shouldUnregister: false,
  });

  const handleEditCommunityName = useCallback(() => {
    const submitValue = getValues("communityName");
    editCommunityName({
      variables: {
        name: submitValue,
      },
      onCompleted: () => {
        goToHome();
      },
    });
  }, [getValues, editCommunityName, goToHome]);

  useEffect(() => {
    setValue("communityName", currentCommunity?.myCurrentCommunity?.name ?? "");
  }, [setValue, currentCommunity]);

  /**
   * RHFのdefault valueに値をsetするためにfetchが完了するまで待つ
   */
  if (loading) {
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
      <Box sx={{ display: "flex", flexDirection: "column", gap: "25px" }}>
        <Typography variant="h6" fontWeight="bold" sx={{ textAlign: "center" }}>
          コミュニティ名の更新
        </Typography>
        <Typography color="error.main">
          ＊コミュニティ名を変更できるのはコミュニティ作成者のみです
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "60px",
          width: "100%",
          mt: "60px",
        }}
        component="form"
        onSubmit={handleSubmit(handleEditCommunityName)}
      >
        <Box>
          <TextField
            variant="outlined"
            label="コミュニティ名"
            disabled={!isEditable}
            sx={{ width: "500px" }}
            {...register("communityName")}
          />
          {errors.communityName && (
            <Typography sx={{ mt: "5px", color: "error.main" }}>
              {errors.communityName.message}
            </Typography>
          )}
        </Box>
        {isEditable && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Button
              sx={{
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
            <BackButton style={{ width: "450px" }} onClick={() => goToHome()}>
              戻る
            </BackButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};
