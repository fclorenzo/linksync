// login/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { FirebaseError } from "firebase/app";
import { useAuth } from "@/providers/AuthProvider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);
  const router = useRouter();

  // Get signIn function from context
  const { signInWithEmailAndPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowSignupPrompt(false);
    try {
      await signInWithEmailAndPassword(email, password);
      router.push("/dashboard");
    } catch (error) {
      const firebaseError = error as FirebaseError;
      if (
        firebaseError.code === "auth/user-not-found" ||
        firebaseError.code === "auth/invalid-credential"
      ) {
        setShowSignupPrompt(true);
        setError("");
      } else {
        setError(firebaseError.message);
        setShowSignupPrompt(false);
      }
    }
  };

  return (
    <div>
      <h2>Please Login to Continue</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>

      {error && <p>{error}</p>}

      {showSignupPrompt && (
        <p>
          User not found. Please <Link href="/signup">sign up</Link> to continue.
        </p>
      )}
    </div>
  );
}
