"use client";

import { FaPhone, FaMotorcycle } from "react-icons/fa";

export default function RiderCard({ rider }) {
  if (!rider) return null;

  return (
    <div className="bg-background rounded-xl border border-highlight p-4 flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] font-bold text-lg">
        {rider.name?.charAt(0)?.toUpperCase() || "R"}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-text">{rider.name}</p>
        <div className="flex items-center gap-3 mt-1 text-sm text-gray-700">
          <span className="flex items-center gap-1 capitalize">
            <FaMotorcycle className="text-gray-[#252729b8]" />
            {rider.vehicle_type}
          </span>
          {rider.vehicle_number && <span>{rider.vehicle_number}</span>}
        </div>
      </div>
      {rider.phone && (
        <a
          href={`tel:${rider.phone}`}
          className="flex items-center gap-1 bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-2 rounded-lg text-sm font-bold hover:bg-[var(--primary)]/20 transition"
        >
          <FaPhone /> Call
        </a>
      )}
    </div>
  );
}
