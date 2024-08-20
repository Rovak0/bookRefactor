import { gql } from '@apollo/client';

export const SAVE_BOOK  = gql`
  mutation saveBook($id: String!, $title: String!) {
    saveBook(id: $String, title: $String) {
      id
      title
    }
  }
`;

export const REMOVE_BOOK  = gql`
  mutation deleteBook($id: String!, $title: String!) {
    deleteBook(id: $String, title: $String) {
      id
      title
    }
  }
`;

export const ADD_USER  = gql`
  mutation createUser(
            $id: String!,
            $username : String!
            $email : String!
            $password : String!) {
        createUser(id: $String,
            username : $String,
            email : $String,
            password : $String,) {
      id
      username
      email
      password
    }
  }
`


export const LOGIN_USER  = gql`
  mutation loginUser($id: String!, $password: String!) {
    loginUser(id: $String, password: $String) {
      id
      password
    }
  }
`;


