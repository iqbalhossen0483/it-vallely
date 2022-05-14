import { ObjectId } from "mongodb";
import { serverError } from "../../serverError";

export async function getProduct(req, res, products) {
  try {
    if (req.query.id) {
      const singleProduct = await products.findOne({
        _id: ObjectId(req.query.id),
      });
      res.status(200).send(singleProduct);
    } else if (req.query.category) {
      if (req.query.random === "true") {
        const randomCategoriesProduct = await products
          .aggregate([
            { $match: { category: req.query.category } },
            { $sample: { size: 4 } },
          ])
          .toArray();
        res.status(200).send(randomCategoriesProduct);
      }
    } else {
      const allProduct = await products.find().toArray();
      res.status(200).send(allProduct);
    }
  } catch (error) {
    serverError(res);
  }
}
