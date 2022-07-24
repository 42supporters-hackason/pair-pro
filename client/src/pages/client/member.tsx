import React from "react";
import { Pagination, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { CopyInput } from "../../components/CopyInput";
import { UserItem } from "../../components/UserItem";

const DEMO_MEMBER = [
  {
    id: 1,
    name: "taisei",
    githubLogin: "taisei-13046",
    bio: "初めまして！",
  },
  {
    id: 2,
    name: "taisei",
    githubLogin: "taisei-13046",
    bio: "初めまして！",
  },
  {
    id: 3,
    name: "taisei",
    githubLogin: "taisei-13046",
    bio: "初めまして！",
  },
  {
    id: 4,
    name: "taisei",
    githubLogin: "taisei-13046",
    bio: "初めまして！",
  },
];

/**
 * client/member
 */
export const MemberPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: "30px",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 3,
          alignItems: "center",
          width: "60%",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          42tokyo
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography fontWeight="bold">招待コード</Typography>
          <CopyInput value="jsalkjljgdsaljfaljfa" />
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <Box
          sx={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {DEMO_MEMBER.map(({ id, name, githubLogin, bio }) => (
            <UserItem
              key={id}
              name={name}
              githubLogin={githubLogin}
              bio={bio}
            />
          ))}
        </Box>
        <Box
          sx={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {DEMO_MEMBER.map(({ id, name, githubLogin, bio }) => (
            <UserItem
              key={id}
              name={name}
              githubLogin={githubLogin}
              bio={bio}
            />
          ))}
        </Box>
      </Box>
      <Pagination />
    </Box>
  );
};
