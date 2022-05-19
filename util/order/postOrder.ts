import { Collection } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export async function postOrder(
  req: NextApiRequest,
  res: NextApiResponse,
  orders: Collection<Document>
) {
  try {
    const result = await orders.insertOne(req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Interner error, Please try again" });
  }
}
