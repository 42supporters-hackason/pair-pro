import { gql } from "@apollo/client";

export const FETCH_SKILLS = gql`
  query fetchSkills {
    skills {
      id
      name
    }
  }
`;
