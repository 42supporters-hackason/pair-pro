import {
  Box,
  Button,
  Modal,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import React from "react";
import { Card } from "../../components/Card";
import { useBoolean } from "../../hooks/useBoolean";
import { noop } from "../../utils";

/**
 * マッチングの募集をするページ
 */
export const ApplyPage = () => {
  const [openModal, setOpenModal] = useBoolean(false);
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
      >
        <TextField
          variant="standard"
          label="タイトル"
          sx={{ width: "500px" }}
        />
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
          />
        </Box>
        <Box sx={{ display: "flex", width: "500px", gap: 2 }}>
          <TextField
            variant="standard"
            label="使用言語"
            sx={{ width: "50%" }}
          />
          <DesktopDatePicker
            label="日時"
            inputFormat="MM/dd/yyyy"
            value=""
            onChange={noop}
            renderInput={(params) => <TextField {...params} />}
          />
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
        onClick={setOpenModal.on}
      >
        上記の内容で募集をする
      </Button>
      <Modal open={openModal} onClose={setOpenModal.off}>
        <Box sx={{ m: "100px" }}>
          <Card></Card>
        </Box>
      </Modal>
    </Box>
  );
};
