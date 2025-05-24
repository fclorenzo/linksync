"use client";

import { createContext, useContext, useState, useEffect } from "react";
//import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase";
import type { User } from "firebase/auth";

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
