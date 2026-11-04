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


module.exports = {
    connectToDatabase,
    // Other database functions will go here
};