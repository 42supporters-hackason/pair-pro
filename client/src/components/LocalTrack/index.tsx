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

  useEffect(() => {
    child.style.width = "50%";
    child.style.borderRadius = "9px";
    ref.current?.appendChild(child);
  }, [track]);

  return <div ref={ref} />;
});

LocalTrack.displayName = "LocalTrack";
