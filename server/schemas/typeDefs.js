const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Category {
    _id: ID
    name: String
}

type Item {
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
    items: [Item]
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

type Auth {
    token: ID
    user: User
}

type Query {
    user: User
    categories: [Category]
    items: [Item]
    item(category: ID!): Item
    order(_id: ID!): Order
    checkout(items: [ID]!): Checkout
    allUsers: [User]
}

type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String, avatar: String): User
    login(email: String!, password: String!): Auth
    addOrder(items: [ID]!): Order
    updateItem(_id: ID!, quantity: Int!): [Item]
    removeOrder(_id: ID!): Order
    addFriend(friendId: ID!): User
    removeFriend(friendId: ID!): User
}

`;

module.exports = typeDefs;