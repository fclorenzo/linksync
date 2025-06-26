//app/auth-checker/page.tsx

'use client'; // This directive is crucial for using hooks like useEffect

import { useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../lib/firebase'; // Adjust path if your firebase.ts is elsewhere

// Helper function to format user data for sending
// This ensures we don't send non-serializable data
const formatUserForMessage = (user: User) => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
};

export default function AuthCheckerPage() {
  useEffect(() => {
    // We only want to check the auth state once and report it.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Unsubscribe immediately to prevent this from firing multiple times
      unsubscribe(); 

      // Send a message to the parent window (the extension's offscreen document)
      if (window.parent) {
        if (user) {
          // User is logged in, send their details
          const formattedUser = formatUserForMessage(user);
          window.parent.postMessage({ type: 'auth-state', status: 'signed-in', user: formattedUser }, '*');
        } else {
          // User is logged out
          window.parent.postMessage({ type: 'auth-state', status: 'signed-out', user: null }, '*');
        }
      }
    });

    // Clean up the listener if the component unmounts unexpectedly
    return () => unsubscribe();
  }, []);

  // This page is invisible to the user, so we just render a simple message
  // for debugging purposes if someone visits it directly.
  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center', color: '#888', marginTop: '50px' }}>
      <h1>Auth Checker</h1>
      <p>This page is used by the browser extension to verify authentication.</p>
    </div>
  );
}
