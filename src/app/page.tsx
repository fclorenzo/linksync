// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>
        Please <Link href="/auth/login">login</Link> to continue.
      </p>
    </div>
  );
}
