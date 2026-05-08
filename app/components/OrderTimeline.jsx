"use client";

const steps = [
  { key: "pending", label: "Order Placed" },
  { key: "assigned", label: "Rider Assigned" },
  { key: "accepted", label: "Rider Accepted" },
  { key: "picked_up", label: "Picked Up" },
  { key: "in_transit", label: "On the Way" },
  { key: "delivered", label: "Delivered" },
];

const statusIndex = {
  unassigned: 0,
  pending: 0,
  assigned: 1,
  accepted: 2,
  picked_up: 3,
  in_transit: 4,
  delivered: 5,
};

export default function OrderTimeline({ deliveryStatus, assignment }) {
  const currentIdx = statusIndex[deliveryStatus] ?? 0;

  const getTime = (step) => {
    if (!assignment) return null;
    switch (step) {
      case "assigned": return assignment.assigned_at;
      case "accepted": return assignment.accepted_at;
      case "picked_up": return assignment.picked_up_at;
      case "delivered": return assignment.delivered_at;
      default: return null;
    }
  };

  return (
    <div className="py-4">
      <div className="relative">
        {steps.map((step, idx) => {
          const isComplete = idx <= currentIdx;
          const isCurrent = idx === currentIdx;
          const time = getTime(step.key);

          return (
            <div key={step.key} className="flex items-start mb-0 last:mb-0">
              <div className="flex flex-col items-center mr-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2
                  ${isComplete
                    ? "bg-[#62371f] border-[#62371f] text-white"
                    : "bg-white border-gray-300 text-gray-400"
                  } ${isCurrent ? "ring-4 ring-[#62371f]/10" : ""}`}
                >
                  {isComplete ? "✓" : idx + 1}
                </div>
                {idx < steps.length - 1 && (
                  <div className={`w-0.5 h-8 ${idx < currentIdx ? "bg-[#62371f]" : "bg-gray-200"}`} />
                )}
              </div>
              <div className={`pt-1 ${isCurrent ? "font-semibold" : ""}`}>
                <p className={`text-sm ${isComplete ? "text-gray-800" : "text-gray-400"}`}>
                  {step.label}
                </p>
                {time && (
                  <p className="text-xs text-gray-400">
                    {new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
