import { serverError } from "../serverError";
import admin from "firebase-admin";

export async function getOrder(req, res, orders) {
  try {
    const token = req.headers.token;
    if (token && token.startsWith(process.env.NEXT_PUBLIC_TOKEN_BEARRER)) {
      const user = await admin.auth().verifyIdToken(token.split(" ")[1]);
      if (user.uid === req.headers.user_uid) {
        if (req.query.status && req.query.status !== "All") {
          const result = await orders
            .find({ status: req.query.status })
            .toArray();
          return res.send(result);
        } else {
          const result = await orders.find().toArray();
          return res.status(200).send(result);
        }
      }
    }
    return res.status(401).send({ message: "unauthorized" });
  } catch (error) {
    serverError(res);
  }
}
