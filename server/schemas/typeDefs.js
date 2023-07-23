const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    thoughts: [Thought]!
    events: [Event]!
    signups: [Event]!
    bio: String
    city: String
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Event {
    _id: ID
    eventText: String
    eventTitle: String
    eventAuthor: String
    eventDate: String

    eventState: String
    eventCity: String

    eventCategory: String
    comments: [Comment]!
    createdAt: String
    signups: [User]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    events: [Event]
    user(username: String!): User
    event(eventId: ID!): Event
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
    me: User
    getUserEvents: [Event]
    getUserSignups: [Event]  
    getEventSignups(eventId: ID!): [User] 
    getEventsByCategory(eventCategory: String!): [Event]
    getEventsByStateAndCity(eventState: String!, eventCity: String!): [Event]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String!, email: String!, bio: String!, city: String!): User
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
    addEvent(eventText: String!, eventTitle: String!, eventDate: String!, eventState: String!, eventCity: String!, eventCategory: String!): Event
    updateEvent(eventId: ID!, eventText: String!, eventTitle: String!, eventDate: String!, eventState: String!, eventCity: String!, eventCategory: String!): Event
    addEventComment(eventId: ID!, commentText: String!): Event
    removeEvent(eventId: ID!): Event
    removeEventComment(eventId: ID!, commentId: ID!): Event
    addSignup(eventId: ID!): Event
    removeSignup(eventId: ID!): Event
  
  }
`;

module.exports = typeDefs;
