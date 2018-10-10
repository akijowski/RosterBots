const mongoose = require('mongoose');

const DB_STAGE = 'ds125453.mlab.com:25453/rosterbots';
const DB_TEST = 'ds059165.mlab.com:59165/rosterbot_test';

const DB_USER = process.env.DB_USER || process.env.npm_package_config_db_user;
const DB_PWD = process.env.DB_PWD || process.env.npm_package_config_db_pwd;

const DB_URI = `mongodb://${DB_USER}:${DB_PWD}@${process.env.TEST ? DB_TEST : DB_STAGE}`;

function connectToDb() {
  mongoose.connect(DB_URI, { useNewUrlParser: true });
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.on('connected', () => {
    if (!process.env.TEST) {
      console.log('Mongoose connection open');
    }
  });
  db.on('disconnected', () => {
    console.log('\nMongoose disconnected');
  });
  process.on('SIGINT', () => {
    db.close(() => {
      console.log('Closed Mongoose because of SIGINT');
      process.exit(0);
    })
  })

  return db;
}

module.exports = { connectToDb }