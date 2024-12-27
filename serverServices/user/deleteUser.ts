import { NextApiRequest, NextApiResponse } from "next";
import { firebase_server_init } from "../firebase-server/firebase_server_init";
import { userVarification } from "../firebase-server/userVarification";
import { serverError } from "../serverError";

export async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const admin = firebase_server_init();
    const { error } = await userVarification(req);
    if (error) {
      serverError(res, { msg: "User authentication failed", status: 401 });
      return;
    }
    await admin.auth().deleteUser(req.query.uid as string);
    res.status(200).send({ message: "user deleted successful" });
  } catch (error) {
    console.log(error);
    serverError(res);
  }
}
