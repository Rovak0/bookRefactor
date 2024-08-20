//just getMe
import { gql } from '@apollo/client';

export const GET_ME = gql`
  query getMe {
    tech {
      id
    }
  }
`;