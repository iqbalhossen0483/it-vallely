import { NextApiRequest, NextApiResponse } from "next";
import { firebase_server_init } from "../firebase-server/firebase_server_init";
import { userVarification } from "../firebase-server/userVarification";
import { serverError } from "../serverError";

export async function getUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const adminApp = firebase_server_init();
    const db = adminApp.firestore();

    if (req.query.uid) {
      const userDoc = await db
        .collection("users")
        .doc(req.query.uid as string)
        .get();
      const userdata = userDoc.data();
      res.status(200).send({ role: userdata?.role || "user" });
      return;
    }

    const { error } = await userVarification(req);
    if (error) throw { msg: "user authentication failed", status: 401 };

    const userlist = await adminApp.auth().listUsers();
    const userList = userlist.users;

    const userWithFirestoreData = [];

    for (const user of userList) {
      const userDocRef = db.collection("users").doc(user.uid);
      const userDoc = await userDocRef.get();

      if (userDoc.exists) {
        const userData = userDoc.data();

        userWithFirestoreData.push({
          ...user,
          ...userData,
        });
      } else {
        userWithFirestoreData.push(user);
      }
    }
    res.status(200).send(userWithFirestoreData);
  } catch (err: any) {
    serverError(res, { msg: err.message });
  }
}
