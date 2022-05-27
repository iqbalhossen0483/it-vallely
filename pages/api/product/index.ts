import { Collection, Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { addProduct } from "../../../util/product/addProduct/addProduct";
import { getProduct } from "../../../util/product/getProduct/getProduct";
import { updateProdut } from "../../../util/product/updateProduct/updateProduct";
import { dbConnection } from "../../../util/services/dbConnection";

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
      updateProdut(req, res, products);
      break;

    default:
      res.status(404).send({ message: "not found" });
      break;
  }
}
