"use client"; // Mark as client-side component

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/AuthProvider"; // Your auth context hook

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const router = useRouter();

  const user = auth?.user;
  // If your AuthContextType does not have 'loading', set loading to false or use the correct property
  const loading = false; // Replace with the correct loading state if available

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login"); // Redirect to login if not authenticated
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return <p>Loading...</p>; // Or a loading spinner
  }

  return <>{children}</>;
}
