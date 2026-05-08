"use client";

import { FaPhone, FaMotorcycle } from "react-icons/fa";

export default function RiderCard({ rider }) {
  if (!rider) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-[#62371f]/10 flex items-center justify-center text-[#62371f] font-bold text-lg">
        {rider.name?.charAt(0)?.toUpperCase() || "R"}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-gray-800">{rider.name}</p>
        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
          <span className="flex items-center gap-1 capitalize">
            <FaMotorcycle className="text-gray-400" />
            {rider.vehicle_type}
          </span>
          {rider.vehicle_number && <span>{rider.vehicle_number}</span>}
        </div>
      </div>
      {rider.phone && (
        <a
          href={`tel:${rider.phone}`}
          className="flex items-center gap-1 bg-[#62371f]/10 text-[#62371f] px-3 py-2 rounded-lg text-sm font-bold hover:bg-[#62371f]/20 transition"
        >
          <FaPhone /> Call
        </a>
      )}
    </div>
  );
}
