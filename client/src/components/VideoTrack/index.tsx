import React, { useLayoutEffect, useRef } from "react";
import { IVideoTrack } from "../../types";

interface Props {
  /**
   * twilio-video TrackProps
   */
  track: IVideoTrack;
}

/**
 * twilio-video Track コンポーネント
 */
export const VideoTrack = ({ track }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (el !== null) {
      const child = track.attach();
      el.classList.add(track.kind);
      el.appendChild(child);
    }
  }, [track]);

  return <div ref={ref} />;
};
