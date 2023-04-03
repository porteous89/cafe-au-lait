import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $firstName: String
    $lastName: String
    $email: String
    $password: String
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      _id
      firstName
      lastName
      email
    }
  }
`;

export const JOIN_TABLE = gql`
  mutation joinTable($tableId: ID!, $index: Int!) {
    joinTable(tableId: $tableId, index: $index) {
      _id
      name
      description
      capacity
      seats {
        user {
          _id
        }
        index
      }
      attendants {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const LEAVE_TABLE = gql`
  mutation leaveTable($tableId: ID!) {
    leaveTable(tableId: $tableId) {
      _id
      name
      description
      capacity
      attendants {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($tableId: ID!, $message: String!) {
    addMessage(tableId: $tableId, message: $message) {
      _id
      message
      from {
        _id
        firstName
        lastName
        avatar
      }
      table {
        _id
      }
      date
    }
  }
`;

export const NEW_MESSAGE = gql`
  subscription OnNewMessage($message: MESSAGE) {
    newMessage(message: $message) {
      _id
      message
      from {
        _id
        firstName
        lastName
        avatar
      }
      table {
        _id
      }
      date
    }
  }
`;
