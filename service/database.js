const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('diceDuel');
const userCollection = db.collection('users');
const scoreCollection = db.collection('scores');

async function connectToDatabase() {
    await client.connect();
    await db.command({ ping: 1 });
    console.log('Connected to MongoDB');
}

function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ username: user.username }, { $set: user });
}

async function updateUserRemoveAuth(user) {
    await userCollection.updateOne(
        { username: user.username },
        { $unset: { token: 1 } }
    );
}

module.exports = {
    connectToDatabase,
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    updateUserRemoveAuth
};