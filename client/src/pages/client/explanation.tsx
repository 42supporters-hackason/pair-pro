import React from "react";
import { Box, Typography } from "@mui/material";
import development from "../../assets/development.png";
import driver from "../../assets/driver.jpeg";
import navigator from "../../assets/navigator.png";
import { BackButton } from "../../components/BackButton";
import { Card } from "../../components/Card";
import { useClientRoute } from "../../hooks/useClientRoute";

/**
 * client/explanation
 */
export const ExplanationPage = () => {
  const { goToHome } = useClientRoute();
  return (
    <Box
      sx={{
        my: "30px",
        width: "70%",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Card>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: "70%",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              ペアプロ相手とマッチングする方法は2つ
            </Typography>
            <Typography fontWeight="bold">
              1. 自分が興味のある内容で募集をかけ、マッチングが成立するのを待つ
            </Typography>
            <Typography fontWeight="bold">
              2. 公開されている募集一覧から好きな相手を見つける
            </Typography>
          </Box>
          <Box component="img" src={driver} sx={{ width: "30%" }} />
        </Box>
      </Card>
      <Card>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: "75%",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              マッチングポイント(MP)について
            </Typography>
            <Typography fontWeight="bold">
              自分の好きな内容で募集をかけると、マッチングポイントが1つ減ります。
            </Typography>
            <Typography fontWeight="bold">
              公開されている募集一覧からマッチングするとポイントが1つ増えます。
            </Typography>
            <Typography fontWeight="bold">
              積極的にマッチングをし、ポイントを貯めて自分の好きなテーマでペアプロをしましょう！
            </Typography>
          </Box>
          <Box component="img" src={navigator} sx={{ width: "20%" }} />
        </Box>
      </Card>
      <Card>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: "75%",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              マッチングした後の流れ
            </Typography>
            <Typography fontWeight="bold">
              マッチング相手とチャットでペアプロ日時を決めましょう
            </Typography>
            <Typography fontWeight="bold">
              日時が決まったらペアプロルームで通話をしてペアプロを実践！
            </Typography>
          </Box>
          <Box component="img" src={development} sx={{ width: "20%" }} />
        </Box>
      </Card>
      <BackButton
        style={{ width: "450px", margin: "20px auto 35px" }}
        onClick={() => goToHome()}
      >
        戻る
      </BackButton>
    </Box>
  );
};
