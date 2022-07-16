import React, { useCallback, useLayoutEffect, useState } from "react";
import { LocalParticipant as LocalParticipantProps } from "twilio-video";
import { IVideoTrack } from "../../types";

interface Props {
  participant: LocalParticipantProps;
}

/**
 * twilio-video LocalParticipant
 */
export const LocalParticipant = ({ participant }: Props) => {
  const existingPublications = Array.from(participant.tracks.values());
  const existingTracks = existingPublications.map(
    (publication) => publication.track
  );
  const nonNullTracks = existingTracks.filter((track) => track !== null);

  const [tracks, setTracks] = useState<IVideoTrack[]>([]);

  const addTrack = useCallback((track: IVideoTrack) => {
    setTracks((prevTrack) => [...prevTrack, track]);
  }, []);

  useLayoutEffect(() => {
    participant.on("trackSubscribed", (track) => addTrack(track));
  }, [participant, addTrack]);

  return <div>index</div>;
};
