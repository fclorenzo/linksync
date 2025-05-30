// app/layout.tsx

import '@/styles/globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import SiteHeader from '../components/SiteHeader';
import { AuthUserProvider } from "../providers/AuthProvider";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Linksync',
  description: 'Save and sync your favorite links and access them from anywhere!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthUserProvider>
          <SiteHeader />
          {children}
        </AuthUserProvider>
      </body>
    </html>
  );
}
