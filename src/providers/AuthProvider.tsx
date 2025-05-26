// providers/AuthProvider.tsx

"use client";

import React, { createContext, useContext, ReactNode } from "react";
import useFirebaseAuth from "../lib/useFirebaseAuth";

type AuthUser = {
  uid: string;
  email: string | null;
};

interface AuthContextType {
  authUser: AuthUser | null;
  loading: boolean;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<any>;
  createUserWithEmailAndPassword: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
}

const defaultContext: AuthContextType = {
  authUser: null,
  loading: true,
  signInWithEmailAndPassword: async () => {},
  createUserWithEmailAndPassword: async () => {},
  signOut: async () => {},
};

const AuthUserContext = createContext<AuthContextType>(defaultContext);

export function AuthUserProvider({ children }: { children: ReactNode }) {
  const {
    authUser,
    loading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
  } = useFirebaseAuth();

  return (
    <AuthUserContext.Provider
      value={{
        authUser,
        loading,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        signOut,
      }}
    >
      {children}
    </AuthUserContext.Provider>
  );
}

// Custom hook to consume the auth context easily
export const useAuth = () => useContext(AuthUserContext);
