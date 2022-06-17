import { ObjectId } from "mongodb";
import { deleteImage } from "../cloudinary/shared/deleteImage";
import { userVarification } from "../firebase-server/userVarification";
import { serverError } from "../serverError";

export async function deleteOrder(req, res, order) {
  try {
    const { error } = await userVarification(req);
    if (error) {
      return serverError(res, {
        msg: "user authentication failed",
        status: 401,
      });
    } else {
      const result = await order.deleteOne({ _id: ObjectId(req.body.id) });
      if (result.deletedCount > 0 && req.body.willDeleteImg) {
        for (const imgId of req.body.willDeleteImg) {
          const isMoreOrder = await order
            .find({ "products.productImg.imgId": imgId })
            .toArray();
          if (isMoreOrder.length === 0) {
            await deleteImage(imgId);
          }
        }
      }
      res.send(result);
    }
  } catch (error) {
    serverError(res);
  }
}
