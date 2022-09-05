import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Avatar, Box, Typography } from "@mui/material";
import { Card } from "../Card";

interface Props {
  /**
   * 名前
   */
  name: string;
  /**
   * githubLogin
   */
  githubLogin: string;
  /**
   * 自己紹介
   */
  bio: string;
  /**
   * 回数
   */
  count: number;
  /**
   * rank
   */
  rank: number;
}

/**
 * Userの情報を表示するコンポーネント
 */
export const UserRanking = ({ name, githubLogin, bio, count, rank }: Props) => {
  return (
    <Card>
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 3, width: "100%" }}
      >
        <Box sx={{ width: "10%" }}>
          <Typography fontWeight="bold" sx={{ mr: 3 }}>
            {rank}位
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 3, width: "60%" }}
        >
          <Avatar src={`https://github.com/${githubLogin}.png`} />
          <Box sx={{ width: "80%" }}>
            <Typography fontWeight="bold">{name}</Typography>
            <Typography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
              }}
            >
              {bio}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="h6">
            <b>{count}</b>回
          </Typography>
        </Box>
        <Box
          onClick={() =>
            window.open(`https://github.com/${githubLogin}`, "_blank")
          }
          sx={{
            ml: "auto",
            mt: "auto",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1px",
          }}
        >
          <OpenInNewIcon sx={{ width: "20px", height: "20px" }} />
        </Box>
      </Box>
    </Card>
  );
};
