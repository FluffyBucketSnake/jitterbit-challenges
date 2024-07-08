import { MongoClient } from "mongodb";

const MONGODB_URL = "mongodb://localhost:27017/";
const MONGODB_DB = "jitterbit-challenge-1";

export async function connectToDB(cb) {
  let client = null;
  try {
    client = await MongoClient.connect(MONGODB_URL);
    const db = client.db(MONGODB_DB);
    return cb(db);
  } finally {
    await client?.close();
  }
}
