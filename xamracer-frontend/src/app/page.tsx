'use client';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <section className="text-center mt-10">
        <h1 className="text-5xl font-extrabold mb-6 text-blue-700">Xam Racer 🏁</h1>
        <p className="text-lg text-gray-600 mb-8">
          Race others by answering questions correctly and fast!
        </p>
        <Link
          href="/game"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Enter Quiz Race
        </Link>
      </section>
    </main>
  );
}
