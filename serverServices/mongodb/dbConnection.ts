import { Db, MongoClient } from "mongodb";

export async function dbConnection() {
  try {
    const uri = `mongodb+srv://${process.env.BD_USER}:${process.env.BD_PASS}@cluster0.wewoq.mongodb.net/?retryWrites=true&w=majority`;
    // const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);
    await client.connect();
    const database: Db = client.db("IT_VALLELY");
    return { database };
  } catch (error) {
    return { database: null };
  }
}
