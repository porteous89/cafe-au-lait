import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      image
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      email
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;

export const QUERY_ALL_TABLES = gql`
  query allTables {
    allTables {
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
        avatar
      }
    }
  }
`;

export const QUERY_SINGLE_TABLE = gql`
  query table($tableId: ID!) {
    table(_id: $tableId) {
      _id
      name
      description
      capacity
      attendants {
        _id
        firstName
        lastName
        avatar
      }
    }
  }
`;

export const QUERY_MESSAGES = gql`
  query allMessages($tableId: ID) {
    allMessages(tableId: $tableId) {
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