import { credential } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";

export function firebase_server_init() {
  return initializeApp({
    credential: credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
  });
}
