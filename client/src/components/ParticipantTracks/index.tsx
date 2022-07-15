import React from "react";
import { Participant } from "twilio-video";
import usePublications from "../../pages/hooks/twilio-video/usePublications";
import { Publication } from "../Publication";

interface ParticipantTracksProps {
  participant: Participant;
}

/**
 * twilio-video ParticipantTrack
 */
export const ParticipantTracks = ({ participant }: ParticipantTracksProps) => {
  const publications = usePublications(participant);

  const filteredPublications = publications.filter(
    (p) => p.trackName.includes("screen") || p.kind !== "video"
  );

  return (
    <>
      {filteredPublications.map((publication) => (
        <Publication
          key={publication.kind}
          publication={publication}
          participant={participant}
        />
      ))}
    </>
  );
};
