require('dotenv').config({ path: "../.env.development" })
// db.js

const { MongoClient } = require('mongodb');

const mongoURI = process.env.DBURL;
const dbName = 'Events';

const client = new MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDB() {
  try {
    await client.connect();
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

function getDB() {
  return client.db(dbName);
}

module.exports = { connectToDB, getDB };
