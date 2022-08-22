import React from "react";
import { Box } from "@mui/system";
import { TitleToggle } from "../TitleToggle";

type ShowList = "myPostList" | "matchedList" | "finishedPost";

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
      <TitleToggle
        selected={showList === "matchedList"}
        onClick={() => setShowList("matchedList")}
      >
        マッチング済みの予定
      </TitleToggle>
      <TitleToggle
        selected={showList === "myPostList"}
        onClick={() => setShowList("myPostList")}
      >
        募集中の投稿
      </TitleToggle>
      <TitleToggle
        selected={showList === "finishedPost"}
        onClick={() => setShowList("finishedPost")}
      >
        終了した投稿
      </TitleToggle>
    </Box>
  );
};
