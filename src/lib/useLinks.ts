// lib/useLinks.ts

import { useState, useEffect } from "react";
import { getLinks } from "./firestore";

export default function useLinks(
  userId: string,
  categoryId?: string,
  pageSize = 10
) {
  const [links, setLinks] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);

  // Initial load or category change
  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    getLinks(userId, categoryId, pageSize)
      .then(({ links: newLinks, lastDoc: newLastDoc }) => {
        setLinks(newLinks);
        setLastDoc(newLastDoc);
        setHasMore(!!newLastDoc);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch links");
        setLoading(false);
      });
  }, [userId, categoryId, pageSize]);

  // Function to fetch more links for pagination (infinite scroll)
  const fetchMore = () => {
    if (!lastDoc || loading) return;

    setLoading(true);
    getLinks(userId, categoryId, pageSize, lastDoc)
      .then(({ links: moreLinks, lastDoc: newLastDoc }) => {
        setLinks((prev) => [...prev, ...moreLinks]);
        setLastDoc(newLastDoc);
        setHasMore(!!newLastDoc);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch more links");
        setLoading(false);
      });
  };

  return { links, loading, error, hasMore, fetchMore };
}
