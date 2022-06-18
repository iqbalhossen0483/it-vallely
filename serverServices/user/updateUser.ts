import { NextApiRequest, NextApiResponse } from "next";
import { userVarification } from "../firebase-server/userVarification";
import { serverError } from "../serverError";
import admin from "firebase-admin";

export async function updateUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { error } = await userVarification(req);
    if (error) {
      serverError(res, { msg: "User authentication failed", status: 401 });
      return;
    }
    if (req.query.enable) {
      await admin.auth().updateUser(req.body.uid, {
        disabled: false,
      });
    }
    if (req.query.disable) {
      await admin.auth().updateUser(req.body.uid, {
        disabled: true,
      });
    }
    if (req.body.newRole) {
      await admin
        .auth()
        .setCustomUserClaims(req.body.uid, { role: req.body.newRole });
    }
    res.status(200).send({ message: "Success" });
  } catch (error) {
    serverError(res);
  }
}
