import { gql } from "@apollo/client";

export const FETCH_SKILLS = gql`
  query fetchSkills {
    skills {
      id
      name
    }
  }
`;

export const GET_VIDEO_ACCESS_TOKEN = gql`
  query getVideoAccessToken($identity: String!, $room: String!) {
    accessToken(identity: $identity, room: $room) {
      accessToken
    }
  }
`;
