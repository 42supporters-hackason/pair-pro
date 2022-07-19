import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { RemoteParticipant, RemoteVideoTrack } from "twilio-video";
import { RemoteTrack } from "../RemoteTrack";

interface Props {
  participant: RemoteParticipant;
}

/**
 * twilio-video/local participant
 */
export const RemoteVideoParticipant = ({ participant }: Props) => {
  const initialTracks = Array.from(participant.tracks.values())
    .map((publication) => publication.track)
    .filter((track) => track !== null);
  const [tracks, setTracks] = useState(initialTracks);

  useEffect(() => {
    participant.on("trackSubscribed", (track) =>
      setTracks((prev) => [...prev, track])
    );
  }, [participant]);

  return (
    <Box
      sx={{
        width: "50%",
        display: "flex",
      }}
    >
      {tracks.map((track, index) => (
        <RemoteTrack key={index} track={track as RemoteVideoTrack} />
      ))}
    </Box>
  );
};
