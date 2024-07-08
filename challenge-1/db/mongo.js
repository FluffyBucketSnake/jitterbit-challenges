import { MongoClient } from "mongodb";

const MONGODB_URL = "mongodb://localhost:27017/";
const MONGODB_DB = "jitterbit-challenge-1";

export async function withDB(cb) {
  let client = null;
  try {
    client = await MongoClient.connect(MONGODB_URL);
    const db = client.db(MONGODB_DB);
    return cb(db);
  } finally {
    await client?.close();
  }
}

export async function withCollection(collectionName, cb) {
  return withDB((db) => {
    const collection = db.collection(collectionName);
    return cb(collection);
  });
}

export const withOrders = withCollection.bind(null, "orders");
