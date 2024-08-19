//just getMe
import { gql } from '@apollo/client';

export const getMe = gql`
  query getMe {
    tech {
      id
    }
  }
`;