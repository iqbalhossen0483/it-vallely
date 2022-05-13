import { bodyPerse } from "./services/bodyPerser";
import { NextApiRequest, NextApiResponse } from "next";
import { Collection } from "mongodb";
import { imageUpload } from "../../cloudinary/shared/imageUpload";
import { serverError } from "../../serverError";
import { deleteImage } from "../../cloudinary/shared/deleteImage";

export async function addProduct(
  req: NextApiRequest,
  res: NextApiResponse,
  products: Collection<Document>
) {
  //multer for body persing;
  const { error, file, files } = await bodyPerse(req, res);
  if (!error) {
    req.body.keyFeatures = req.body.keyFeatures.split(" | ");
    req.body.tags = req.body.tags.split(" | ");
    req.body.specifications = JSON.parse(req.body.specifications);

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
      delete req.body.pImg;

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
          await deleteImage(req.body.productImg.imgId);
          return serverError(res); //if error;
        }
      } //untill;
      delete req.body.gImg;
      console.log(req.body);

      //after all operation successfull, save data to database;
      products.insertOne(req.body, async (err, result) => {
        if (!err) {
          return res.status(200).send(result);
        } else {
          await deleteImage(req.body.productImg.imgId);
          req.body.productImgGallery.forEach(async (img: any) => {
            await deleteImage(img.imgId);
          });
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
