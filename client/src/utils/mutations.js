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
mutation AddEvent($eventText: String!, $eventTitle: String!, $eventDate: String!, $eventState: String!, $eventCity: String!, $eventCategory: String!) {
  addEvent(eventText: $eventText, eventTitle: $eventTitle, eventDate: $eventDate, eventState: $eventState, eventCity: $eventCity, eventCategory: $eventCategory) {
    _id
    eventAuthor
    eventText
    eventCategory
    eventDate
    eventState
    eventCity
    eventTitle
    signups {
      _id
      username
    }
    comments {
      _id
      commentText
      commentAuthor
      createdAt
    }
  }
}`;

export const UPDATE_EVENT = gql`
mutation UpdateEvent($eventId: ID!, $eventText: String!, $eventTitle: String!, $eventDate: String!, $eventState: String!, $eventCity: String! $eventCategory: String!) {
  updateEvent(eventId: $eventId, eventText: $eventText, eventTitle: $eventTitle, eventDate: $eventDate, eventState: $eventState, eventCity: $eventCity, eventCategory: $eventCategory) {
    _id
    eventTitle
    eventText
    eventAuthor
    eventState
    eventCity
    eventDate
    eventCategory
    signups {
      _id
      username
    }
    comments {
      _id
      commentAuthor
      commentText
      createdAt
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
    eventAuthor
    eventText
    eventCategory
    eventDate
    eventState
    eventCity
    eventTitle
    signups {
      _id
      username
    }
    comments {
      _id
      commentText
      commentAuthor
      createdAt
    }
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

  export const REMOVE_EVENT_COMMENT = gql`
  mutation RemoveEventComment($eventId: ID!, $commentId: ID!) {
    removeEventComment(eventId: $eventId, commentId: $commentId) {
      _id
      eventTitle
      comments {
        _id
        commentText
      }
    }
  }`;

export const UPDATE_USER = gql`
mutation UpdateUser($username: String!, $email: String!, $bio: String!, $city: String!) {
  updateUser(username: $username, email: $email, bio: $bio, city: $city) {
    username
    email
    bio
    city
  }
}`;