import React, { useEffect, useRef } from "react";
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
    child.style.width = "50%";
    child.style.borderRadius = "9px";
    ref.current?.appendChild(child);
  }, [track]);

  return <div ref={ref} />;
};
