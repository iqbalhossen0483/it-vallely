import { userVarification } from "../firebase-server/userVarification";
import { NextApiRequest, NextApiResponse } from "next";
import { serverError } from "../serverError";
import admin from "firebase-admin";
import { firebase_server_init } from "../firebase-server/firebase_server_init";

export async function getUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    firebase_server_init();
    if (req.query.uid) {
      const user = await admin.auth().getUser(req.query.uid as string);
      res.status(200).send({ role: user.customClaims?.role || "User" });
      return;
    }

    const { error } = await userVarification(req);
    if (error) throw { msg: "user authentication failed", status: 401 };

    const userlist = await admin.auth().listUsers();
    res.status(200).send(userlist.users);
  } catch (err: any) {
    serverError(res, { msg: err.message });
  }
}
