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
  const ref = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (el !== null) {
      track.attach(el);
    }

    return () => {
      if (el !== null) {
        track.detach(el);
        el.srcObject = null;
      }
    };
  }, [track]);

  return <video ref={ref} />;
};
