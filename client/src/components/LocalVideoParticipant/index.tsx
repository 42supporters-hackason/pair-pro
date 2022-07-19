import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { LocalParticipant, LocalVideoTrack } from "twilio-video";
import { LocalTrack } from "../LocalTrack";

interface Props {
  participant: LocalParticipant;
}

/**
 * twilio-video/local participant
 */
export const LocalVideoParticipant = ({ participant }: Props) => {
  const tracks = useMemo(
    () =>
      Array.from(participant.tracks.values())
        .map((publication) => publication.track)
        .filter((track) => track !== null),
    [participant]
  );

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      {tracks.map((track, index) => (
        <LocalTrack key={index} track={track as LocalVideoTrack} />
      ))}
    </Box>
  );
};
