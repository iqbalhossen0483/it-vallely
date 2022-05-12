import { Collection, Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDb } from "../../../util/mongodb/mongodb";
import { addProduct } from "../../../util/product/addProduct/addProduct";
import { getProduct } from "../../../util/product/getProduct/getProduct";
import { notFound } from "../../../util/shared/notFound";

const client = connectToDb();
export const config = {
  api: { bodyParser: false },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  (await client).connect();
  const database: Db = (await client).db("it-vallely");
  const products: Collection<Document> = database.collection("products");

  switch (req.method) {
    case "GET":
      getProduct(req, res, products);
      break;

    case "POST":
      addProduct(req, res, products);
      break;

    default:
      notFound(req, res);
      break;
  }
}
