// components/CategorySidebar.tsx

"use client";

import React from "react";

interface Props {
  categories: Array<{ id: string; name: string }>;
  loading: boolean;
  selectedCategory: string | null; // null means "All"
  onSelectCategory: (id: string | null) => void;
  onAddCategory: () => void;
  onEditCategory: (category: { id: string; name: string }) => void;
}

export default function CategorySidebar({
  categories,
  loading,
  selectedCategory,
  onSelectCategory,
  onAddCategory,
  onEditCategory,
}: Props) {
  // Find the selected category object for editing:
  const selectedCategoryObj = categories.find(cat => cat.id === selectedCategory);

  return (
    <aside className="w-64 border-r p-4 flex flex-col">
      <label htmlFor="category-select" className="mb-2 font-semibold">
        Select Category
      </label>
      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <>
          <select
            id="category-select"
            className="select select-bordered w-full mb-4"
            value={selectedCategory ?? ""}
            onChange={(e) =>
              onSelectCategory(e.target.value === "" ? null : e.target.value)
            }
          >
            <option value="">Uncategorized</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <button
            className={`btn btn-outline mb-4 ${!selectedCategoryObj ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!selectedCategoryObj}
            onClick={() => selectedCategoryObj && onEditCategory(selectedCategoryObj)}
          >
            Edit Selected Category
          </button>
        </>
      )}

      <button className="btn btn-primary mt-auto" onClick={onAddCategory}>
        + Add Category
      </button>
    </aside>
  );
}
