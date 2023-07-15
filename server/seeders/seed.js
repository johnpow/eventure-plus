const db = require('../config/connection');
const { User, Thought, Event } = require('../models');
const userSeeds = require('./userSeeds.json');
const thoughtSeeds = require('./thoughtSeeds.json');
const eventsSeeds = require('./eventsSeeds.json');

db.once('open', async () => {
  try {
    await Event.deleteMany({});
    await Thought.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < thoughtSeeds.length; i++) {
      const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: thoughtAuthor },
        {
          $addToSet: {
            thoughts: _id,
          },
        }
      );
    }
    for (let i = 0; i < eventsSeeds.length; i++) {
      const { _id, eventAuthor } = await Event.create(eventsSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: eventAuthor },
        {
          $addToSet: {
            events: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
