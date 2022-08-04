import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { RemoteVideoTrack } from "twilio-video";

interface Props {
  track: RemoteVideoTrack;
  setFocusedChild: React.Dispatch<
    React.SetStateAction<HTMLVideoElement | null>
  >;
}

/**
 * twilio-video/remoteのtrackを扱う
 */
export const RemoteTrack = ({ track, setFocusedChild }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const child = track.attach();

  useEffect(() => {
    child.style.width = "100%";
    child.style.borderRadius = "9px";
    ref.current?.appendChild(child);
  }, [track]);

  return (
    <Box
      sx={{ cursor: "pointer" }}
      onClick={() => {
        child.style.width = "100%";
        child.style.borderRadius = "9px";
        setFocusedChild(child);
      }}
      ref={ref}
    />
  );
};
