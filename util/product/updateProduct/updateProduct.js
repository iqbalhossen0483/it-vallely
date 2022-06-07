import { bodyPerse } from "../addProduct/services/bodyPerser";
import { serverError } from "../../serverError";
import { ObjectId } from "mongodb";
import { imageUpload } from "../../cloudinary/shared/imageUpload";
import { deleteImage } from "../../cloudinary/shared/deleteImage";

export async function updateProduct(req, res, product) {
  try {
    //multer for body persing;
    const { error } = await bodyPerse(req, res);
    if (!error) {
      req.body.keyFeatures = req.body.keyFeatures.split(" | ");
      req.body.tags = req.body.tags.split(" | ");
      if (req.body.specifications) {
        req.body.specifications = JSON.parse(req.body.specifications);
      }
      const id = req.body._id;
      req.body.price = parseInt(req.body.price);
      req.body.stock = parseInt(req.body.stock);
      req.body.prevPrice = parseInt(req.body.prevPrice);
      req.body.orderPending = parseInt(req.body.orderPending);
      delete req.body._id;

      if (req.files["pImg"]) {
        req.body.productImg = JSON.parse(req.body.productImg);
        const { error, result } = await imageUpload(
          req.files["pImg"][0].path,
          "it-vallely/products",
          200,
          300
        );
        if (!error) {
          await deleteImage(req.body.productImg.imgId);
          req.body.productImg.imgId = result.public_id;
          req.body.productImg.imgUrl = result.secure_url;
        }
      }
      if (req.files["gImg"]) {
        req.body.productImgGallery = JSON.parse(req.body.productImgGallery);
        const productImgGallery = [];
        for (const file of req.files["gImg"]) {
          const { error, result } = await imageUpload(
            file.path,
            "it-vallely/products",
            200,
            300
          );
          if (!error) {
            productImgGallery.push({
              imgId: result.public_id,
              imgUrl: result.secure_url,
            });
          }
        }
        for (const file of req.body.productImgGallery) {
          await deleteImage(file.imgId);
        }
        req.body.productImgGallery = productImgGallery;
      }
      const result = await product.updateOne(
        { _id: ObjectId(id) },
        { $set: req.body }
      );
      res.send(result);
    } else serverError(res);
  } catch (error) {
    serverError(res);
  }
}
