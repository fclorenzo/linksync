// components/AddCategoryModal.tsx

"use client";

import { useState } from "react";
import { addCategory } from "@/lib/firestore";

interface Props {
  onClose: () => void;
  userId: string;
}

export default function AddCategoryModal({ onClose, userId }: Props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Category name cannot be empty.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await addCategory(name.trim(), userId);
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to add category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Add New Category</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full mb-2"
            disabled={loading}
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <div className="modal-action">
            <button type="button" className="btn btn-ghost" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className={`btn btn-primary ${loading ? "loading" : ""}`}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
