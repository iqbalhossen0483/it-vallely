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
        body: `
        <p>
          Dear ${req.body.fname},
          Your order <b>${
            result.insertedId
          }</b> has been placed successfully. Do you
          have any questions about your order, feel free to call us on 01846770635
          (10am to 5pm).
        </p>
        <div style="display: flex; line-height: 7px">
          <div style="margin-right: 15px">
            <b>Delivary address</b>
            <p>${req.body.fname + " " + req.body.lname}</p>
            <p>${req.body.address}</p>
            <p>${req.body.mobile}</p>
          </div>
          <div>
            <b>Order summery</b>
            <div>
              <p>Sub-total: <b>${req.body.subTotal}৳</b></p>
              <p>Delivary cost: <b>${req.body.delivaryCost}৳</b></p>
              <p>Total: <b>${req.body.total}৳</b></p>
              <p>Amount paid: <b>0৳</b></p>
              <p>Due: <b>${req.body.total}৳</b></p>
            </div>
          </div>
        </div>`,
      };
      await sendEmail(options);
      res.status(200).send(result);
    }
  } catch (error) {
    console.log(error);
    serverError(res, { msg: "Interner error, Please try again" });
  }
}
