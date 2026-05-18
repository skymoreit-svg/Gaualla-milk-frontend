"use client";

export default function DeletePopup({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  onCancel,
  onConfirm
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[9999]
                 bg-bg-opacity-20 backdrop-blur-md
                 transition-opacity duration-300 ease-out"
    >
      <div
        className="bg-background w-full max-w-lg rounded-xl shadow-xl p-8
                   transform scale-95 opacity-0 animate-popup-in"
      >
        <h2 className="text-2xl font-bold mb-4 text-text">{title}</h2>
        <p className="text-text mb-6">{message}</p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-5 py-3 rounded-lg border border-highlight hover:bg-background00 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
