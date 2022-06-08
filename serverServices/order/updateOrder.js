import { ObjectId } from "mongodb";
import { userVarification } from "../firebase-server/userVarification";

export async function updateOrder(req, res, order) {
  try {
    const { error } = await userVarification(req);
    if (error) {
      return res.status(401).send({ message: "user authentication failed" });
    } else {
      const result = await order.updateOne(
        { _id: ObjectId(req.body.id) },
        { $set: req.body }
      );
      res.send(result);
    }
  } catch (error) {
    res.status(500).send({ message: "internal" });
  }
}
