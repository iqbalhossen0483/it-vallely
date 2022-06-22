import { NextApiRequest, NextApiResponse } from "next";
import { userVarification } from "../firebase-server/userVarification";
import { serverError } from "../serverError";
import admin from "firebase-admin";

export async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { error } = await userVarification(req);
    if (error) {
      serverError(res, { msg: "User authentication failed", status: 401 });
      return;
    }
    await admin.auth().deleteUser(req.query.uid as string);
    res.status(200).send({ message: "user deleted successful" });
  } catch (error) {
    serverError(res);
  }
}
