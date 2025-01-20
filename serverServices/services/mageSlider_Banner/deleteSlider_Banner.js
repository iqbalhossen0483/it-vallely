import { ObjectId } from "mongodb";
import { deleteImage } from "../../cloudinary/shared/deleteImage";
import { userVarification } from "../../firebase-server/userVarification";
import { serverError } from "../../serverError";

export async function deleteSlider_Banner(req, res, dbCollection) {
  try {
    const varication = await userVarification(req);
    if (varication.error) {
      return res.status(401).send({ message: "user authentication failed" });
    }

    const { error } = await deleteImage(req.headers.img_id);
    if (!error) {
      const result = await dbCollection.deleteOne({
        _id: new ObjectId(req.headers.db_id),
      });
      res.status(200).send(result);
    } else {
      serverError(res);
    }
  } catch (error) {
    console.log(error)
    serverError(res);
  }
}
