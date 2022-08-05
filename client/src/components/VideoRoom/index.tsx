import React, {
  ForwardedRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
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
    const focusedRef = useRef<HTMLDivElement>(null);
    const [focusedChild, setFocusedChild] = useState<HTMLVideoElement | null>(
      null
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

    useEffect(() => {
      if (focusedRef.current && focusedChild) {
        focusedRef.current.firstChild?.remove();
        focusedRef.current.appendChild(focusedChild);
      }
    }, [focusedRef, focusedChild]);

    return (
      <>
        <Box
          sx={{
            width: "20%",
            display: "flex",
            flexDirection: "column",
            mx: "auto",
          }}
        >
          <LocalVideoParticipant
            participant={room.localParticipant}
            setFocusedChild={setFocusedChild}
          />
          {remoteParticipant.map((participant, index) => (
            <RemoteVideoParticipant
              key={index}
              participant={participant}
              setFocusedChild={setFocusedChild}
            />
          ))}
          <Box
            sx={{ cursor: "pointer" }}
            onClick={() => setFocusedChild(child)}
            ref={ref}
          />
        </Box>
        <Box
          sx={{
            width: "80%",
            display: "flex",
            mx: "auto",
            backgroundColor: "green",
          }}
          ref={focusedRef}
        ></Box>
      </>
    );
  }
);

VideoRoom.displayName = "VideoRoom";
