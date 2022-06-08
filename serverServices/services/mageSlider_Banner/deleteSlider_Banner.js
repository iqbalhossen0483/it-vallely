import { deleteImage } from "../../cloudinary/shared/deleteImage";
import { serverError } from "../../serverError";
import { ObjectId } from "mongodb";

export async function deleteSlider_Banner(req, res, dbCollection) {
  try {
    const { error } = await deleteImage(req.headers.img_id);
    if (!error) {
      const result = await dbCollection.deleteOne({
        _id: ObjectId(req.headers.db_id),
      });
      res.status(200).send(result);
    } else {
      serverError(res);
    }
  } catch (error) {
    serverError(res);
  }
}
