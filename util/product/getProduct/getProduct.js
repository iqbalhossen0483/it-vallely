import { serverError } from "../../serverError";

export async function getProduct(req, res, products) {
  try {
    const result = await products.find({}).toArray();
    res.status(200).send(result);
  } catch (error) {
    serverError(res);
  }
}
