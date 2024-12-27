import { ObjectId } from "mongodb";
import { serverError } from "../../serverError";

const allProductData = {
  _id: 1,
  name: 1,
  price: 1,
  productImg: 1,
  productCode: 1,
  stock: 1,
  orderPending: 1,
  category: 1,
  keyFeatures: 1,
  productImgGallery: 1,
};

export async function getProduct(req, res, products) {
  try {
    if (
      !req.headers.token ||
      req.headers.token !== process.env.NEXT_PUBLIC_APP_TOKEN
    ) {
      return res.status(401).send({ message: "unauthorized" });
    }
    //send id products
    if (req.query.id) {
      // send multipleId products;
      if (req.query.multipleId) {
        const allId = [];
        req.query.id.split("|").forEach((id) => {
          allId.push(new ObjectId(id));
        });
        const multipleIdProduct = await products
          .find({ _id: { $in: allId } })
          .toArray();
        res.status(200).send(multipleIdProduct);
      }
      // send single product;
      else {
        const singleProduct = await products.findOne({
          _id: new ObjectId(req.query.id),
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
            { $project: { _id: 1, name: 1, productImg: 1, price: 1 } },
          ])
          .toArray();
        res.status(200).send(randomCategoriesProduct);
      } else {
        const categoryProduct = await products
          .find({ category: RegExp(req.query.category, "i") })
          .sort({ created_at: -1 })
          .project(allProductData)
          .toArray();
        res.status(200).send(categoryProduct);
      }
    } //till;

    //filter product
    else if (req.query.filterProduct) {
      const key = req.query.key,
        value = req.query.value,
        page = parseInt(req.query.page + "0" || "0");

      let result = {};
      if (key === "Product Code") {
        result.count = await products.find({ productCode: value }).count();
        result.data = await products
          .find({ productCode: value })
          .project(allProductData)
          .skip(page)
          .limit(10)
          .toArray();
      } else if (key === "Price") {
        result.count = await products
          .find({ price: { $gt: 0, $lt: parseInt(value) } })
          .count();
        result.data = await products
          .find({
            price: { $gt: 0, $lt: parseInt(value) },
            category: null,
          })
          .project(allProductData)
          .skip(page)
          .limit(10)
          .toArray();
      } else if (key === "Order pending") {
        result.count = await products
          .find({ orderPending: { $gt: 0, $lt: parseInt(value) } })
          .count();
        result.data = await products
          .find({ orderPending: { $gt: 0, $lt: parseInt(value) } })
          .project(allProductData)
          .skip(page)
          .limit(10)
          .toArray();
      } else if (key === "Stock") {
        result.count = await products
          .find({ stock: { $gt: 0, $lt: parseInt(value) } })
          .count();
        result.data = await products
          .find({ stock: { $gt: 0, $lt: parseInt(value) } })
          .project(allProductData)
          .skip(page)
          .limit(10)
          .toArray();
      } else if (key === "category") {
        result.count = await products.find({ category: value }).count();
        result.data = await products
          .find({ category: value })
          .project(allProductData)
          .skip(page)
          .limit(10)
          .toArray();
      } else {
        return sendAllProduct(req, res, products);
      }
      console.log(result);
      if (result.data.length) {
        res.status(200).send(result);
      } else {
        serverError(res, { msg: "No result matched", status: 404 });
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
      sendAllProduct(req, res, products);
    }
  } catch (error) {
    serverError(res, { msg: error.message, status: error.status });
  }
}

async function sendAllProduct(req, res, products) {
  try {
    const page = parseInt(req.query.page + "0" || "0");
    const count = await products.find().count();
    const data = await products
      .find()
      .project(allProductData)
      .sort({ created_at: -1 })
      .skip(page)
      .limit(10)
      .toArray();
    res.status(200).send({ count, data });
  } catch (error) {
    serverError(res);
  }
}
