import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { GithubLoginButton } from "react-social-login-buttons";
import logo from "../../assets/logo_transparent.png";
import backgroundImg from "../../assets/p2p_background.jpg";
import { Card } from "../../components/Card";
import { useAuth } from "../../context/auth";
import { useClientRoute } from "../../hooks/useClientRoute";
import { usePublicRoute } from "../../hooks/usePublicRoute";
import { getGithubAuthUrl } from "../../utils";

export const LoginPage = () => {
  const { loginStatus } = useAuth();
  const { goToHome } = useClientRoute();
  const { goToCommunity } = usePublicRoute();

  const isMobile = useMediaQuery("(max-width:640px)");

  useEffect(() => {
    if (loginStatus === "authFinished") {
      goToCommunity({ replace: true });
    }
    if (loginStatus === "logined") {
      goToHome({ replace: true });
    }
  }, [loginStatus, goToCommunity, goToHome]);

  if (isMobile) {
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
        <Typography
          sx={{ m: "auto", textAlign: "center", pt: "200px" }}
          fontWeight="bold"
        >
          お使いの画面幅では使用できません。
          <br />
          お手持ちのPC等でご利用ください。
        </Typography>
      </>
    );
  }

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
            <Box sx={{ p: 1 }}>
              <Card style={{ height: "auto" }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: "10px" }}>
                  コミュニティについて
                </Typography>
                <Typography sx={{ mb: "5px", ml: "10px" }}>
                  「ぺあぷろ！」は特定のコミュニティの中で使用するサービスです。
                  (サークル、会社、友人同士など)
                  <br />
                  そのため、以下のようにしてコミュニティに属す必要があります。
                  <br />
                  <br />
                  <b>- 自ら新規コミュニティを作る</b>
                  <br />
                  <b>- 既存のコミュニティに参加する</b>
                  <br />
                  <br />
                  (＊既存のコミュニティに参加するためにはコミュニティIDが必要になります。)
                  <br />
                </Typography>
              </Card>
            </Box>
            <Box component="ul" sx={{ p: 1 }}>
              <Card style={{ height: "auto" }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: "10px" }}>
                  「ぺあぷろ！」における
                  <br />
                  ドライバーとナビゲータとは？
                </Typography>
                <Typography component="li" sx={{ mb: "5px", ml: "10px" }}>
                  <b>ドライバー</b>
                  <br />
                  <b>
                    自分の好きな技術、気になるテーマでマッチングを募集する立場です
                  </b>
                  <br />
                  そのため、「最近気になる技術があるんだけど、誰かツヨツヨな人に教えてもらいたいな〜」なんて人は積極的に募集をしましょう！
                </Typography>
                <Typography component="li" sx={{ mb: "5px", ml: "10px" }}>
                  <b>ナビゲータ</b>
                  <br />
                  <b>
                    ナビゲータはドライバーが募集している一覧から、気になったテーマを選択してマッチングします。
                  </b>
                  <br />
                  人に教えることで学びはより深まります。自分の得意とする分野で困ってるドライバーがいたら教えてあげましょう！
                </Typography>
              </Card>
            </Box>
            <Box sx={{ p: 1 }}>
              <Card style={{ height: "auto" }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: "10px" }}>
                  マッチングポイント(MP)について
                </Typography>
                <Typography component="li" sx={{ mb: "5px" }}>
                  自分の好きな内容で募集をかける(<b>ドライバーになる</b>)と、
                  マッチングポイントが<b>1つ減ります</b>。
                </Typography>
                <Typography component="li" sx={{ mb: "5px" }}>
                  公開されている募集一覧からマッチングする(
                  <b>ナビゲータになる</b>)とポイントが
                  <b>1つ増えます</b>。
                </Typography>
                <Typography>
                  積極的にマッチングをして自分の好きなテーマでペアプロをしましょう！
                </Typography>
              </Card>
            </Box>
            <Box sx={{ p: 1 }}>
              <Card style={{ height: "auto" }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: "10px" }}>
                  マッチングした後の流れ
                </Typography>
                <Typography component="li">
                  マッチング相手と<b>チャットでペアプロ日時を決めましょう</b>
                </Typography>
                <Typography component="li">
                  ペアプロ当日になったら、<b>通話をしてペアプロ実践！</b>
                  <br />
                  画面共有なども駆使して学びを深めましょう！
                </Typography>
              </Card>
            </Box>
          </Box>
          <Box
            sx={{
              width: "50%",
              my: "auto",
              mx: {
                xs: "auto",
                sm: "auto",
                md: "auto",
              },
            }}
          >
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
