import { gql } from '@apollo/client';

export const saveBook = gql`
  mutation saveBook($id: String!, $title: String!) {
    saveBook(id: $String, title: $String) {
      id
      title
    }
  }
`;

export const deleteBook = gql`
  mutation deleteBook($id: String!, $title: String!) {
    deleteBook(id: $String, title: $String) {
      id
      title
    }
  }
`;

export const createUser = gql`
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


export const loginUser = gql`
  mutation loginUser($id: String!, $password: String!) {
    loginUser(id: $String, password: $String) {
      id
      password
    }
  }
`;


