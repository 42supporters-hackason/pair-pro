import React from "react";
import { Box, Typography } from "@mui/material";
import development from "../../assets/development.png";
import driver from "../../assets/driver.jpeg";
import navigator from "../../assets/navigator.png";
import pairpro from "../../assets/pairpro.png";
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
          </Box>
          <Box
            component="img"
            src={driver}
            sx={{ width: "30%", height: "30%", my: "auto" }}
          />
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
            <Typography variant="h6" fontWeight="bold" sx={{ mb: "10px" }}>
              「ぺあぷろ！」における ドライバーとナビゲータとは？
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
          </Box>
          <Box
            component="img"
            src={navigator}
            sx={{ width: "20%", height: "20%", m: "auto" }}
          />
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
          </Box>
          <Box
            component="img"
            src={development}
            sx={{ width: "20%", height: "20%", m: "auto" }}
          />
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
          </Box>
          <Box
            component="img"
            src={pairpro}
            sx={{ width: "20%", height: "20%", m: "auto" }}
          />
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
