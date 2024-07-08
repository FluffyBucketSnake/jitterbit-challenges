import { MongoClient } from "mongodb";

const { MONGO_CONNECTION_URL, MONGO_DB } = process.env;

export async function withDB(cb) {
  let client = null;
  try {
    client = await MongoClient.connect(MONGO_CONNECTION_URL);
    const db = client.db(MONGO_DB);
    return await cb(db);
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
