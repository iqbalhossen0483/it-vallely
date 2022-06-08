import { ObjectId } from "mongodb";
import { sendEmail } from "../services/sendEmail";

export async function postOrder(req, res, orders, products) {
  try {
    const result = await orders.insertOne(req.body);
    //update corosponding product order;
    for (const product of req.body.products) {
      await products.updateOne(
        { _id: ObjectId(product._id) },
        { $set: { orderPending: product.quantity } }
      );
    }
    //send mail;
    const options = {
      email: req.body.email,
      name: req.body.fname + req.body.lname,
      subj: "Order Confirmation",
      body: `Dear ${req.body.fname},
      your order is successfully pleaced and the order ID is: <b>${result.insertedId}</b>.
      <br/>
      your payment method was <b>${req.body.paymentMethod}</b>`,
    };
    await sendEmail(options);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Interner error, Please try again" });
  }
}
