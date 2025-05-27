// app/dashboard/page.tsx

"use client";

import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import useCategories from "@/lib/useCategories";
import useLinks from "@/lib/useLinks";
import CategorySidebar from "@/components/CategorySidebar";
import LinksSection from "@/components/LinksSection";
import CategoryModal from "@/components/CategoryModal";
import LinkModal from "@/components/LinkModal";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  const [categoryToEdit, setCategoryToEdit] = useState<{ id: string; name: string } | null>(null);
  const [linkToEdit, setLinkToEdit] = useState<Link | null>(null);
  const { authUser } = useAuth();
  const userId = authUser?.uid ?? "";
  const { categories, loading: loadingCats } = useCategories(userId);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // null means "All"
  const {
    links,
    loading: loadingLinks,
    hasMore,
    fetchMore,
  } = useLinks(userId, selectedCategory ?? undefined);

  // Modals open/close state
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddLink, setShowAddLink] = useState(false);

  //if (!userId) return null; // or loading state

  return (
    <ProtectedRoute>
      {!userId ? (
        <p>Loading user info...</p>
      ) : (
        <div className="flex h-screen max-w-7xl mx-auto p-4 gap-6">
          <CategorySidebar
            categories={categories}
            loading={loadingCats}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onAddCategory={() => setShowAddCategory(true)}
          />

          <LinksSection
            links={links}
            loading={loadingLinks}
            hasMore={hasMore}
            fetchMore={fetchMore}
            onAddLink={() => setShowAddLink(true)}
          />

          {showAddCategory && (
            <CategoryModal onClose={() => setShowAddCategory(false)} userId={userId} />
          )}

          {showAddLink && (
            <LinkModal
              onClose={() => setShowAddLink(false)}
              categories={categories}
              userId={userId}
            />
          )}
        </div>
      )}
    </ProtectedRoute>
  );
}
