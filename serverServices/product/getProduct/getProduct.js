import { ObjectId } from "mongodb";
import { serverError } from "../../serverError";

export async function getProduct(req, res, products) {
  try {
    if (
      !req.headers.token ||
      req.headers.token !== process.env.NEXT_PUBLIC_APP_TOKEN
    ) {
      return res.status(401).send({ message: "user authentication failed" });
    }
    if (req.query.id) {
      //send id products
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

    //filter product
    else if (req.query.filterProduct) {
      const key = req.query.key,
        value = req.query.value;
      let result;
      if (key === "Product Code") {
        result = await products.find({ productCode: value }).toArray();
      } else if (key === "Price") {
        result = await products
          .find({ price: { $gt: 0, $lt: parseInt(value) } })
          .toArray();
      } else if (key === "Order pending") {
        result = await products
          .find({ orderPending: { $gt: 0, $lt: parseInt(value) } })
          .toArray();
      } else if (key === "Stock") {
        result = await products
          .find({ stock: { $gt: 0, $lt: parseInt(value) } })
          .toArray();
      } else {
        result = await products.find().toArray();
      }
      if (result) {
        res.status(200).send(result);
      } else {
        serverError(res);
      }
    } //till

    //search product
    else if (req.query.searchProduct) {
      const result = await products
        .aggregate([
          {
            $match: { $text: { $search: req.headers.text } },
          },
          { $project: { _id: 1, name: 1, productImg: 1 } },
        ])
        .toArray();
      res.status(200).send(result);
    }

    //send all products;
    else {
      const allProduct = await products.find().toArray();
      res.status(200).send(allProduct);
    }
  } catch (error) {
    serverError(res);
  }
}
