// components/CategorySidebar.tsx

"use client";

import React from "react";

interface Props {
  categories: Array<{ id: string; name: string }>;
  loading: boolean;
  selectedCategory: string | null; // null means "All"
  onSelectCategory: (id: string | null) => void;
  onAddCategory: () => void;
}

export default function CategorySidebar({
  categories,
  loading,
  selectedCategory,
  onSelectCategory,
  onAddCategory,
}: Props) {
  return (
    <aside className="w-64 border-r p-4 flex flex-col">
      <button
        onClick={() => onSelectCategory(null)}
        className={`mb-4 btn btn-ghost ${selectedCategory === null ? "btn-active" : ""}`}
      >
        All
      </button>
      {loading ? (
        <p>Loading categories...</p>
      ) : (
        categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`btn btn-ghost mb-2 text-left ${
              selectedCategory === cat.id ? "btn-active" : ""
            }`}
          >
            {cat.name}
          </button>
        ))
      )}
      <button className="btn btn-primary mt-auto" onClick={onAddCategory}>
        + Add Category
      </button>
    </aside>
  );
}
