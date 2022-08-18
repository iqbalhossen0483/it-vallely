import { Collection, Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getOrder } from "../../../serverServices/order/getOrder";
import { postOrder } from "../../../serverServices/order/postOrder";
import { dbConnection } from "../../../serverServices/mongodb/dbConnection";
import { updateOrder } from "../../../serverServices/order/updateOrder";
import { deleteOrder } from "../../../serverServices/order/deleteOrder";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { database } = await dbConnection();
  if (!database) {
    res.status(500).send({ message: "Serverside error" });
    return;
  } else {
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
}
