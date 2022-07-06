import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

type ShowList = "myPostList" | "matchedList";

interface Props {
  /**
   * 自分の投稿 | マッチングした一覧
   */
  showList: ShowList;
  /**
   * toggleするためのuseStateHooks
   */
  setShowList: (showList: ShowList) => void;
}

/**
 * Home画面のタイトルのtoggleコンポーネント
 */
export const HomeTitleToggle = ({ showList, setShowList }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        mb: 3,
        justifyContent: "center",
        gap: "50px",
      }}
    >
      {showList === "matchedList" ? (
        <>
          <Typography fontWeight="bold" sx={{ textDecoration: "underline" }}>
            マッチング済みの予定
          </Typography>
          <Typography
            fontWeight="bold"
            color="secondary.main"
            onClick={() => setShowList("myPostList")}
            sx={{ cursor: "pointer" }}
          >
            募集中の投稿
          </Typography>
        </>
      ) : (
        <>
          <Typography
            fontWeight="bold"
            color="secondary.main"
            onClick={() => setShowList("matchedList")}
            sx={{ cursor: "pointer" }}
          >
            マッチング済みの予定
          </Typography>
          <Typography fontWeight="bold" sx={{ textDecoration: "underline" }}>
            募集中の投稿
          </Typography>
        </>
      )}
    </Box>
  );
};
