const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const eventSchema = new Schema({
    eventText: {
    type: String,
    required: 'You need to create an event!',
    minlength: 1,
    maxlength: 1000,
    trim: true,
  },
  eventTitle: {
    type: String,
    required: 'You need to create a title!',
    minlength: 1,
    maxlength: 140,
    trim: true,
  },
  eventAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  eventLocation: {
    type: String,
    required: true,
  },
  eventCategory: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
  signups: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

});

const Event = model('Event', eventSchema);

module.exports = Event;
