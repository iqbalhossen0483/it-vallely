import { bodyPerse } from "./services/bodyPerser";
import { imageUpload } from "../../cloudinary/shared/imageUpload";
import { serverError } from "../../serverError";
import { deleteImage } from "../../cloudinary/shared/deleteImage";

export async function addProduct(req, res, products) {
  try {
    //multer for body persing;
    const { error, file, files } = await bodyPerse(req, res);
    if (!error) {
      //check the product code is unique;
      const isExist = await products.findOne({
        productCode: req.body.productCode,
      });
      if (!isExist) {
        req.body.keyFeatures = req.body.keyFeatures.split(" | ");
        req.body.tags = req.body.tags.split(" | ");
        if (req.body.specifications) {
          req.body.specifications = JSON.parse(req.body.specifications);
        }
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

          //after all operation successfull, save data to database;
          req.body.orderPending = 0;
          parseInt(req.body.price);
          parseInt(req.body.stock);
          products.insertOne(req.body, async (err, result) => {
            if (!err) {
              return res.status(200).send(result);
            } else {
              await deleteImage(req.body.productImg.imgId);
              req.body.productImgGallery.forEach(async (img) => {
                await deleteImage(img.imgId);
              });
              return serverError(res);
            }
          });
        } else {
          return serverError(res);
        }
      } else {
        return res
          .status(500)
          .send({ message: "Product code is exist, Change the product code" });
      }
    } else {
      return serverError(res);
    }
  } catch (error) {
    serverError(res);
  }
}
