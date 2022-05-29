import { serverError } from "../serverError";

export async function getOrder(req, res, orders) {
  try {
    if (req.query.status && req.query.status !== "All") {
      const result = await orders.find({ status: req.query.status }).toArray();
      res.send(result);
    } else {
      const result = await orders.find().toArray();
      res.status(200).send(result);
    }
  } catch (error) {
    serverError(res);
  }
}
