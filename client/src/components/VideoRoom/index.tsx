import React, { ForwardedRef, forwardRef, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { RemoteParticipant, Room } from "twilio-video";
import { LocalVideoParticipant } from "../LocalVideoParticipant";
import { RemoteVideoParticipant } from "../RemoteVideoParticipant";

interface Props {
  room: Room;
}

/**
 * twilio-video/Video Room
 */
export const VideoRoom = forwardRef(
  ({ room }: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const [remoteParticipant, setRemoteParticipant] = useState(
      Array.from(room.participants.values() ?? [])
    );

    useEffect(() => {
      if (room) {
        const participantConnected = (participant: RemoteParticipant) =>
          setRemoteParticipant((prevParticipants) => [
            ...prevParticipants,
            participant,
          ]);

        const participantDisconnected = (participant: RemoteParticipant) =>
          setRemoteParticipant((prevParticipants) =>
            prevParticipants.filter((p) => p !== participant)
          );

        room.on("participantConnected", participantConnected);
        room.on("participantDisconnected", participantDisconnected);
        return () => {
          room.off("participantConnected", participantConnected);
          room.off("participantDisconnected", participantDisconnected);
        };
      }
    }, [room]);

    return (
      <Box sx={{ width: "100%", display: "flex", gap: 2, mx: "auto" }}>
        <LocalVideoParticipant participant={room.localParticipant} />
        {remoteParticipant.map((participant, index) => (
          <RemoteVideoParticipant key={index} participant={participant} />
        ))}
        <div ref={ref} />
      </Box>
    );
  }
);

VideoRoom.displayName = "VideoRoom";
