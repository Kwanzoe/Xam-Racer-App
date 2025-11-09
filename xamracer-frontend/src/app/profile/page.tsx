'use client';
import Navbar from '@/app/components/Navbar';
import ProfileCard from '@/app/components/ProfileCard';

export default function ProfilePage() {
  // Replace with real user fetch
  const user = {
    id: 'you-1',
    name: 'You',
    email: 'you@example.com',
    wins: 12,
    losses: 5,
    rating: 1210,
    joinedAt: '2025-01-01',
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        <ProfileCard user={user} onEdit={() => alert('Edit profile coming soon')} />
      </section>
    </main>
  );
}
