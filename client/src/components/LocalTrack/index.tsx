import React, { memo, useEffect, useRef } from "react";
import { LocalVideoTrack } from "twilio-video";

interface Props {
  track: LocalVideoTrack;
}

/**
 * twilio-video/localのtrackを扱う
 */
export const LocalTrack = memo(({ track }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const child = track.attach();
  child.style.borderRadius = "35px";

  useEffect(() => {
    ref.current?.appendChild(child);
  }, [ref, track, child]);

  return <div ref={ref} />;
});

LocalTrack.displayName = "LocalTrack";
