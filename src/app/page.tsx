// app/page.tsx

import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      <p>
        Please <Link href="/login">login</Link> to continue.
      </p>
    </div>
  );
}
