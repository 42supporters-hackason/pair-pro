import React, { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { BackButton } from "../../../components/BackButton";
import {
  useFetchMeQuery,
  useUpdateProfileMutation,
} from "../../../gen/graphql-client";
import { useClientRoute } from "../../../hooks/useClientRoute";
import {
  editProfileSchema,
  EditProfileSchema,
} from "../../validation/edit_profile_validation";

export const EditProfilePage = () => {
  /**
   * misc.
   */
  const [updateProfile] = useUpdateProfileMutation();
  const { goToHome } = useClientRoute();
  const { data: meData } = useFetchMeQuery();

  /**
   * form validation
   */
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: meData?.myProfile.name ?? "",
      bio: meData?.myProfile.bio ?? "",
    },
  });

  const handleEditProfile: SubmitHandler<EditProfileSchema> = useCallback(
    async ({ name, bio }) => {
      await updateProfile({
        variables: { name, bio },
        onCompleted: () => {
          goToHome();
        },
      });
    },
    [updateProfile, goToHome]
  );

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: "30px",
        gap: "40px",
        width: "100%",
      }}
      onSubmit={handleSubmit(handleEditProfile)}
    >
      <Typography variant="h6" fontWeight="bold">
        プロフィール編集
      </Typography>
      <Box>
        <TextField sx={{ width: "500px" }} label="名前" {...register("name")} />
        {errors.name && (
          <Typography sx={{ mt: "5px", color: "error.main" }}>
            {errors.name.message}
          </Typography>
        )}
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: "5px", ml: "5px" }}>
          自己紹介
        </Typography>
        <TextareaAutosize
          minRows={7}
          style={{
            width: "470px",
            borderRadius: "15px",
            resize: "none",
            padding: "15px",
          }}
          {...register("bio")}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
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
        <BackButton style={{ width: "450px" }} onClick={() => goToHome()}>
          戻る
        </BackButton>
      </Box>
    </Box>
  );
};
