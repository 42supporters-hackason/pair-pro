import React from "react";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import { IconButton } from "../IconButton";

interface Props {
  /**
   * volumeがonになっているかのflag
   */
  volumeOn: boolean;
  /**
   * videoがonになっているかのflag
   */
  videoOn: boolean;
  /**
   * volumeのtoggle
   */
  onClickVolume: () => void;
  /**
   * videoのtoggle
   */
  onClickVideo: () => void;
  /**
   * 画面共有のtoggle
   */
  onClickShareScreen: () => void;
  /**
   * 退出ボタンのアクション
   */
  onExit: () => void;
}

/**
 * video画面の下に表示する設定ボタン類
 */
export const VideoButtons = ({
  volumeOn,
  videoOn,
  onClickVideo,
  onClickVolume,
  onClickShareScreen,
  onExit,
}: Props) => {
  return (
    <>
      {volumeOn ? (
        <IconButton onClick={onClickVolume}>
          <MicIcon />
        </IconButton>
      ) : (
        <IconButton onClick={onClickVolume}>
          <MicOffIcon />
        </IconButton>
      )}
      {videoOn ? (
        <IconButton onClick={onClickVideo}>
          <VideocamIcon />
        </IconButton>
      ) : (
        <IconButton onClick={onClickVideo}>
          <VideocamOffIcon />
        </IconButton>
      )}
      <IconButton onClick={onClickShareScreen}>
        <PersonalVideoIcon />
      </IconButton>
      <IconButton onClick={onExit}>
        <PhoneDisabledIcon />
      </IconButton>
    </>
  );
};
