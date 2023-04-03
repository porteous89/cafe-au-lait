const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    price: Float
    quantity: Int
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type Checkout {
    session: ID
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    avatar: String
    orders: [Order]
  }

  type Seat {
    user: User
    index: Int
  }

  type Message {
    _id: ID
    from: User
    table: VirtualTable
    date: String
    message: String
  }

  type VirtualTable {
    _id: ID
    name: String
    description: String
    capacity: Int
    seats: [Seat]
    attendants: [User]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    order(_id: ID!): Order
    checkout(items: [ID]!): Checkout
    allUsers: [User]
    allTables: [VirtualTable]
    table(_id: ID!): VirtualTable
    allMessages(tableId: ID): [Message]
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
      avatar: String
    ): User
    login(email: String!, password: String!): Auth
    addOrder(items: [ID]!): Order
    updateProduct(_id: ID!, quantity: Int!): Product
    removeOrder(_id: ID!): Order
    addFriend(friendId: ID!): User
    removeFriend(friendId: ID!): User
    joinTable(tableId: ID!, index: Int!): VirtualTable
    leaveTable(tableId: ID!): VirtualTable
    addMessage(message: String!, tableId: ID!): Message
  }

  type Subscription {
    newMessage: Message
    userJoined: Seat
    userLeaved: Seat
  }
`;

module.exports = typeDefs;

