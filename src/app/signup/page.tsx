"use client";

import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import type { FirebaseError } from "firebase/app";

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/dashboard'); // Redirect to the dashboard after sign-up
    } catch (error) {
  const firebaseError = error as FirebaseError;
  setError(firebaseError.message);
    }
};

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p>{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
