// lib/useCategories.ts

import { useState, useEffect } from "react";
import { getCategories } from "./firestore";

export default function useCategories(userId: string) {
  const [categories, setCategories] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    getCategories(userId)
      .then((cats) => {
        setCategories(cats);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch categories");
        setLoading(false);
      });
  }, [userId]);

  return { categories, loading, error };
}
