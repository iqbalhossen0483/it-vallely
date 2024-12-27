import { deleteImage } from "../cloudinary/shared/deleteImage";
import { profileUpload } from "../cloudinary/upload/profileUpload";
import { firebase_server_init } from "../firebase-server/firebase_server_init";
import { userVarification } from "../firebase-server/userVarification";
import { serverError } from "../serverError";
import { bodyPerse } from "./bodyPerser";

export async function updateUser(req, res) {
  try {
    const admin = firebase_server_init();
    const db = admin.firestore();

    //multer for body persing;
    const multer = await bodyPerse(req, res);
    if (multer.error) return serverError(res);

    //userVarification;
    const { error } = await userVarification(req);
    if (error) {
      serverError(res, { msg: "User authentication failed", status: 401 });
      return;
    }
    //user's account enable;
    if (req.query.enable) {
      const userDocRef = db.collection("users").doc(req.body.uid);
      await userDocRef.update({
        disabled: false,
      });
    }

    //user's account disabled
    if (req.query.disable) {
      const userDocRef = db.collection("users").doc(req.body.uid);
      await userDocRef.update({
        disabled: true,
      });
    }

    //make a user's role update;
    if (req.body.newRole) {
      const userDocRef = db.collection("users").doc(req.body.uid);
      await userDocRef.update({
        role: req.body.newRole,
      });
    }

    //user profile update;
    if (req.query.avater) {
      if (req.file.size > 100000) {
        serverError(res, { msg: "Image size too long", status: 301 });
        return;
      }
      const { error, result } = await profileUpload(req.file.path);
      if (error) return serverError(res);
      const user = await admin.auth().updateUser(req.headers.user_uid, {
        photoURL: result.secure_url,
      });
      if (user.customClaims?.imgId) {
        await deleteImage(user.customClaims.imgId);
      }
      await admin
        .auth()
        .setCustomUserClaims(req.headers.user_uid, { imgId: result.public_id });
    }
    res.status(200).send({ message: "Success" });
  } catch (error) {
    serverError(res);
  }
}
