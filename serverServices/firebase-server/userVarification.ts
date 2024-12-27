import { NextApiRequest } from "next";
import { firebase_server_init } from "./firebase_server_init";

export async function userVarification(
  req: NextApiRequest
): Promise<{ error: boolean }> {
  try {
    const adminApp = firebase_server_init(); // Initialize the app first
    const token = req.headers.token as string;

    if (token && token.startsWith(process.env.NEXT_PUBLIC_APP_TOKEN!)) {
      // Access auth from the initialized app
      const user = await adminApp.auth().verifyIdToken(token.split(" ")[1]);

      if (user.uid === req.headers.user_uid) {
        return { error: false };
      }
    }

    return { error: true };
  } catch (err) {
    return { error: true };
  }
}
