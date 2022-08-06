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
        const newFocusedChild = track.attach();
        newFocusedChild.style.width = "100%";
        setFocusedChild(newFocusedChild);
      }}
      ref={ref}
    />
  );
};

LocalTrack.displayName = "LocalTrack";
