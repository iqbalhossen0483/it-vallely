import { ObjectId } from "mongodb";
import { serverError } from "../serverError";

export async function deleteOrder(req, res, order) {
  try {
    const result = await order.deleteOne({ _id: ObjectId(req.headers.id) });
    res.send(result);
  } catch (error) {
    serverError(res);
  }
}
