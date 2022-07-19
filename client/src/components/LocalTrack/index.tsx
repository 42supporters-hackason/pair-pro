import React, { useEffect, useRef } from "react";
import { LocalVideoTrack } from "twilio-video";

interface Props {
  track: LocalVideoTrack;
}

/**
 * twilio-video/localのtrackを扱う
 */
export const LocalTrack = ({ track }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.appendChild(track.attach());
    ref.current?.classList.add(track.kind);
  }, [ref, track]);

  return <div ref={ref} />;
};
