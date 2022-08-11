import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
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
          <VolumeUpIcon />
        </IconButton>
      ) : (
        <IconButton onClick={onClickVolume}>
          <VolumeOffIcon />
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
        <LogoutIcon />
      </IconButton>
    </>
  );
};
