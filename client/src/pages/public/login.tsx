import { Box, Typography } from "@mui/material";
import backgroundImg from "../../assets/p2p_background.jpg";
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
          <Box>説明文を追加する</Box>
          <Box>
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
                sx={{ textAlign: "center", mb: "80px" }}
              >
                お手持ちのGithubで認証をします
              </Typography>
              <GithubLoginButton
                style={{ width: "600px" }}
                onClick={() => goToHome({ replace: true })}
              />
            </Card>
          </Box>
        </Box>
      </Box>
    </>
  );
};
