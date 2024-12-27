import * as firebase from "firebase-admin";

export function firebase_server_init() {
  if (!firebase.apps.length) {
    console.log("Initializing Firebase Admin SDK...");
    try {
      const config = {
        credential: firebase.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
      };

      return firebase.initializeApp(config, "admin");
    } catch (error) {
      console.error("Failed to initialize Firebase Admin SDK:", error);
      throw new Error("Firebase initialization error");
    }
  } else {
    console.log("Firebase Admin SDK already initialized.");
    return firebase.app("admin"); // Return the already initialized app
  }
}
