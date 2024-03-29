import { bodyPerse } from "./services/bodyPerser";
import { imageUpload } from "../../cloudinary/shared/imageUpload";
import { serverError } from "../../serverError";
import { deleteImage } from "../../cloudinary/shared/deleteImage";
import { userVarification } from "../../firebase-server/userVarification";

export async function addProduct(req, res, products) {
  try {
    const varication = await userVarification(req);
    if (varication.error) {
      return serverError(res, {
        msg: "user authentication failed",
        status: 401,
      });
    }
    //multer for body persing;
    const { error } = await bodyPerse(req, res);
    // const { error, file, files } =
    if (!error) {
      const file = req.files["pImg"][0];
      const files = req.files["gImg"];
      //check the product code is unique;
      const isExist = await products.findOne({
        productCode: req.body.productCode,
      });
      if (!isExist) {
        req.body.keyFeatures = req.body.keyFeatures
          .split(" | ")
          .map((item) => item.trim());
        req.body.tags = req.body.tags.split(" | ").map((item) => item.trim());
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
          req.body.price = parseInt(req.body.price);
          req.body.stock = parseInt(req.body.stock);
          req.body.prevPrice = parseInt(req.body.prevPrice);
          req.body.created_at = new Date();
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
        return serverError(res, {
          msg: "Product code is exist, Change the product code",
        });
      }
    } else {
      return serverError(res);
    }
  } catch (error) {
    serverError(res);
  }
}
