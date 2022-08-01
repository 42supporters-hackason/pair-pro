import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { RemoteVideoTrack } from "twilio-video";

interface Props {
  track: RemoteVideoTrack;
}

/**
 * twilio-video/remoteのtrackを扱う
 */
export const RemoteTrack = ({ track }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const child = track.attach();

  useEffect(() => {
    child.style.width = "100%";
    child.style.borderRadius = "9px";
    ref.current?.appendChild(child);
  }, [track]);

  return <Box ref={ref} />;
};
