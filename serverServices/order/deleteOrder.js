import { ObjectId } from "mongodb";
import { userVarification } from "../firebase-server/userVarification";
import { serverError } from "../serverError";

export async function deleteOrder(req, res, order) {
  try {
    const { error } = await userVarification(req);
    if (error) {
      return res.status(401).send({ message: "user authentication failed" });
    } else {
      const result = await order.deleteOne({ _id: ObjectId(req.headers.id) });
      res.send(result);
    }
  } catch (error) {
    serverError(res);
  }
}
