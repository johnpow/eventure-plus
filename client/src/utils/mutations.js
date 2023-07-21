import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const ADD_EVENT = gql` 
mutation AddEvent($eventText: String!, $eventTitle: String!, $eventDate: String!, $eventLocation: String!, $eventCategory: String!) {
  addEvent(eventText: $eventText, eventTitle: $eventTitle, eventDate: $eventDate, eventLocation: $eventLocation, eventCategory: $eventCategory) {
    _id
    createdAt
    eventAuthor
    eventCategory
    eventDate
    eventLocation
    eventText
    eventTitle
  }
}`;

export const UPDATE_EVENT = gql`
mutation UpdateEvent($eventId: ID!, $eventText: String!, $eventTitle: String!, $eventDate: String!, $eventLocation: String!, $eventCategory: String!) {
  updateEvent(eventId: $eventId, eventText: $eventText, eventTitle: $eventTitle, eventDate: $eventDate, eventLocation: $eventLocation, eventCategory: $eventCategory) {
    _id
    eventTitle
    eventText
    eventAuthor
    eventLocation
    eventDate
    eventCategory
    signups {
      _id
      username
    }
  }
}`;

export const REMOVE_EVENT = gql`
mutation RemoveEvent($eventId: ID!) {
  removeEvent(eventId: $eventId) {
    eventTitle
    eventText
  }
}`;

export const ADD_SIGNUP = gql`
mutation AddSignup($eventId: ID!) {
  addSignup(eventId: $eventId) {
    _id
  }
  }`;

export const REMOVE_SIGNUP = gql`
mutation RemoveSignup($eventId: ID!) {
  removeSignup(eventId: $eventId) {
    _id
    eventTitle
    signups {
      _id
    }
  }
  }`;

export const ADD_EVENT_COMMENT = gql`
  mutation AddEventComment($eventId: ID!, $commentText: String!) {
    addEventComment(eventId: $eventId, commentText: $commentText) {
      _id
      eventTitle
      comments {
        commentText
        commentAuthor
        createdAt
        _id
      }
    }
  }`;