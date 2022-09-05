import React, { useCallback, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Switch,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { BackButton } from "../../../components/BackButton";
import {
  useFetchMeQuery,
  useUpdateEmailSettingMutation,
  useUpdateProfileMutation,
} from "../../../gen/graphql-client";
import { useBoolean } from "../../../hooks/useBoolean";
import { useClientRoute } from "../../../hooks/useClientRoute";
import { LoadingPage } from "../../public/loading";
import {
  editProfileSchema,
  EditProfileSchema,
} from "../../validation/edit_profile_validation";

export const EditProfilePage = () => {
  /**
   * misc.
   */
  const [updateProfile] = useUpdateProfileMutation();
  const [updateEmailSetting] = useUpdateEmailSettingMutation();
  const { goToHome } = useClientRoute();
  const { data: meData, loading } = useFetchMeQuery();
  const [isEmailToggle, setIsEmailToggle] = useBoolean(false);

  /**
   * form validation
   */
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
  });

  const handleEditProfile: SubmitHandler<EditProfileSchema> = useCallback(
    async ({ name, bio }) => {
      await updateEmailSetting({
        variables: { sendEmailOnMatching: isEmailToggle },
      });
      await updateProfile({
        variables: { name, bio },
        onCompleted: () => {
          goToHome();
        },
      });
    },
    [updateProfile, goToHome, updateEmailSetting, isEmailToggle]
  );

  useEffect(() => {
    setValue("name", meData?.myProfile.name ?? "");
    setValue("bio", meData?.myProfile.bio ?? "");
    setValue("email", meData?.myProfile.user.email ?? "");
    setIsEmailToggle.set(
      meData?.myProfile.user.setting?.sendEmailOnMatching ?? false
    );
    // eslint-disable-next-line
  }, [setValue, meData]);

  /**
   * RHFのdefault valueに値をsetするためにfetchが完了するまで待つ
   */
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: "30px",
        gap: "25px",
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
      <Box>
        <TextField
          sx={{ width: "500px" }}
          label="通知用メールアドレス"
          {...register("email")}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography fontWeight="bold">メール通知を受け取る</Typography>
        <Switch checked={isEmailToggle} onChange={setIsEmailToggle.toggle} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
        <Button
          sx={{
            mb: "15px",
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
