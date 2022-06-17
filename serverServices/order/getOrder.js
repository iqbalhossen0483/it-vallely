import { userVarification } from "../firebase-server/userVarification";
import { serverError } from "../serverError";

export async function getOrder(req, res, orders) {
  try {
    const { error } = await userVarification(req);
    if (error) {
      res.status(401).send({ message: "user authentication failed" });
    } else {
      if (req.query.status && req.query.status !== "All") {
        const result = await orders
          .find({ status: req.query.status })
          .toArray();
        return res.send(result);
      } else if (req.query.email) {
        const result = await orders
          .find({ email: req.query.email })
          .sort({ created_at: 1 })
          .toArray();
        res.send(result);
      } else {
        const result = await orders.find().sort({ created_at: 1 }).toArray();
        return res.status(200).send(result);
      }
    }
  } catch (error) {
    serverError(res);
  }
}
