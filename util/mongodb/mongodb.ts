import { MongoClient } from "mongodb";

export async function connectToDb(): Promise<MongoClient> {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  return client;
}
