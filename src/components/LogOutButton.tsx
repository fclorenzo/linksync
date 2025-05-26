// components/LogOutButton.tsx

"use client";

import { useAuth } from "@/providers/AuthProvider";

export default function LogoutButton() {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
}
