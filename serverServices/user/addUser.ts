import { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { serverError } from "../serverError";
import { userVarification } from "../firebase-server/userVarification";
import { bodyPerse } from "./bodyPerser";

export async function addUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    //multer for body persing;
    const multer = await bodyPerse(req, res);
    if (multer.error) return serverError(res);

    const { error } = await userVarification(req);
    if (error) {
      serverError(res, { msg: "user authentication failed", status: 401 });
      return;
    }
    const result = await admin.auth().createUser({
      displayName: req.body.name,
      email: req.body.email,
      password: req.body.password,
      emailVerified: true,
    });
    res.send(result);
  } catch {
    serverError(res);
  }
}
