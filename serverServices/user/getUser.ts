import { userVarification } from "../firebase-server/userVarification";
import { NextApiRequest, NextApiResponse } from "next";
import { serverError } from "../serverError";
import admin from "firebase-admin";

export async function getUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.query.uid) {
      const user = await admin.auth().getUser(req.query.uid as string);
      res.status(200).send({ role: user.customClaims?.role || "User" });
      return;
    }

    const { error } = await userVarification(req);
    if (error) {
      serverError(res, { msg: "user authentication failed", status: 401 });
      return;
    }
    const userlist = await admin.auth().listUsers();
    res.status(200).send(userlist.users);
  } catch (err) {
    serverError(res);
  }
}
