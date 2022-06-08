import { deleteImage } from "../../cloudinary/shared/deleteImage";
import { serverError } from "../../serverError";
import { ObjectId } from "mongodb";
import { userVarification } from "../../firebase-server/userVarification";

export async function deleteSlider_Banner(req, res, dbCollection) {
  try {
    const varication = await userVarification(req);
    if (varication.error) {
      return res.status(401).send({ message: "user authentication failed" });
    }

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
