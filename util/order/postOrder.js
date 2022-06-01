import { ObjectId } from "mongodb";

export async function postOrder(req, res, orders, products) {
  try {
    const { id, multiple } = req.query;
    const result = await orders.insertOne(req.body);
    if (!multiple) {
      await products.updateOne(
        { _id: ObjectId(id) },
        { $set: { orderPending: req.body.products.quantity.toString() } }
      );
    } else {
      for (const product of req.body.products) {
        await products.updateOne(
          { _id: ObjectId(product._id) },
          { $set: { orderPending: product.quantity.toString() } }
        );
      }
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Interner error, Please try again" });
  }
}
