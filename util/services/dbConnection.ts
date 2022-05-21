import { Db } from "mongodb";
import { connectToDb } from "../mongodb/mongodb";

export async function dbConnection() {
  const client = connectToDb();
  (await client).connect();
  const database: Db = (await client).db("it-vallely");
  return database;
}
