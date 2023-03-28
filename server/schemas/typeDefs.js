const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Category {
    _id: ID
    name: String
}

type Drinks {
    _id: ID
    name: String
    description: String
    image: String
    category: Category
    price: Float
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
    drinks: [Drinks]
    items: [Item]
    item(category: ID!): Item
    drink(category: ID!): Drinks
    order(_id: ID!): Order
    orders: [Order]
    checkout(items: [ID]!, drinks: [ID]!): Checkout
}

type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String, avatar: String): User
    login(email: String!, password: String!): Auth
    addOrder(items: [ID]!, drinks: [ID]!): Order
    updateOrder(_id: ID!, items: [ID]!, drinks: [ID]!): Order
    removeOrder(_id: ID!): Order
}

`;

module.exports = typeDefs;