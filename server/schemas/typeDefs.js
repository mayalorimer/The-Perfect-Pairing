// typeDefs.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    wines: [Wine]
  }
  type Wine {
    _id: ID!
    name: String!
    vineyard: String!
    year: Int!
    varietal: String
    price: Int!
    type: String!
    blurb: String
    pairings: [Pairing]!
  }

  type Pairing {
    _id: ID!
    pairingName: String
    pairingDescription: String
    pairingCategory: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    getWine(type: String, minPrice: Int, maxPrice: Int): [Wine]
    # adjust query to get all wines based on a certain type of pairing
    # returns an array of wines that have a pairing under the category
    getPairing(pairingCategory: String!): [Wine]
    getOneWine(wineID: ID!): Wine 
    wines: [Wine]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createWine(name: String!, vineyard: String!, year: Int!, varietal: String, price: Int!, type: String!, blurb: String): Wine
    # add pairing to a wine
    addPairing(wineId: ID!, pairingName: String!, pairingDescription: String!, pairingCategory: String!): Wine
    removeWine(name: String!, vineyard: String!, year: Int!, varietal: String, price: Int!, type: String!, blurb: String): Wine
  }
`;

module.exports = typeDefs;