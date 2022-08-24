import React, { useState } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { LanguageItem } from "../../components/LanguageItem";
import { TitleToggle } from "../../components/TitleToggle";
import { UserRanking } from "../../components/UserRanking";
import { useStatisticsHooks } from "../hooks/useStatisticsHooks";

type MyStatisticsType = "teachedSkill" | "teachingSkill";
type CommunityStatisticsType =
  | "mostNavigate"
  | "mostDrive"
  | "mostUsedLanguage";
type StatisticsType = MyStatisticsType | CommunityStatisticsType;

export const StatisticsPage = () => {
  /**
   * state
   */
  const [showStatistics, setShowStatistics] =
    useState<StatisticsType>("teachedSkill");

  /**
   * ページhooks
   */
  const {
    navigatedSkillsList,
    navigatorRankig,
    drivenSkillsList,
    driverRanking,
  } = useStatisticsHooks();
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
          {showStatistics === "teachedSkill" && (
            <>
              {navigatedSkillsList?.ListNavigatedSkills.map(
                ({ skill, count }, index) => (
                  <LanguageItem
                    key={skill.id}
                    rank={index + 1}
                    name={skill.name}
                    imageUrl={skill.imageUrl}
                    count={count}
                  />
                )
              )}
            </>
          )}
          {showStatistics === "teachingSkill" && (
            <>
              {drivenSkillsList?.ListDrivenSkills.map(
                ({ skill, count }, index) => (
                  <LanguageItem
                    key={skill.id}
                    rank={index + 1}
                    name={skill.name}
                    imageUrl={skill.imageUrl}
                    count={count}
                  />
                )
              )}
            </>
          )}
          {showStatistics === "mostDrive" && (
            <>
              {driverRanking?.ListDriverPostsRanking.map(
                ({ count, profile }, index) => {
                  if (count <= 0) {
                    return;
                  }
                  return (
                    <UserRanking
                      key={profile.id}
                      name={profile.name}
                      bio={profile.bio}
                      githubLogin={profile.user.githubLogin}
                      rank={index + 1}
                      count={count}
                    />
                  );
                }
              )}
            </>
          )}
          {showStatistics === "mostNavigate" && (
            <>
              {navigatorRankig?.ListNavigatorPostsRanking.map(
                ({ count, profile }, index) => {
                  if (count <= 0) {
                    return;
                  }
                  return (
                    <UserRanking
                      key={profile.id}
                      name={profile.name}
                      bio={profile.bio}
                      githubLogin={profile.user.githubLogin}
                      rank={index + 1}
                      count={count}
                    />
                  );
                }
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};
