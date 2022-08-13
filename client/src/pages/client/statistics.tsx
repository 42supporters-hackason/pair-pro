import React, { useState } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { TitleToggle } from "../../components/TitleToggle";
import { UserItem } from "../../components/UserItem";

type MyStatisticsType = "teachedSkill" | "teachingSkill";
type CommunityStatisticsType =
  | "mostNavigate"
  | "mostDrive"
  | "mostUsedLanguage";
type StatisticsType = MyStatisticsType | CommunityStatisticsType;

const demoStatistics = [
  {
    id: 1,
    name: "taisei-13046",
    githubLogin: "taisei-13046",
    bio: "初めまして！",
  },
  {
    id: 2,
    name: "taisei-13046",
    githubLogin: "taisei-13046",
    bio: "初めまして！",
  },
  {
    id: 3,
    name: "taisei-13046",
    githubLogin: "taisei-13046",
    bio: "初めまして！",
  },
  {
    id: 4,
    name: "taisei-13046",
    githubLogin: "taisei-13046",
    bio: "初めまして！",
  },
  {
    id: 5,
    name: "taisei-13046",
    githubLogin: "taisei-13046",
    bio: "初めまして！",
  },
];

export const StatisticsPage = () => {
  const [showStatistics, setShowStatistics] =
    useState<StatisticsType>("teachedSkill");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mx: "100px",
        mt: "30px",
        gap: "30px",
      }}
    >
      <Box sx={{ display: "flex", gap: "50px", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography fontWeight="bold">自分のランキング</Typography>
          <Box sx={{ display: "flex", gap: "50px" }}>
            <TitleToggle
              selected={showStatistics === "teachedSkill"}
              onClick={() => setShowStatistics("teachedSkill")}
            >
              教わった言語
            </TitleToggle>
            <TitleToggle
              selected={showStatistics === "teachingSkill"}
              onClick={() => setShowStatistics("teachingSkill")}
            >
              教えた言語
            </TitleToggle>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography fontWeight="bold">コミュニティのランキング</Typography>
          <Box sx={{ display: "flex", gap: "50px" }}>
            <TitleToggle
              selected={showStatistics === "mostNavigate"}
              onClick={() => setShowStatistics("mostNavigate")}
            >
              募集に対応した回数
            </TitleToggle>
            <TitleToggle
              selected={showStatistics === "mostDrive"}
              onClick={() => setShowStatistics("mostDrive")}
            >
              募集した回数
            </TitleToggle>
            <TitleToggle
              selected={showStatistics === "mostUsedLanguage"}
              onClick={() => setShowStatistics("mostUsedLanguage")}
            >
              最も使われている言語
            </TitleToggle>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "70%",
          mx: "auto",
          py: "40px",
          px: "100px",
          bgcolor: "primary.light",
          borderRadius: "20px",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {demoStatistics.map(({ id, name, githubLogin, bio }) => (
            <UserItem
              key={id}
              name={name}
              githubLogin={githubLogin}
              bio={bio}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
