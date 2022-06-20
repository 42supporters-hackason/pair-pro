import {
  Box,
  Button,
  Modal,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import { Card } from "../../components/Card";
import { useBoolean } from "../../hooks/useBoolean";
import { applySchema, ApplySchema } from "./validation/apply_vaildation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";

/**
 * マッチングの募集をするページ
 */
export const ApplyPage = () => {
  const [openModal, setOpenModal] = useBoolean(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplySchema>({
    resolver: zodResolver(applySchema),
  });

  const handleApply = useCallback(() => {
    setOpenModal.on();
  }, []);

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
          gap: "60px",
          width: "100%",
          mt: 3,
        }}
        component="form"
        onSubmit={handleSubmit(handleApply)}
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
        <Box sx={{ display: "flex", width: "500px", gap: 1 }}>
          <Box sx={{ width: "50%" }}>
            <TextField
              variant="standard"
              label="使用言語"
              sx={{ width: "100%" }}
              {...register("language")}
            />
            {errors.content && (
              <Typography sx={{ mt: "5px", color: "error.main" }}>
                {errors.content.message}
              </Typography>
            )}
          </Box>
          <Box>
            <Controller
              name="date"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DesktopDatePicker
                  label="日時"
                  inputFormat="MM/dd/yyyy"
                  value={value}
                  onChange={onChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            />
            {errors.date && (
              <Typography sx={{ mt: "5px", color: "error.main" }}>
                {errors.date.message}
              </Typography>
            )}
          </Box>
        </Box>
        <Button
          sx={{
            mt: "100px",
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
      <Modal open={openModal} onClose={setOpenModal.off}>
        <Box sx={{ m: "100px" }}>
          <Card></Card>
        </Box>
      </Modal>
    </Box>
  );
};
