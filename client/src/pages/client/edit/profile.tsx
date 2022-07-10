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
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../../context/auth";
import { useUpdateProfileMutation } from "../../../gen/graphql-client";
import { useClientRoute } from "../../../hooks/useClientRoute";
import { unreachable } from "../../../utils";
import { profileStorage } from "../../../utils/local-storage/profile";
import {
  editProfileSchema,
  EditProfileSchema,
} from "../validation/edit_profile_validation";

export const EditProfilePage = () => {
  /**
   * misc.
   */
  const navigate = useNavigate();
  const [updateProfile] = useUpdateProfileMutation();
  const { profile, setProfile } = useProfile();
  const { goToHome } = useClientRoute();

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
      name: profile.name,
      bio: profile.bio,
    },
  });

  const handleEditProfile: SubmitHandler<EditProfileSchema> = useCallback(
    async ({ name, bio }) => {
      await updateProfile({
        variables: { name, bio },
        onCompleted: (data) => {
          profileStorage.save({
            id: profile.id ?? unreachable(),
            githubLogin: profile.githubLogin ?? unreachable(),
            name: data.updateMe?.name
              ? data.updateMe.name
              : profile.name
              ? profile.name
              : unreachable(),
            bio: data.updateMe?.bio ?? "",
            matchingPoint: profile.matchingPoint ?? unreachable(),
          });
          setProfile(profileStorage.load() ?? {});
          goToHome();
        },
      });
    },
    [updateProfile, profile, setProfile, goToHome]
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
        <Box>
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
          {errors.bio && (
            <Typography sx={{ mt: "5px", color: "error.main" }}>
              {errors.bio.message}
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
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
          更新する
        </Button>
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
          onClick={() => navigate(-1)}
        >
          戻る
        </Button>
      </Box>
    </Box>
  );
};
