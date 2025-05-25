// app/dashboard/page.tsx

import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <h1>Dashboard - Private Content</h1>
      {/* Your dashboard components */}
    </ProtectedRoute>
  );
}
