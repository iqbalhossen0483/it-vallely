import { bodyPerse } from "../addProduct/services/bodyPerser";
import { serverError } from "../../serverError";
import { ObjectId } from "mongodb";

export async function updateProduct(req, res, product) {
  try {
    //multer for body persing;
    const { error, file, files } = await bodyPerse(req, res);
    if (!error) {
      req.body.keyFeatures = req.body.keyFeatures.split(" | ");
      req.body.tags = req.body.tags.split(" | ");
      if (req.body.specifications) {
        req.body.specifications = JSON.parse(req.body.specifications);
      }
      const id = req.body._id;
      delete req.body._id;
      const result = await product.updateOne(
        { _id: ObjectId(id) },
        { $set: req.body }
      );
      res.send(result);
    } else serverError(res);
  } catch (error) {
    console.log(error);
    serverError(res);
  }
}
