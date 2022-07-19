import React from "react";
import { Box } from "@mui/material";
import { LocalParticipant, LocalVideoTrack } from "twilio-video";
import { LocalTrack } from "../LocalTrack";

interface Props {
  participant: LocalParticipant;
}

/**
 * twilio-video/local participant
 */
export const VideoParticipant = ({ participant }: Props) => {
  const tracks = Array.from(participant.tracks.values())
    .map((publication) => publication.track)
    .filter((track) => track !== null);

  return (
    <Box
      sx={{
        width: "50%",
        display: "flex",
      }}
    >
      {tracks.map((track, index) => (
        <LocalTrack key={index} track={track as LocalVideoTrack} />
      ))}
    </Box>
  );
};
