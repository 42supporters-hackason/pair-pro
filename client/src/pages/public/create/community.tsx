import React, { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { AgreeModal } from "../../../components/AgreeModal";
import { BackButton } from "../../../components/BackButton";
import { Card } from "../../../components/Card";
import { useBoolean } from "../../../hooks/useBoolean";
import { useCommunityRoute } from "../../../hooks/useCommunityRoute";
import { useCreateCommunityHooks } from "../../hooks/useCreateCommunityHooks";
import {
  CreateCommunitySchema,
  createCommunitySchema,
} from "../../validation/create_community_validation";

export const CreateCommunityPage = () => {
  /**
   * misc.
   */
  const { goToCommunity } = useCommunityRoute();
  const [openModal, setOpenModal] = useBoolean(false);

  /**
   * custom hooks
   */
  const { createCommunity } = useCreateCommunityHooks();

  /**
   * form validation
   */
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CreateCommunitySchema>({
    resolver: zodResolver(createCommunitySchema),
  });

  /**
   * event-handler
   */
  const handleCreateCommunity = useCallback(() => {
    const communityName = getValues("communityName");
    createCommunity(communityName);
  }, [createCommunity, getValues]);

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          bgcolor: "primary.light",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        component="form"
        onSubmit={handleSubmit(setOpenModal.on)}
      >
        <Box sx={{ width: "100%" }}>
          <Card
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "50%",
              margin: "0 auto",
              boxShadow:
                "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              新しいコミュニティの名前を入力してください
            </Typography>
            <TextField
              label="コミュニティ名"
              sx={{ mt: "45px", width: "450px" }}
              {...register("communityName")}
            />
            <Typography color="error">
              {errors.communityName?.message}
            </Typography>
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
            <BackButton
              style={{ width: "350px", marginTop: "20px" }}
              onClick={() => goToCommunity()}
            >
              戻る
            </BackButton>
          </Card>
        </Box>
      </Box>
      <Modal
        open={openModal}
        onClose={setOpenModal.off}
        sx={{ top: "40%", mx: "auto", width: "600px" }}
      >
        <Box>
          <AgreeModal
            onAgree={handleCreateCommunity}
            onCancel={setOpenModal.off}
          >
            確定後にコミュニティ名を変更することはできません。
            <br />
            本当によろしいですか？
          </AgreeModal>
        </Box>
      </Modal>
    </>
  );
};
