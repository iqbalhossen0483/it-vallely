import { ObjectId } from "mongodb";
import { serverError } from "../../serverError";

export async function getProduct(req, res, products) {
  try {
    //send id products
    if (req.query.id) {
      if (req.query.multipleId) {
        const allId = [];
        req.query.id.split("|").forEach((id) => {
          allId.push(ObjectId(id));
        });
        const multipleIdProduct = await products
          .find({ _id: { $in: allId } })
          .toArray();
        res.status(200).send(multipleIdProduct);
      } else {
        const singleProduct = await products.findOne({
          _id: ObjectId(req.query.id),
        });
        res.status(200).send(singleProduct);
      }
    } //till

    //send category products;
    else if (req.query.category) {
      if (req.query.random === "true") {
        const randomCategoriesProduct = await products
          .aggregate([
            { $match: { category: req.query.category } },
            { $sample: { size: 4 } },
          ])
          .toArray();
        res.status(200).send(randomCategoriesProduct);
      } else {
        const categoryProduct = await products
          .find({ category: RegExp(req.query.category, "i") })
          .toArray();
        res.status(200).send(categoryProduct);
      }
    } //till;

    //send all products;
    else {
      const allProduct = await products.find().toArray();
      res.status(200).send(allProduct);
    }
  } catch (error) {
    serverError(res);
  }
}
