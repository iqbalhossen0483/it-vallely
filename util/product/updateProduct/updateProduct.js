import { ObjectId } from "mongodb";
import { serverError } from "../../serverError";

export async function updateProdut(req, res, product) {
  try {
    const { id, multiple } = req.query;
    if (!multiple) {
      const result = await product.updateOne({ _id: ObjectId(id) }, req.body);
      res.status(200).send(result);
    }
  } catch (error) {
    serverError(res);
  }
}
