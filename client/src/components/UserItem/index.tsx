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
}

/**
 * Userの情報を表示するコンポーネント
 */
export const UserItem = ({ name, githubLogin, bio }: Props) => {
  return (
    <Card>
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <Avatar src={`https://github.com/${githubLogin}.png`} />
        <Box>
          <Typography fontWeight="bold">{name}</Typography>
          <Typography>{bio}</Typography>
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
