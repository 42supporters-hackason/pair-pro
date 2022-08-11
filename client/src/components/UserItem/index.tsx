import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { Card } from "../Card";
interface Props {
  name: string;
  githubLogin: string;
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
      </Box>
    </Card>
  );
};
