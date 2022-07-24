import React, { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useClientRoute } from "../../../hooks/useClientRoute";
import { usePublicRoute } from "../../../hooks/usePublicRoute";
import {
  CreateCommunitySchema,
  createCommunitySchema,
} from "../../validation/create_community_validation";

export const CreateCommunityPage = () => {
  /**
   * misc.
   */
  const { goToCommunity } = usePublicRoute();
  const { goToHome } = useClientRoute();

  /**
   * form validation
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCommunitySchema>({
    resolver: zodResolver(createCommunitySchema),
  });

  /**
   * event-handler
   */
  const handleCreateCommunity = useCallback(() => {
    goToHome({ replace: true });
  }, [goToHome]);

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "primary.light",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      component="form"
      onSubmit={handleSubmit(handleCreateCommunity)}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          新しいcomunityの名前を入力してください
        </Typography>
        <TextField
          label="community名"
          sx={{ mt: "45px", width: "450px" }}
          {...register("communityName")}
        />
        <Typography color="error">{errors.communityName?.message}</Typography>
        <Button
          variant="contained"
          sx={{
            mt: "45px",
            width: "350px",
            height: "50px",
            borderRadius: "20px",
            fontWeight: "bold",
          }}
          type="submit"
        >
          作成する
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            mt: "20px",
            width: "350px",
            height: "50px",
            borderRadius: "20px",
            fontWeight: "bold",
            color: "black",
          }}
          onClick={() => goToCommunity()}
        >
          戻る
        </Button>
      </Box>
    </Box>
  );
};
