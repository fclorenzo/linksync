// components/LogoutButton.tsx
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    router.push("/auth/login"); // Redirect to login after logout
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
