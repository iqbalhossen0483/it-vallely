import { ObjectId } from "mongodb";

export async function updateOrder(req, res, order) {
  try {
    const result = await order.updateOne(
      { _id: ObjectId(req.body.id) },
      { $set: req.body }
    );
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "internal" });
  }
}
