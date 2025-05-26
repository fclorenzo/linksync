// components/LinksSection.tsx

"use client";

import React, { useRef, useCallback } from "react";

interface Link {
  id: string;
  url: string;
  title: string;
  categoryId: string;
}

interface Props {
  links: Link[];
  loading: boolean;
  hasMore: boolean;
  fetchMore: () => void;
  onAddLink: () => void;
}

export default function LinksSection({ links, loading, hasMore, fetchMore, onAddLink }: Props) {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastLinkRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      if (node) {
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasMore) {
            fetchMore();
          }
        });
        observer.current.observe(node);
      }
    },
    [loading, hasMore, fetchMore]
  );

  return (
    <section className="flex-1 overflow-auto flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Links</h2>
        <button className="btn btn-primary" onClick={onAddLink}>
          + Add Link
        </button>
      </div>

      {links.length === 0 && !loading && <p>No links found.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
        {links.map((link, i) => {
          if (i === links.length - 1) {
            return (
              <LinkCard
                key={link.id}
                ref={lastLinkRef}
                link={link}
              />
            );
          }
          return <LinkCard key={link.id} link={link} />;
        })}
      </div>

      {loading && <p className="mt-4">Loading...</p>}
    </section>
  );
}

const LinkCard = React.forwardRef<HTMLDivElement, { link: Link }>(
  ({ link }, ref) => {
    return (
      <div
        ref={ref}
        className="card card-bordered p-4"
      >
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-blue-600 underline"
        >
          {link.title || link.url}
        </a>
        <p className="text-sm text-gray-500 break-all">{link.url}</p>
      </div>
    );
  }
);

LinkCard.displayName = "LinkCard";
