import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { LocalVideoTrack } from "twilio-video";

interface Props {
  track: LocalVideoTrack;
  setFocusedChild: React.Dispatch<
    React.SetStateAction<HTMLVideoElement | null>
  >;
}

/**
 * twilio-video/localのtrackを扱う
 */
export const LocalTrack = ({ track, setFocusedChild }: Props) => {
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
        setFocusedChild(child);
      }}
      ref={ref}
    />
  );
};

LocalTrack.displayName = "LocalTrack";
