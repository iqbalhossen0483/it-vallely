import { userVarification } from "../firebase-server/userVarification";
import { sendEmail } from "../services/sendEmail";
import { ObjectId } from "mongodb";
import { serverError } from "../serverError";

export async function postOrder(req, res, orders, products) {
  try {
    const { error } = await userVarification(req);
    if (error) {
      return serverError(res, {
        msg: "user authentication failed",
        status: 401,
      });
    } else {
      const result = await orders.insertOne({
        ...req.body,
        created_at: new Date(),
      });
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
    }
  } catch (error) {
    console.log(error);
    serverError(res, { msg: "Interner error, Please try again" });
  }
}
