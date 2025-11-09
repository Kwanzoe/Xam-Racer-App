import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Xam Racer',
  description: 'Answer fast. Race faster.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}