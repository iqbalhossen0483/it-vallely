import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { FirebaseReturn } from "../contex-type";
import firebaseConfig from "../firebase/firebase.confiq";

initializeApp(firebaseConfig);

function Firebase(): FirebaseReturn {
  const [userRole, setUserRole] = useState<UserRoles>("user");
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const googleprovider = new GoogleAuthProvider();
  const auth = getAuth();

  //manage user;
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const res = await fetch(`/api/user?uid=${user.uid}`);
          if (res.ok) {
            const { role }: { role: UserRoles } = await res.json();
            setUserRole(role);
          }
        } catch (err) {
          setUserRole("user");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  //google sing up / in;
  async function googleSingIn(): Promise<SignUpIn> {
    try {
      await signInWithPopup(auth, googleprovider);
      return { error: false, message: null };
    } catch (err: any) {
      return { error: true, message: err.message };
    }
  } //till

  //email singup
  async function emailSignUp(
    name: string,
    email: string,
    password: string
  ): Promise<emaiSignUP> {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateUser(name);
      return { error: false, message: null, user };
    } catch (err: any) {
      return { error: true, message: err.message, user: null };
    }
  } //till

  //email sing in;
  async function emailSingIn(
    email: string,
    password: string
  ): Promise<SignUpIn> {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { error: false, message: null };
    } catch (err: any) {
      return { error: true, message: err.message };
    }
  } //till;

  //sign out ouser;
  async function singOut(): Promise<{ error: boolean }> {
    try {
      await signOut(auth);
      return { error: false };
    } catch (err) {
      return { error: true };
    }
  }

  //varify email;
  async function varifyEmail(user: User) {
    try {
      await sendEmailVerification(user);
      return { error: false };
    } catch (err) {
      return { error: true };
    }
  }

  //reset password;
  async function resetPassword(email: string): Promise<{ error: boolean }> {
    try {
      await sendPasswordResetEmail(auth, email);
      return { error: false };
    } catch (err) {
      return { error: true };
    }
  }

  //update user info;
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
  } //till;

  return {
    googleSingIn,
    emailSignUp,
    emailSingIn,
    user,
    singOut,
    varifyEmail,
    resetPassword,
    loading,
    setLoading,
    userRole,
  };
}

export default Firebase;
