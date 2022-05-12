import { bodyPerse } from "./services/bodyPerser";
import { NextApiRequest, NextApiResponse } from "next";
import { Collection } from "mongodb";
import { imageUpload } from "../../cloudinary/shared/imageUpload";
import { serverError } from "../../serverError";

export async function addProduct(
  req: NextApiRequest,
  res: NextApiResponse,
  products: Collection<Document>
) {
  const { error, file, files } = await bodyPerse(req, res); //multer for body persing;
  if (!error) {
    //main product img upload;
    const { error, result } = await imageUpload(
      file.path,
      "it-vallely/products",
      200,
      300
    ); //untill;
    if (!error) {
      req.body.productImg = {
        imgId: result.public_id,
        imgUrl: result.secure_url,
      }; //after upload successful

      //gallery img upload one by one;
      req.body.productImgGallery = [];
      for (const file of files) {
        const { error, result } = await imageUpload(
          file.path,
          "it-vallely/products",
          200,
          300
        );
        if (!error) {
          req.body.productImgGallery.push({
            imgId: result.public_id,
            imgUrl: result.secure_url,
          }); //after successfull;
        } else {
          return serverError(res); //if error;
        }
      } //untill;

      //after all operation successfull, save data to database;
      products.insertOne(req.body, (err, result) => {
        if (!err) {
          return res.status(200).send(result);
        } else {
          return serverError(res);
        }
      });
    } else {
      return serverError(res);
    }
  } else {
    return serverError(res);
  }
}
