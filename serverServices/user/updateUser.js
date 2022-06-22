import { userVarification } from "../firebase-server/userVarification";
import { serverError } from "../serverError";
import admin from "firebase-admin";
import { bodyPerse } from "./bodyPerser";

export async function updateUser(req, res) {
  try {
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
      await admin.auth().updateUser(req.body.uid, {
        disabled: false,
      });
    }

    //user's account disabled
    if (req.query.disable) {
      await admin.auth().updateUser(req.body.uid, {
        disabled: true,
      });
    }

    //make a user's role update;
    if (req.body.newRole) {
      await admin
        .auth()
        .setCustomUserClaims(req.body.uid, { role: req.body.newRole });
    }

    //user profile update;
    if (req.query.avater) {
      console.log(req.file);
    }
    res.status(200).send({ message: "Success" });
  } catch (error) {
    serverError(res);
  }
}
