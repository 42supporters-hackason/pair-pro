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
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 3, width: "100%" }}
      >
        <Avatar src={`https://github.com/${githubLogin}.png`} />
        <Box sx={{ width: "100%" }}>
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
    </Card>
  );
};
