import { Collection, Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { postOrder } from "../../../util/order/postOrder";
import { dbConnection } from "../../../util/services/dbConnection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const database: Db = await dbConnection();
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
