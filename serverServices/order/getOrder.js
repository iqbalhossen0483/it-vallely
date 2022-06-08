import { serverError } from "../serverError";
import { userVarification } from "../firebase-server/userVarification";

export async function getOrder(req, res, orders) {
  try {
    const { error } = await userVarification(req);
    if (error) {
      res.status(401).send({ message: "unauthorized" });
    } else {
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
  } catch (error) {
    serverError(res);
  }
}
