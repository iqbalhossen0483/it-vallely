import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebase/firebase.confiq";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  UserCredential,
  User,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { FirebaseReturn } from "../contex-type";
import { useEffect, useState } from "react";

initializeApp(firebaseConfig);

function Firebase(): FirebaseReturn {
  const [user, setUser] = useState<User | null>(null);
  const googleprovider = new GoogleAuthProvider();
  const auth = getAuth();

  function handleToken(result: UserCredential) {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    localStorage.setItem("token", `Bearrar${token}`);
  }

  //manage user;
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  //google sing up / in;
  async function googleSingIn(): Promise<SignUpIn> {
    try {
      const result = await signInWithPopup(auth, googleprovider);
      handleToken(result);
      return { error: false, message: null };
    } catch (err: any) {
      return { error: true, message: err.message };
    }
  } //till

  //emain singup
  async function emailSignUp(
    name: string,
    email: string,
    password: string
  ): Promise<SignUpIn> {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      handleToken(result);
      await updateUser(name);
      return { error: false, message: null };
    } catch (err: any) {
      return { error: true, message: err.message };
    }
  } //till

  async function emailSingIn(
    email: string,
    password: string
  ): Promise<SignUpIn> {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      handleToken(result);
      return { error: false, message: null };
    } catch (err: any) {
      return { error: true, message: err.message };
    }
  }

  async function updateUser(
    name?: string,
    photoURL?: string
  ): Promise<{ error: boolean } | undefined> {
    if (auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoURL,
        });
        return { error: false };
      } catch (err) {
        return { error: true };
      }
    }
  }

  return {
    googleSingIn,
    emailSignUp,
    emailSingIn,
    user,
  };
}

export default Firebase;
