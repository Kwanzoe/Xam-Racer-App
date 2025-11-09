'use client';

type Row = {
  id: string;
  name: string;
  wins: number;
  avgTimeSec: number;
  rating: number;
};

export default function LeaderboardList({ items }: { items: Row[] }) {
  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-4 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700">
        <div>Player</div>
        <div>Wins</div>
        <div>Avg. Time (s)</div>
        <div>Rating</div>
      </div>
      <ul className="divide-y divide-gray-200">
        {items.map((r) => (
          <li key={r.id} className="grid grid-cols-4 px-4 py-3 text-sm">
            <div className="font-medium">{r.name}</div>
            <div>{r.wins}</div>
            <div>{r.avgTimeSec.toFixed(1)}</div>
            <div>{r.rating}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
