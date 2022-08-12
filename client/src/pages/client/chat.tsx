import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import CallIcon from "@mui/icons-material/Call";
import LogoutIcon from "@mui/icons-material/Logout";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { connect, LocalVideoTrack, Room } from "twilio-video";
import { ChatMessage } from "../../components/ChatMessage";
import { IconButton } from "../../components/IconButton";
import { VideoButtons } from "../../components/VideoButtons";
import { VideoRoom } from "../../components/VideoRoom";
import { useProfile } from "../../context/auth";
import {
  useGetVideoAccessTokenQuery,
  useSendMessageMutation,
} from "../../gen/graphql-client";
import { useBoolean } from "../../hooks/useBoolean";
import { useClientRoute } from "../../hooks/useClientRoute";
import { unreachable } from "../../utils";
import { useChatHooks } from "../hooks/useChatHooks";
import { ChatSchema, chatSchema } from "../validation/chat_validation";

/**
 * p2p相手とやり取りをするページ
 */
export const ChatPage = () => {
  /**
   * misc.
   */
  const [volumeOn, setVolumeOn] = useBoolean(true);
  const [videoOn, setVideoOn] = useBoolean(true);
  const [shareScreenTrack, setShareScreenTrack] =
    useState<LocalVideoTrack | null>(null);
  const [roomData, setRoomData] = useState<Room | null>(null);
  const { goToHome } = useClientRoute();
  const ref = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("room_id");
  const {
    messages,
    opponentGithubLogin,
    opponentName,
    myGithubLogin,
    refetchMessages,
  } = useChatHooks(roomId ?? unreachable(), ref);
  const videoRef = useRef<HTMLDivElement | null>(null);

  const [sendMessage] = useSendMessageMutation();

  /**
   * form validation
   */
  const { register, handleSubmit, setValue, watch } = useForm<ChatSchema>({
    resolver: zodResolver(chatSchema),
  });
  const watchMessage = watch("message");
  const { profile } = useProfile();
  const { data: accessTokenReturnValue } = useGetVideoAccessTokenQuery({
    variables: {
      identity: profile?.githubLogin ?? "",
      room: roomId ?? unreachable(),
    },
  });

  /**
   * event-handler
   */
  /**
   * video
   */
  const handleEnterRoom = useCallback(async () => {
    if (accessTokenReturnValue?.accessToken.accessToken) {
      const room = await connect(
        accessTokenReturnValue.accessToken.accessToken,
        {
          name: roomId,
          audio: true,
          video: true,
        }
      );
      setRoomData(room);
    }
  }, [accessTokenReturnValue, roomId]);

  const handleExitRoom = useCallback(async () => {
    if (accessTokenReturnValue?.accessToken.accessToken) {
      const room = await connect(
        accessTokenReturnValue.accessToken.accessToken,
        {
          name: roomId,
          audio: false,
          video: false,
        }
      );
      room.disconnect();
      setVolumeOn.on();
      setVideoOn.on();
      setRoomData(null);
    }
  }, [accessTokenReturnValue, roomId, setVideoOn, setVolumeOn]);

  const shareScreenHandler = useCallback(() => {
    if (shareScreenTrack === null) {
      navigator.mediaDevices.getDisplayMedia().then((stream) => {
        const screenTrack = new LocalVideoTrack(stream.getTracks()[0]);
        roomData?.localParticipant.publishTrack(screenTrack);
        screenTrack.mediaStreamTrack.onended = () => {
          shareScreenHandler();
        };
        setShareScreenTrack(screenTrack);
        const videoChild = screenTrack.attach();
        videoChild.style.width = "100%";
        videoChild.style.borderRadius = "9px";
        videoRef.current?.appendChild(videoChild);
      });
    } else {
      roomData?.localParticipant.unpublishTrack(shareScreenTrack);
      shareScreenTrack.stop();
      videoRef.current?.firstChild?.remove();
      setShareScreenTrack(null);
    }
  }, [shareScreenTrack, setShareScreenTrack, roomData?.localParticipant]);

  const handleToggleVideo = useCallback(() => {
    roomData?.localParticipant.videoTracks.forEach((videoTrack) =>
      videoOn ? videoTrack.track.disable() : videoTrack.track.enable()
    );
    setVideoOn.toggle();
  }, [roomData, videoOn, setVideoOn]);

  const handleVolumeToggle = useCallback(() => {
    roomData?.localParticipant.audioTracks.forEach((audioTrack) =>
      volumeOn ? audioTrack.track.disable() : audioTrack.track.enable()
    );
    setVolumeOn.toggle();
  }, [roomData, volumeOn, setVolumeOn]);

  /**
   * chat
   */
  const handleMessageSubmit: SubmitHandler<ChatSchema> = useCallback(
    async ({ message }) => {
      if (roomId !== null) {
        await sendMessage({
          variables: {
            postId: roomId,
            content: message,
          },
          onCompleted: () => {
            setValue("message", "");
          },
        });
      }
    },
    [sendMessage, roomId, setValue]
  );

  const enterSubmitMessage = useCallback(
    async (event: KeyboardEvent) => {
      if (event.key === "Enter" && (!event.ctrlKey || !event.metaKey)) {
        event.preventDefault();
      }
      if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
        if (roomId !== null && watchMessage) {
          await sendMessage({
            variables: {
              postId: roomId,
              content: watchMessage,
            },
            onCompleted: () => {
              setValue("message", "");
            },
          });
        }
      }
    },
    [roomId, sendMessage, watchMessage, setValue]
  );

  useEffect(() => {
    refetchMessages();
    ref.current?.scrollIntoView();
  }, [messages, refetchMessages]);

  useEffect(() => {
    if (shareScreenTrack !== null) {
      shareScreenTrack.mediaStreamTrack.onended = () => {
        shareScreenHandler();
      };
    }
  }, [shareScreenTrack, shareScreenHandler]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "calc(100vh - 68.5px)",
        bgcolor: "primary.light",
      }}
    >
      {roomData !== null && (
        <Box sx={{ width: "100%", mx: 3, mt: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", height: "85%", width: "100%", gap: 1 }}>
              <VideoRoom
                room={roomData}
                shareScreenTrack={shareScreenTrack}
                ref={videoRef}
              />
            </Box>
            <Box sx={{ m: "auto", display: "flex", gap: 2 }}>
              <VideoButtons
                volumeOn={volumeOn}
                videoOn={videoOn}
                onClickVideo={handleToggleVideo}
                onClickVolume={handleVolumeToggle}
                onClickShareScreen={shareScreenHandler}
                onExit={handleExitRoom}
              />
            </Box>
          </Box>
        </Box>
      )}
      <Box
        sx={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 68.5px)",
          mx: "auto",
          bgcolor: "white",
          px: 3,
          borderRadius: "30px",
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
            <Avatar src={`https://github.com/${opponentGithubLogin}.png`} />
            <Typography fontWeight="bold">{opponentName}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            {roomData === null && (
              <IconButton sx={{ mr: 2 }} onClick={handleEnterRoom}>
                <Typography fontWeight="bold" sx={{ mr: 1 }}>
                  通話する
                </Typography>
                <CallIcon />
              </IconButton>
            )}
            <IconButton
              sx={{ mr: 2 }}
              onClick={() => {
                handleExitRoom();
                goToHome();
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
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
          {messages &&
            messages.map(({ id, content, createdBy }) => (
              <Box key={id}>
                <ChatMessage
                  key={id}
                  content={content}
                  side={createdBy === myGithubLogin ? "right" : "left"}
                />
              </Box>
            ))}
          <div ref={ref} />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            mt: "auto",
            mb: "20px",
          }}
          component="form"
          onSubmit={handleSubmit(handleMessageSubmit)}
        >
          <TextField
            style={{
              width: "100%",
              borderRadius: "15px",
              resize: "none",
              padding: "15px",
            }}
            InputProps={{
              endAdornment: (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Button type="submit">
                    <SendRoundedIcon sx={{ cursor: "pointer", m: "auto" }} />
                  </Button>
                  <Typography sx={{ fontSize: "3px" }}>ctl + enter</Typography>
                </Box>
              ),
            }}
            onKeyDown={enterSubmitMessage}
            {...register("message")}
          />
        </Box>
      </Box>
    </Box>
  );
};
