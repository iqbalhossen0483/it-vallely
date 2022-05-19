import { Collection, Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDb } from "../../../util/mongodb/mongodb";
import { postOrder } from "../../../util/order/postOrder";

const client = connectToDb();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  (await client).connect();
  const database: Db = (await client).db("it-vallely");
  const orders: Collection<Document> = database.collection("orders");

  switch (req.method) {
    case "GET":
      // getProduct(req, res, products);
      break;

    case "POST":
      postOrder(req, res, orders);
      break;

    default:
      res.status(404).send({ message: "not found" });
      break;
  }
}
