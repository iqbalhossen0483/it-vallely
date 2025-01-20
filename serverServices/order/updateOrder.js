import { ObjectId } from "mongodb";
import { userVarification } from "../firebase-server/userVarification";

export async function updateOrder(req, res, order) {
  try {
    const { error } = await userVarification(req);
    if (error) {
      return res.status(401).send({ message: "user authentication failed" });
    } else {
      const orderDetails = await order.findOne({ _id: ObjectId(req.body.id) });
      if (
        orderDetails.status === "Delivered" ||
        orderDetails.status === "Cenceled" ||
        orderDetails.status === req.body.status
      ) {
        res
          .status(403)
          .send({ message: `This order has been ${orderDetails.status}` });
        return;
      }
      const result = await order.updateOne(
        { _id: new ObjectId(req.body.id) },
        { $set: { status: req.body.status } }
      );
      res.send(result);
    }
  } catch (error) {
    res.status(500).send({ message: "internal error" });
  }
}
