import { ObjectId } from "mongodb";
import { deleteImage } from "../../cloudinary/shared/deleteImage";
import { serverError } from "../../serverError";
import { bodyPerse } from "../addProduct/services/bodyPerser";

export async function deleteProduct(req, res, product) {
  try {
    const { error } = await bodyPerse(req, res);
    if (!error) {
      req.body.productImg = JSON.parse(req.body.productImg);
      req.body.galleryImg = JSON.parse(req.body.galleryImg);
      const result = await product.deleteOne({ _id: ObjectId(req.body.id) });
      await deleteImage(req.body.productImg.imgId);
      for (const img of req.body.galleryImg) {
        await deleteImage(img.imgId);
      }
      res.status(200).send(result);
    } else serverError(res);
  } catch (error) {
    serverError(res);
  }
}
