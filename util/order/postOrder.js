import { ObjectId } from "mongodb";

export async function postOrder(req, res, orders, products) {
  try {
    const { id, multiple } = req.query;
    const result = await orders.insertOne(req.body);
    if (!multiple) {
      await products.updateOne(
        { _id: ObjectId(id) },
        { $set: { orderPending: parseInt(req.body.products.quantity) } }
      );
    } else {
      for (const product of req.body.products) {
        await products.updateOne(
          { _id: ObjectId(product._id) },
          { $set: { orderPending: parseInt(product.quantity) } }
        );
      }
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Interner error, Please try again" });
  }
}
