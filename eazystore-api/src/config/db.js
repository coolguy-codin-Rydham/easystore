const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const env = require('./env');

let memoryServer = null;

async function connect() {
  let uri = env.mongo.url;
  if (!uri) {
    const dbPath = path.resolve(env.mongo.dbPath);
    fs.mkdirSync(dbPath, { recursive: true });
    memoryServer = await MongoMemoryServer.create({
      instance: { dbPath, storageEngine: 'wiredTiger' },
    });
    uri = memoryServer.getUri();
    console.log(`[db] using mongodb-memory-server, dbPath=${dbPath}`);
  } else {
    console.log(`[db] using external mongo at ${uri}`);
  }
  await mongoose.connect(uri);
  console.log('[db] connected');
}

async function disconnect() {
  await mongoose.disconnect();
  if (memoryServer) await memoryServer.stop();
}

module.exports = { connect, disconnect };
