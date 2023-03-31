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
}

type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String, avatar: String): User
    login(email: String!, password: String!): Auth
    addOrder(items: [ID]!): Order
    updateProduct(_id: ID!, quantity: Int!): Product
    removeOrder(_id: ID!): Order
    addFriend(friendId: ID!): User
    removeFriend(friendId: ID!): User
}

`;

module.exports = typeDefs;

