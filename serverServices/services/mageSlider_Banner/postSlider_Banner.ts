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
      throw { message: "user authentication failed" };
    }

    //multer for body persing;
    const { error, file } = await singleFileBodyParser(req, res, "file");
    if (error) throw { message: "Internal error" };
    // img upload
    const image = await imageUpload(
      file.path,
      `it-vallely/${imgFolder}`,
      200,
      300
    );
    if (image.error) throw { message: "Internal error" };

    req.body.imgUrl = image.result.secure_url;
    req.body.imgId = image.result.public_id;
    const dbres = await dbCollection.insertOne(req.body);
    res.status(200).send(dbres);
  } catch (error) {
    deleteImage(req.body.imgId);
    serverError(res);
  }
}
