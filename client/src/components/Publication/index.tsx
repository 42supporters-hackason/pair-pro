import React from "react";
import {
  LocalTrackPublication,
  Participant,
  RemoteTrackPublication,
} from "twilio-video";
import useTrack from "../../pages/hooks/twilio-video/useTrack";
import { IVideoTrack } from "../../types";
import { VideoTrack } from "../VideoTrack";

interface PublicationProps {
  publication: LocalTrackPublication | RemoteTrackPublication;
  participant: Participant;
}

/**
 * twilio-video Publicationコンポーネント
 */
export const Publication = ({ publication }: PublicationProps) => {
  const track = useTrack(publication);

  if (track === null) {
    return null;
  }

  return <VideoTrack track={track as IVideoTrack} />;
};
