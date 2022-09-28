//seeds.js
const db = require('../config/connection');
const { Wine, User } = require('../models');
const wineSeeds = require('./wineSeeds.json');
const userSeeds = require('./userSeeds.json');

db.once('open', async () => {
  try {
    await Wine.deleteMany({});
    await User.deleteMany({});
    await Wine.create(wineSeeds);
    await User.create(userSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});