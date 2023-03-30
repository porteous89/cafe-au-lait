import { gql } from '@apollo/client';

export const QUERY_ITEMS = gql`
  query getItems($category: ID) {
    items(category: $category) {
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
  query getCheckout($items: [ID]!) {
    checkout(products: $items) {
      session
    }
  }
`;

export const QUERY_ITEM = gql`
  {
    items {
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
      orders {
        _id
        purchaseDate
        items {
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
