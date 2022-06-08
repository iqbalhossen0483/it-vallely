import { Collection } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { deleteImage } from "../../cloudinary/shared/deleteImage";
import { imageUpload } from "../../cloudinary/shared/imageUpload";
import { userVarification } from "../../firebase-server/userVarification";
import { serverError } from "../../serverError";
import { singleFileBodyParser } from "../singleFileBodyParser";

export async function postSlider_Banner(
  req: NextApiRequest,
  res: NextApiResponse,
  dbCollection: Collection<Document>,
  imgFolder: string
) {
  try {
    const varication = await userVarification(req);
    if (varication.error) {
      return res.status(401).send({ message: "user authentication failed" });
    }

    //multer for body persing;
    const { error, file } = await singleFileBodyParser(req, res, "file");
    if (!error) {
      // img upload
      const { error, result } = await imageUpload(
        file.path,
        `it-vallely/${imgFolder}`,
        200,
        300
      );
      if (!error) {
        req.body.imgUrl = result.secure_url;
        req.body.imgId = result.public_id;
        dbCollection.insertOne(req.body, async (err, result) => {
          if (!err) {
            return res.status(200).send(result);
          } else {
            await deleteImage(req.body.imgId);
            return serverError(res);
          }
        });
      } else {
        return serverError(res);
      }
    } else {
      return serverError(res);
    }
  } catch (error) {
    serverError(res);
  }
}
