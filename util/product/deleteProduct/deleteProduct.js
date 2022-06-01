import { ObjectId } from "mongodb";
import { serverError } from "../../serverError";

export async function deleteProduct(req, res, product) {
  try {
    const result = await product.deleteOne({ _id: ObjectId(req.headers.id) });
    res.status(200).send(result);
  } catch (error) {
    serverError(res);
  }
}
