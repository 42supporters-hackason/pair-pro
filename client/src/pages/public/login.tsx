import { Box, Typography } from "@mui/material";
import backgroundImg from "../../assets/p2p_background.jpg";
import sns_img from "../../assets/login_sns.jpg";
import React from "react";
import { Card } from "../../components/Card";
import { GithubLoginButton } from "react-social-login-buttons";
import { useClientRoute } from "../../hooks/useClientRoute";

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
          variant="h3"
          fontWeight="bold"
        >
          P 2 P M a c h i n g
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            mt: "100px",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              mt: "auto",
            }}
          >
            <Box
              component="img"
              src={sns_img}
              sx={{
                width: "200px",
                height: "200px",
                mx: "auto",
                borderRadius: "15px",
              }}
            />
            <Typography variant="h6" fontWeight="bold">
              1. 自分からペアを募集する or 募集一覧からペアを見つける
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              2. マッチングが成立したらチャットで相手と連絡をとる
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              3. P2Pでペアプログラミングを実践!!
            </Typography>
          </Box>
          <Box sx={{ width: "50%", height: "50%", my: "auto" }}>
            <Card>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ m: "30px 0 40px", textAlign: "center" }}
              >
                Login or SignUp
              </Typography>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ textAlign: "center", mb: "50px" }}
              >
                お手持ちのGithubで認証をします
              </Typography>
              <GithubLoginButton
                style={{ width: "100%" }}
                onClick={() => goToHome({ replace: true })}
              />
            </Card>
          </Box>
        </Box>
      </Box>
    </>
  );
};
