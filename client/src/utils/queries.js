import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
      events {
        _id
        eventText
        eventTitle
      }
      signups {
        _id
        eventTitle
        }
      bio
      city
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
      events {
        _id
        eventText
        eventTitle
      }
      signups {
        _id
        eventTitle
      }
      bio
      city
    }
  }
`;

export const QUERY_EVENTS = gql`
  query getEvents {
    events {
      _id
      createdAt
      eventAuthor
      eventCategory
      eventDate
      eventLocation
      eventText
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

export const MY_EVENTS = gql`
query GetUserEvents {
  getUserEvents {
    _id
    eventAuthor
    eventText
    eventCategory
    eventDate
    eventLocation
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

export const QUERY_USER_SIGNUPS = gql`
query GetUserSignups {
  getUserSignups {
    eventText
    eventTitle
    _id
    comments {
      _id
      commentAuthor
      commentText
      createdAt
    }
    createdAt
    eventAuthor
    eventCategory
    eventDate
    eventLocation
    signups {
      username
    }
  }
}`;

export const QUERY_EVENTS_BY_CATEGORY = gql`
query GetEventsByCategory($eventCategory: String!) {
  getEventsByCategory(eventCategory: $eventCategory) {
    eventText
    eventTitle
    _id
    comments {
      _id
      commentAuthor
      commentText
      createdAt
    }
    createdAt
    eventAuthor
    eventCategory
    eventDate
    eventLocation
    signups {
      username
    }
  }
}`;