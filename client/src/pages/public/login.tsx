import React from "react";
import { Box, Typography } from "@mui/material";
import { GithubLoginButton } from "react-social-login-buttons";
import logo from "../../assets/logo_transparent.png";
import backgroundImg from "../../assets/p2p_background.jpg";
import { Card } from "../../components/Card";
import { getGithubAuthUrl } from "../../utils";

export const LoginPage = () => {
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
        <Box
          component="img"
          src={logo}
          sx={{
            height: "150px",
            textAlign: "center",
            mt: "100px",
            mb: "50px",
            mx: "auto",
          }}
        />
        <Box
          sx={{
            display: "flex",
            width: "100%",
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
                boxShadow:
                  "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
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
              <Box
                sx={{ display: "flex", justifyContent: "center", mb: "15px" }}
              >
                <GithubLoginButton
                  style={{
                    width: "60%",
                    borderRadius: "999px",
                    paddingLeft: "30px",
                  }}
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
