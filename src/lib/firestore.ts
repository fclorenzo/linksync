// lib/firestore.ts

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase"; // your initialized Firestore instance

// Fetch categories for a user, ordered by creation date
export async function getCategories(userId: string) {
  const q = query(
    collection(db, "categories"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Add a new category for a user
export async function addCategory(name: string, userId: string) {
  const docRef = await addDoc(collection(db, "categories"), {
    name,
    userId,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

// Fetch links for a user, optionally filtered by category, with pagination support
export async function getLinks(
  userId: string,
  categoryId?: string,
  pageSize = 10,
  startAfterDoc?: any // Firestore document snapshot for pagination
) {
  let q = query(
    collection(db, "links"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(pageSize)
  );

  if (categoryId) {
    q = query(
      collection(db, "links"),
      where("userId", "==", userId),
      where("categoryId", "==", categoryId),
      orderBy("createdAt", "desc"),
      limit(pageSize)
    );
  }

  if (startAfterDoc) {
    q = query(q, startAfter(startAfterDoc));
  }

  const snapshot = await getDocs(q);
  return {
    links: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
    lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
  };
}

// Add a new link for a user
export async function addLink(
  url: string,
  title: string,
  categoryId: string,
  userId: string
) {
  const docRef = await addDoc(collection(db, "links"), {
    url,
    title,
    categoryId,
    userId,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

// Delete a link by id
export async function deleteLink(linkId: string) {
  await deleteDoc(doc(db, "links", linkId));
}
