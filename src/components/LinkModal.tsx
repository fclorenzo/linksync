// components/LinkModal.tsx

"use client";

import { useState, useEffect } from "react";
import { addLink, updateLink } from "@/lib/firestore";

interface Category {
  id: string;
  name: string;
}

interface LinkItem {
  id: string;
  url: string;
  title?: string;
  categoryId: string;
}

interface Props {
  onClose: () => void;
  userId: string;
  categories: Category[];
  itemToEdit?: LinkItem;
  onSuccess?: () => void;
}

export default function LinkModal({ onClose, userId, categories, itemToEdit, onSuccess }: Props) {
  const [url, setUrl] = useState(itemToEdit?.url ?? "");
  const [title, setTitle] = useState(itemToEdit?.title ?? "");
  const [categoryId, setCategoryId] = useState(itemToEdit?.categoryId ?? (categories[0]?.id || ""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUrl(itemToEdit?.url ?? "");
    setTitle(itemToEdit?.title ?? "");
    setCategoryId(itemToEdit?.categoryId ?? (categories[0]?.id || ""));
  }, [itemToEdit, categories]);
  const isEditMode = Boolean(itemToEdit);

  const isValidUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !isValidUrl(url.trim())) {
      setError("Please enter a valid URL.");
      return;
    }
    if (!categoryId) {
      setError("Please select a category.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      if (isEditMode && itemToEdit) {
        await updateLink(itemToEdit.id, {
          url: url.trim(),
          title: title.trim(),
          categoryId,
        });
      } else {
        await addLink(url.trim(), title.trim(), categoryId, userId);
      }
      onSuccess?.();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to save link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-lg">
        <h3 className="font-bold text-lg mb-4">{isEditMode ? "Edit Link" : "Add New Link"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="url"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="input input-bordered w-full mb-2"
            disabled={loading}
            required
          />
          <input
            type="text"
            placeholder="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full mb-2"
            disabled={loading}
          />
          <label htmlFor="category-select" className="block mb-1 font-medium">
            Category
          </label>
          <select
            id="category-select"
            className="select select-bordered w-full mb-2"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            disabled={loading}
            required
          >
            <option value="" disabled>
              Select category
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <div className="modal-action">
            <button type="button" className="btn btn-ghost" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className={`btn btn-primary ${loading ? "loading" : ""}`}>
              {isEditMode ? "Save" : "Add Link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
