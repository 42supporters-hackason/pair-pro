import React from "react";
import { Box, Typography } from "@mui/material";
import { GithubLoginButton } from "react-social-login-buttons";
import backgroundImg from "../../assets/p2p_background.jpg";
import { Card } from "../../components/Card";
import { useClientRoute } from "../../hooks/useClientRoute";
import { getGithubAuthUrl } from "../../utils";

export const LoginPage = () => {
  const { goToHome } = useClientRoute();

  return (
    <>
      <Box
        component="img"
        src={backgroundImg}
        sx={{
          height: "100vh",
          width: "100%",
          position: "absolute",
          zIndex: "-999",
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "column", m: "0 100px 0" }}>
        <Typography
          sx={{
            m: "115px auto 0",
            alignItems: "center",
            justifyContent: "ceter",
          }}
          variant="h2"
          fontWeight="bold"
        >
          P 2 P M a c h i n g
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            mt: "70px",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              overflow: "scroll",
              height: "300px",
              width: "40%",
              gap: 1,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ textAlign: "center" }}
            >
              アプリの使い方
            </Typography>
            <Box component="ol" sx={{ p: 1 }}>
              <Card style={{ height: "auto" }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: "10px" }}>
                  ペアプロ相手とマッチングする方法は2つ
                </Typography>
                <Typography
                  component="li"
                  fontWeight="bold"
                  sx={{ mb: "5px", ml: "10px" }}
                >
                  自分が興味のある内容で募集をかけ、
                  <br />
                  マッチングが成立するのを待つ
                </Typography>
                <Typography
                  component="li"
                  fontWeight="bold"
                  sx={{ ml: "10px" }}
                >
                  公開されている募集一覧から好きな相手を見つける
                </Typography>
              </Card>
            </Box>
            <Box sx={{ p: 1 }}>
              <Card style={{ height: "auto" }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: "10px" }}>
                  マッチングポイント(MP)について
                </Typography>
                <Typography component="li" fontWeight="bold" sx={{ mb: "5px" }}>
                  自分の好きな内容で募集をかけると、
                  <br />
                  マッチングポイントが1つ減ります。
                </Typography>
                <Typography component="li" fontWeight="bold" sx={{ mb: "5px" }}>
                  公開されている募集一覧からマッチングするとポイントが1つ増えます。
                </Typography>
                <Typography component="li" fontWeight="bold">
                  積極的にマッチングをし、
                  <br />
                  ポイントを貯めて自分の好きなテーマでペアプロをしましょう！
                </Typography>
              </Card>
            </Box>
            <Box sx={{ p: 1 }}>
              <Card style={{ height: "auto" }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: "10px" }}>
                  マッチングした後の流れ
                </Typography>
                <Typography component="li" fontWeight="bold">
                  マッチング相手とチャットでペアプロ日時を決めましょう
                </Typography>
                <Typography component="li" fontWeight="bold">
                  日時が決まったらペアプロルームで通話をしてペアプロを実践！
                </Typography>
              </Card>
            </Box>
          </Box>
          <Box sx={{ width: "50%", my: "auto" }}>
            <Card
              style={{
                borderRadius: "999px",
                backgroundColor: "#f0f0fc",
              }}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  m: "30px 0 30px",
                  textAlign: "center",
                }}
              >
                Login or SignUp
              </Typography>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ textAlign: "center", mb: "40px" }}
              >
                お手持ちのGithubで認証をします
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <GithubLoginButton
                  style={{ width: "60%", borderRadius: "15px" }}
                  onClick={() => window.location.assign(getGithubAuthUrl())}
                />
              </Box>
            </Card>
          </Box>
        </Box>
      </Box>
    </>
  );
};
