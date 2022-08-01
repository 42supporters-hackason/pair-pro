import { useCallback, useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import LogoutIcon from "@mui/icons-material/Logout";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import {
  Avatar,
  Box,
  Button,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { connect, LocalVideoTrack, Room } from "twilio-video";
import { ChatMessage } from "../../components/ChatMessage";
import { EnterButton } from "../../components/EnterButton";
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
  const { messages, opponentGithubLogin, opponentName } = useChatHooks(
    roomId ?? unreachable()
  );
  const videoRef = useRef<HTMLDivElement | null>(null);

  const [sendMessage] = useSendMessageMutation();

  /**
   * form validation
   */
  const { register, handleSubmit, setValue } = useForm<ChatSchema>({
    resolver: zodResolver(chatSchema),
  });
  const { profile } = useProfile();
  const { data: accessTokenReturnValue } = useGetVideoAccessTokenQuery({
    variables: {
      identity: profile.githubLogin ?? "",
      room: roomId ?? unreachable(),
    },
  });

  /**
   * event-handler
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
  }, [accessTokenReturnValue, roomId]);

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
      videoRef.current?.remove();
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

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    if (shareScreenTrack !== null) {
      shareScreenTrack.mediaStreamTrack.onended = () => {
        shareScreenHandler();
      };
    }
  }, [shareScreenTrack, shareScreenHandler]);

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
            {roomData === null ? (
              <EnterButton onClick={handleEnterRoom} />
            ) : (
              <VideoRoom room={roomData} ref={videoRef} />
            )}
          </Box>
          {roomData !== null && (
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
          )}
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
            <Avatar src={`https://github.com/${opponentGithubLogin}.png`} />
            <Typography fontWeight="bold">{opponentName}</Typography>
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
          {messages &&
            messages.map(({ id, content, createdBy }) => (
              <Box key={id}>
                <ChatMessage
                  key={id}
                  content={content}
                  side={createdBy === "taisei-13046" ? "right" : "left"}
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
            mb: "30px",
          }}
          component="form"
          onSubmit={handleSubmit(handleMessageSubmit)}
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
            {...register("message")}
          />
          <Button type="submit">
            <SendRoundedIcon sx={{ cursor: "pointer", m: "auto" }} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
