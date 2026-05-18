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
                    ? "bg-[var(--primary)] border-[var(--primary)] text-white"
                    : "bg-background border-highlight text-gray-[#252729b8]"
                  } ${isCurrent ? "ring-4 ring-[var(--primary)]/10" : ""}`}
                >
                  {isComplete ? "✓" : idx + 1}
                </div>
                {idx < steps.length - 1 && (
                  <div className={`w-0.5 h-8 ${idx < currentIdx ? "bg-[var(--primary)]" : "bg-background00"}`} />
                )}
              </div>
              <div className={`pt-1 ${isCurrent ? "font-semibold" : ""}`}>
                <p className={`text-sm ${isComplete ? "text-text" : "text-gray-[#252729b8]"}`}>
                  {step.label}
                </p>
                {time && (
                  <p className="text-xs text-gray-[#252729b8]">
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
