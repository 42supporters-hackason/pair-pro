import { useEffect, useRef, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { Avatar, Box, TextareaAutosize, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { ChatMessage } from "../../components/ChatMessage";
import { EnterButton } from "../../components/EnterButton";
import { IconButton } from "../../components/IconButton";
import { VideoButtons } from "../../components/VideoButtons";
import { useFetchSpecificPostQuery } from "../../gen/graphql-client";
import { useBoolean } from "../../hooks/useBoolean";
import { useClientRoute } from "../../hooks/useClientRoute";

const demoChat = [
  {
    id: 1,
    content: "おはようございます",
    createdBy: "taisei-13046",
  },
  {
    id: 2,
    content: "おはようございます",
    createdBy: "ataisei-13046",
  },
  {
    id: 3,
    content: "おはようございます",
    createdBy: "taisei-13046",
  },
  {
    id: 4,
    content: "おはようございます",
    createdBy: "taisei-13046",
  },
  {
    id: 5,
    content: "おはようございます",
    createdBy: "ataisei-13046",
  },
  {
    id: 6,
    content:
      "おはようございますあああああああああああああああああああああああああああああああ",
    createdBy: "taisei-13046",
  },
  {
    id: 3,
    content: "おはようございます",
    createdBy: "taisei-13046",
  },
  {
    id: 4,
    content: "おはようございます",
    createdBy: "taisei-13046",
  },
  {
    id: 5,
    content: "おはようございます",
    createdBy: "ataisei-13046",
  },
  {
    id: 6,
    content:
      "おはようございますあああああああああああああああああああああああああああああああ",
    createdBy: "taisei-13046",
  },
  {
    id: 3,
    content: "おはようございます",
    createdBy: "taisei-13046",
  },
  {
    id: 4,
    content: "おはようございます",
    createdBy: "taisei-13046",
  },
  {
    id: 5,
    content: "おはようございます",
    createdBy: "ataisei-13046",
  },
  {
    id: 6,
    content:
      "おはようございますあああああああああああああああああああああああああああああああ",
    createdBy: "taisei-13046",
  },
];

/**
 * p2p相手とやり取りをするページ
 */
export const ChatPage = () => {
  /**
   * misc.
   */
  const [volumeOn, setVolumeOn] = useBoolean(false);
  const [videoOn, setVideoOn] = useBoolean(false);
  const [track, setTrack] = useState(null);
  const { goToHome } = useClientRoute();
  const ref = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("room_id");
  const { data: post } = useFetchSpecificPostQuery({
    variables: {
      id: Number(roomId),
    },
  });

  useEffect(() => {
    ref.current?.scrollIntoView(false);
  }, []);

  return (
    <Box sx={{ display: "flex", height: "calc(100vh - 68.5px)" }}>
      <Box sx={{ width: "70%", mx: 3, mt: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", height: "85%", width: "100%", gap: 3 }}>
            {track === null ? (
              <EnterButton />
            ) : (
              <Box sx={{ width: "50%", border: 1 }}>自分</Box>
            )}
          </Box>
          <Box sx={{ m: "auto", display: "flex", gap: 2 }}>
            <VideoButtons
              volumeOn={volumeOn}
              videoOn={videoOn}
              onClickVideo={setVideoOn.toggle}
              onClickVolume={setVolumeOn.toggle}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 68.5px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            borderBottom: 1,
            borderColor: "primary.main",
            py: "30px",
          }}
        >
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Avatar
              src={`https://github.com/${post?.post?.navigator?.githubLogin}.png`}
            />
            <Typography fontWeight="bold">
              {post?.post?.navigator?.name}
            </Typography>
          </Box>
          <IconButton sx={{ mr: 2 }} onClick={() => goToHome()}>
            <Typography fontWeight="bold" sx={{ mr: 1 }}>
              退出する
            </Typography>
            <LogoutIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            my: "15px",
            mx: "25px",
            overflow: "scroll",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {demoChat.map(({ id, content, createdBy }) => (
            <Box ref={ref} key={id}>
              <ChatMessage
                key={id}
                content={content}
                side={createdBy === "taisei-13046" ? "right" : "left"}
              />
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "15px",
            mt: "auto",
            mb: "30px",
          }}
        >
          <TextareaAutosize
            minRows={3}
            maxRows={3}
            style={{
              width: "80%",
              borderRadius: "15px",
              resize: "none",
              padding: "15px",
            }}
          />
          <SendRoundedIcon sx={{ cursor: "pointer", mb: "10px", mt: "auto" }} />
        </Box>
      </Box>
    </Box>
  );
};
