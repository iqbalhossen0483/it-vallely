import { deleteProduct } from "../../../util/product/deleteProduct/deleteProduct";
import { updateProduct } from "../../../util/product/updateProduct/updateProduct";
import { addProduct } from "../../../util/product/addProduct/addProduct";
import { getProduct } from "../../../util/product/getProduct/getProduct";
import { dbConnection } from "../../../util/services/dbConnection";
import { NextApiRequest, NextApiResponse } from "next";
import { Collection } from "mongodb";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const database = await dbConnection();
  const products: Collection<Document> = database.collection("products");

  switch (req.method) {
    case "GET":
      getProduct(req, res, products);
      break;

    case "POST":
      addProduct(req, res, products);
      break;

    case "PUT":
      updateProduct(req, res, products);
      break;

    case "DELETE":
      deleteProduct(req, res, products);
      break;

    default:
      res.status(404).send({ message: "not found" });
      break;
  }
}
