import { Collection, Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getOrder } from "../../../util/order/getOrder";
import { postOrder } from "../../../util/order/postOrder";
import { dbConnection } from "../../../util/services/dbConnection";
import { updateOrder } from "../../../util/order/updateOrder";
import { deleteOrder } from "../../../util/order/deleteOrder";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const database: Db = await dbConnection();
  const orders: Collection<Document> = database.collection("orders");
  const products: Collection<Document> = database.collection("products");

  switch (req.method) {
    case "GET":
      getOrder(req, res, orders);
      break;

    case "POST":
      postOrder(req, res, orders, products);
      break;

    case "PUT":
      updateOrder(req, res, orders);
      break;

    case "DELETE":
      deleteOrder(req, res, orders);
      break;

    default:
      res.status(404).send({ message: "not found" });
      break;
  }
}
