'use client';

type User = {
  id: string;
  name: string;
  email: string;
  wins: number;
  losses: number;
  rating: number;
  joinedAt: string; // ISO
};

export default function ProfileCard({
  user,
  onEdit,
}: {
  user: User;
  onEdit?: () => void;
}) {
  const total = user.wins + user.losses || 1;
  const wr = (user.wins / total) * 100;

  return (
    <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="text-xs text-gray-500 mt-1">Joined {user.joinedAt}</p>
        </div>
        <button
          onClick={onEdit}
          className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
        >
          Edit
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <Stat label="Wins" value={user.wins} />
        <Stat label="Losses" value={user.losses} />
        <Stat label="Rating" value={user.rating} />
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-700 mb-2">Win Rate</p>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600" style={{ width: `${wr}%` }} />
        </div>
        <p className="text-xs text-gray-500 mt-1">{wr.toFixed(1)}%</p>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl bg-gray-50 p-4 text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  );
}
