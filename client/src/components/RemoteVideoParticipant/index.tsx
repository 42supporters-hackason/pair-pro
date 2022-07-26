import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  RemoteParticipant,
  RemoteVideoTrack,
  RemoteTrack as RemoteTrackType,
} from "twilio-video";
import { RemoteTrack } from "../RemoteTrack";

interface Props {
  participant: RemoteParticipant;
}

/**
 * twilio-video/local participant
 */
export const RemoteVideoParticipant = ({ participant }: Props) => {
  const [tracks, setTracks] = useState<RemoteTrackType[]>([]);

  useEffect(() => {
    const subscribedTracks = Array.from(participant.tracks.values())
      .filter((trackPublication) => trackPublication.track !== null)
      .map((trackPublication) => trackPublication.track!);

    setTracks(subscribedTracks);

    const handleTrackSubscribed = (track: RemoteTrackType) =>
      setTracks((prevTracks) => [...prevTracks, track]);
    const handleTrackUnsubscribed = (track: RemoteTrackType) =>
      setTracks((prevTracks) => prevTracks.filter((t) => t !== track));

    participant.on("trackSubscribed", handleTrackSubscribed);
    participant.on("trackUnsubscribed", handleTrackUnsubscribed);
    return () => {
      participant.off("trackSubscribed", handleTrackSubscribed);
      participant.off("trackUnsubscribed", handleTrackUnsubscribed);
    };
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

// ・appendChild消しては？表示多い問題、.onのやつ.offもセットで
