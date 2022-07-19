import React, { useEffect, useRef } from "react";
import { RemoteVideoTrack } from "twilio-video";

interface Props {
  track: RemoteVideoTrack;
}

/**
 * twilio-video/localのtrackを扱う
 */
export const RemoteTrack = ({ track }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const child = track.attach();

  useEffect(() => {
    ref.current?.classList.add(track.kind);
    ref.current?.appendChild(child);
  }, [ref, track, child]);

  return <div ref={ref} />;
};
