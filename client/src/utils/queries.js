//just getMe
import { gql } from '@apollo/client';

export const GET_ME = gql`
  query getMe {
      user 
    }
`;
// ($_id: String!) {
//   user(_id: $_id){
//     _id
//     username
//     email
//     savedBooks
//   }
// }