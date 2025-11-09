'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full py-4 px-8 flex justify-between items-center border-b border-gray-200">
      <Link href="/" className="text-2xl font-bold text-blue-700">
        Xam Racer
      </Link>
      <div className="space-x-4">
        <Link href="/" className="text-gray-700 hover:text-blue-700 font-medium">
          About
        </Link>
        <Link href="/" className="text-gray-700 hover:text-blue-700 font-medium">
          Leaderboard
        </Link>
      </div>
    </nav>
  );
}