// lib/useFirebaseAuth.tsx

import { useState, useEffect } from "react";
import { auth } from "./firebase";
import type { User } from "firebase/auth";
import { onAuthStateChanged as _onAuthStateChanged } from "firebase/auth";
import {
  createUserWithEmailAndPassword as _createUserWithEmailAndPassword,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  signOut as _signOut,
} from "firebase/auth";

type AuthUser = {
  uid: string;
  email: string | null;
};

const formatAuthUser = (user: User): AuthUser => ({
  uid: user.uid,
  email: user.email,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const authStateChanged = (authState: User | null) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  const onAuthStateChanged = (cb: (user: User | null) => void) => {
    return _onAuthStateChanged(auth, cb);
  };

  // Add these auth functions:

  const signInWithEmailAndPassword = (email: string, password: string) =>
    _signInWithEmailAndPassword(auth, email, password);

  const createUserWithEmailAndPassword = (email: string, password: string) =>
    _createUserWithEmailAndPassword(auth, email, password);

  const signOut = () =>
    _signOut(auth).then(() => {
      setAuthUser(null);
      setLoading(true);
    });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
  };
}