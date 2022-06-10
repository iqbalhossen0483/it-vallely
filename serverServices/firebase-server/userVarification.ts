import { NextApiRequest } from "next";
import admin from "firebase-admin";
import { firebase_server_init } from "./firebase_server_init";

console.log("before", admin.app.length);

firebase_server_init();

console.log("after", admin.app.length);

export async function userVarification(req: NextApiRequest): Promise<{
  error: boolean;
}> {
  try {
    const token = req.headers.token as string;
    if (token && token.startsWith(process.env.NEXT_PUBLIC_TOKEN_BEARRER!)) {
      const user = await admin.auth().verifyIdToken(token.split(" ")[1]);
      if (user.uid === req.headers.user_uid) {
        return { error: false };
      }
    }
    return { error: true };
  } catch (err) {
    console.log(err);
    return { error: true };
  }
}
