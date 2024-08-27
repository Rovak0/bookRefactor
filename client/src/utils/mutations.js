import { gql } from '@apollo/client';

export const SAVE_BOOK  = gql`
  mutation saveBook($id: String!, $bookId: String!) {
    saveBook(id: $id, bookId: $bookId)
  }
`;

export const REMOVE_BOOK  = gql`
  mutation deleteBook($id: String!, $bookId: String!) {
    deleteBook(id: $id, bookId: $bookId) {
      id
      bookId
    }
  }
`;

export const ADD_USER  = gql`
  mutation createUser(
    $username : String!
    $email : String!
    $password : String!
    ) {
      createUser(
          username : $username
          email : $email
          password : $password
        ) {
          token
          user{
            username
            email
            password
          }  
        }
  }
`


export const LOGIN_USER  = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $String, password: $String) {
      email
      password
    }
  }
`;


