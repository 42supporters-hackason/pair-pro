import React from "react";
import { Box } from "@mui/material";
import { Room } from "twilio-video";
import { VideoParticipant } from "../VideoParticipant";

interface Props {
  room: Room;
}

/**
 * twilio-video/Video Room
 */
export const VideoRoom = ({ room }: Props) => {
  return (
    <Box sx={{ width: "100%" }}>
      <VideoParticipant participant={room.localParticipant} />
    </Box>
  );
};
