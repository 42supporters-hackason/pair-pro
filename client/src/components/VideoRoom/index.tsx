import React, {
  ForwardedRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box } from "@mui/material";
import { LocalVideoTrack, RemoteParticipant, Room } from "twilio-video";
import { LocalVideoParticipant } from "../LocalVideoParticipant";
import { RemoteVideoParticipant } from "../RemoteVideoParticipant";

interface Props {
  room: Room;
  shareScreenTrack: LocalVideoTrack;
}

/**
 * twilio-video/Video Room
 */
export const VideoRoom = forwardRef(
  ({ room, shareScreenTrack }: Props, ref: ForwardedRef<HTMLDivElement>) => {
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
        focusedChild.style.width = "100%";
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
            onClick={() => {
              const newFocusedChild = shareScreenTrack.attach();
              setFocusedChild(newFocusedChild);
            }}
            ref={ref}
          />
        </Box>
        <Box
          sx={{
            width: "80%",
            display: "flex",
            mx: "auto",
          }}
          ref={focusedRef}
        ></Box>
      </>
    );
  }
);

VideoRoom.displayName = "VideoRoom";
