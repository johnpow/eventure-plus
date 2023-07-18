const { AuthenticationError } = require('apollo-server-express');
const { User, Thought, Event } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('thoughts');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('thoughts');
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { thoughtId }) => {
      return Thought.findOne({ _id: thoughtId });
    },
    events: async () => {
       return Event.find().populate('signups').populate('comments');
     },
    event: async (parent, { eventId }) => {
      return Event.findOne({ _id: eventId }).populate('comments').populate('signups');;
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    getUserSignups: async (parent, args, context) => {
      if (context.user) {
        // Retrieve the signups for the currently logged-in user
        const user = await User.findOne({ username: context.user.username }).populate('signups');
        return user.signups;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    getEventSignups: async (parent, { eventId }, context) => {
      if (context.user) {
        // Retrieve the signups for the specified event
        const event = await Event.findOne({ _id: eventId }).populate('signups');
        return event.signups;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addThought: async (parent, { thoughtText }, context) => {
      if (context.user) {
        const thought = await Thought.create({
          thoughtText,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { thoughts: thought._id } }
        );

        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { thoughtId, commentText }, context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeThought: async (parent, { thoughtId }, context) => {
      if (context.user) {
        const thought = await Thought.findOneAndDelete({
          _id: thoughtId,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { thoughts: thought._id } }
        );

        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { thoughtId, commentId }, context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addEvent: async (parent, { eventText, eventTitle, eventDate, eventLocation, eventCategory }, context) => {
      if (context.user) {
        const event = await Event.create({
          eventText,
          eventTitle,
          eventAuthor: context.user.username,
          eventDate,
          eventLocation,
          eventCategory,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { events: event._id } }
        );

        return event;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addSignup: async (parent, { eventId }, context) => {
      if (context.user) {
        // Update the Event model
        const updatedEvent = await Event.findOneAndUpdate(
          { _id: eventId },
          {
            $addToSet: {
              signups: context.user._id,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
    
        // Update the User model
        await User.findOneAndUpdate(
          { username: context.user.username },
          {
            $addToSet: {
              signups: updatedEvent._id,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
    
        return updatedEvent;
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },
    removeSignup: async (parent, { eventId }, context) => {
      if (context.user) {
        // Update the Event model
        const updatedEvent = await Event.findOneAndUpdate(
          { _id: eventId },
          {
            $pull: {
              signups: context.user.username,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
    
        // Update the User model
        await User.findOneAndUpdate(
          { username: context.user.username },
          {
            $pull: {
              signups: updatedEvent._id,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
    
        return updatedEvent;
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },
    
    addEventComment: async (parent, { eventId, commentText }, context) => {
      if (context.user) {
        return Event.findOneAndUpdate(
          { _id: eventId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeEvent: async (parent, { eventId }, context) => {
      if (context.user) {
        const event = await Event.findOneAndDelete({
          _id: eventId,
          eventAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { events: event._id } }
        );

        return event;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeEventComment: async (parent, { eventId, commentId }, context) => {
      if (context.user) {
        return Event.findOneAndUpdate(
          { _id: eventId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
