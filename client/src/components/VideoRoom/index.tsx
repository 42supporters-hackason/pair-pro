import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Room } from "twilio-video";
import { LocalVideoParticipant } from "../LocalVideoParticipant";
import { RemoteVideoParticipant } from "../RemoteVideoParticipant";

interface Props {
  room: Room;
}

/**
 * twilio-video/Video Room
 */
export const VideoRoom = ({ room }: Props) => {
  const [remoteParticipant, setRemoteParticipant] = useState(
    Array.from(room.participants.values())
  );

  useEffect(() => {
    room.on("participantConnected", (participant) =>
      setRemoteParticipant((prev) => [...prev, participant])
    );
    room.on("participantDisconnected", (participant) =>
      setRemoteParticipant((prev) =>
        prev.filter(({ identity }) => identity !== participant.identity)
      )
    );
  }, [room]);

  return (
    <Box sx={{ width: "100%", display: "flex", gap: 2, mx: "auto" }}>
      <LocalVideoParticipant participant={room.localParticipant} />
      {remoteParticipant.map((participant, index) => (
        <RemoteVideoParticipant key={index} participant={participant} />
      ))}
    </Box>
  );
};
