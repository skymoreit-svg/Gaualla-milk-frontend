"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { adminurl } from "../adminCompo/adminapis";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCalendar,
  FiToggleLeft,
  FiToggleRight,
  FiX,
  FiSave,
  FiSearch,
  FiAlertTriangle,
} from "react-icons/fi";
import { MdWbSunny, MdCelebration } from "react-icons/md";

// ─── helpers ──────────────────────────────────────────────────────────────────

const EMOJI_SUGGESTIONS = [
  "🌟", "☀️", "🌅", "🌸", "🥛", "🎉", "🪔", "🎊", "💫", "✨",
  "🌺", "🙏", "🎁", "❤️", "🌈", "🥰", "😊", "💪", "🌻", "🍀",
];

const todayStr = () => new Date().toISOString().slice(0, 10);

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    : "-";

const isActiveToday = (row) => {
  if (!row.is_active) return false;
  const today = new Date().toISOString().slice(0, 10);
  const start = row.start_date?.slice(0, 10);
  const end = row.end_date?.slice(0, 10);
  return start <= today && today <= end;
};

// ─── sub‑components ───────────────────────────────────────────────────────────

function StatusBadge({ row }) {
  if (!row.is_active) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
        Inactive
      </span>
    );
  }
  if (isActiveToday(row)) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
        Live Today
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
      Scheduled
    </span>
  );
}

function TypeBadge({ type }) {
  return type === "event" ? (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
      <MdCelebration size={12} /> Event
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-700">
      <MdWbSunny size={12} /> Greeting
    </span>
  );
}

// ─── skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="h-5 bg-gray-200 rounded w-1/3" />
        <div className="h-5 bg-gray-200 rounded w-16" />
      </div>
      <div className="h-4 bg-gray-100 rounded w-full mb-2" />
      <div className="h-4 bg-gray-100 rounded w-3/4 mb-4" />
      <div className="h-3 bg-gray-100 rounded w-1/2" />
    </div>
  );
}

// ─── empty state ──────────────────────────────────────────────────────────────

function EmptyState({ filter }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-4xl mb-4 shadow-inner">
        ☀️
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-1">No messages found</h3>
      <p className="text-sm text-gray-400 max-w-xs">
        {filter === "all"
          ? 'You haven\'t created any splash messages yet. Hit "Add Message" to get started.'
          : `No messages match the "${filter}" filter.`}
      </p>
    </div>
  );
}

// ─── modal ────────────────────────────────────────────────────────────────────

const EMPTY_FORM = {
  title: "",
  message: "",
  emoji: "🌟",
  type: "greeting",
  start_date: todayStr(),
  end_date: todayStr(),
  is_active: 1,
};

function MessageModal({ open, onClose, onSave, initial, loading }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(
        initial
          ? {
              title: initial.title || "",
              message: initial.message || "",
              emoji: initial.emoji || "🌟",
              type: initial.type || "greeting",
              start_date: initial.start_date?.slice(0, 10) || todayStr(),
              end_date: initial.end_date?.slice(0, 10) || todayStr(),
              is_active: initial.is_active ?? 1,
            }
          : EMPTY_FORM
      );
      setShowEmojiPicker(false);
    }
  }, [open, initial]);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {initial ? "Edit Message" : "New Splash Message"}
            </h2>
            <p className="text-sm text-gray-400 mt-0.5">
              Shown to users on the app splash screen
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <FiX size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Type selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Type
            </label>
            <div className="flex gap-3">
              {["greeting", "event"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => set("type", t)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                    form.type === t
                      ? t === "event"
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-sky-500 bg-sky-50 text-sky-700"
                      : "border-gray-200 text-gray-400 hover:border-gray-300"
                  }`}
                >
                  {t === "event" ? "🎉 Event" : "☀️ Greeting"}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              Events always take priority over greetings on the same day.
            </p>
          </div>

          {/* Emoji + Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Title & Emoji
            </label>
            <div className="flex gap-2">
              {/* Emoji button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker((v) => !v)}
                  className="w-12 h-12 text-2xl rounded-xl border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center transition-colors bg-gray-50"
                  title="Pick emoji"
                >
                  {form.emoji}
                </button>
                {showEmojiPicker && (
                  <div className="absolute top-14 left-0 z-10 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 w-56">
                    <p className="text-xs text-gray-400 mb-2 font-medium">Quick pick</p>
                    <div className="grid grid-cols-7 gap-1">
                      {EMOJI_SUGGESTIONS.map((e) => (
                        <button
                          key={e}
                          type="button"
                          onClick={() => {
                            set("emoji", e);
                            setShowEmojiPicker(false);
                          }}
                          className="w-7 h-7 text-lg hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors"
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      maxLength={4}
                      value={form.emoji}
                      onChange={(e) => set("emoji", e.target.value)}
                      className="mt-2 w-full border border-gray-200 rounded-lg px-2 py-1 text-sm text-center"
                      placeholder="Or type…"
                    />
                  </div>
                )}
              </div>

              {/* Title */}
              <input
                type="text"
                placeholder="e.g. Happy Monday!"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                maxLength={100}
                className="flex-1 h-12 border-2 border-gray-200 rounded-xl px-4 text-sm font-medium text-gray-700 placeholder-gray-300 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Message Body
            </label>
            <textarea
              rows={3}
              placeholder="Write an inspiring message for your users…"
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-amber-400 transition-colors resize-none"
            />
          </div>

          {/* Date range */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                <FiCalendar className="inline mr-1" />
                Start Date
              </label>
              <input
                type="date"
                value={form.start_date}
                onChange={(e) => set("start_date", e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                <FiCalendar className="inline mr-1" />
                End Date
              </label>
              <input
                type="date"
                value={form.end_date}
                min={form.start_date}
                onChange={(e) => set("end_date", e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          {/* Active toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <div>
              <p className="text-sm font-semibold text-gray-700">Active</p>
              <p className="text-xs text-gray-400">Show this message in the date range</p>
            </div>
            <button
              type="button"
              onClick={() => set("is_active", form.is_active ? 0 : 1)}
              className="transition-colors"
            >
              {form.is_active ? (
                <FiToggleRight size={36} className="text-emerald-500" />
              ) : (
                <FiToggleLeft size={36} className="text-gray-300" />
              )}
            </button>
          </div>

          {/* Preview */}
          <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 p-4">
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-2">
              Preview
            </p>
            <div className="flex items-start gap-3">
              <span className="text-3xl leading-none">{form.emoji || "🌟"}</span>
              <div>
                <p className="font-bold text-gray-800 text-base leading-tight">
                  {form.title || "Your title here"}
                </p>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  {form.message || "Your message body will appear here."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave(form)}
            disabled={loading}
            className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <FiSave size={16} />
            )}
            {loading ? "Saving…" : "Save Message"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── delete confirm ───────────────────────────────────────────────────────────

function DeleteModal({ open, onClose, onConfirm, loading, message }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 text-center">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <FiAlertTriangle size={26} className="text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-1">Delete Message?</h3>
        <p className="text-sm text-gray-500 mb-5">
          <span className="font-semibold">&ldquo;{message?.title}&rdquo;</span> will be permanently deleted.
          This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            )}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

const FILTERS = ["all", "greeting", "event", "active", "inactive"];

export default function SplashMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [togglingId, setTogglingId] = useState(null);

  // ── fetch ──────────────────────────────────────────────────────────────────

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${adminurl}/splash`, { withCredentials: true });
      setMessages(res.data.data || []);
    } catch {
      toast.error("Failed to load splash messages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // ── filter logic ───────────────────────────────────────────────────────────

  const filtered = messages.filter((m) => {
    const matchSearch =
      !search ||
      m.title?.toLowerCase().includes(search.toLowerCase()) ||
      m.message?.toLowerCase().includes(search.toLowerCase());

    if (!matchSearch) return false;

    if (filter === "all") return true;
    if (filter === "active") return !!m.is_active;
    if (filter === "inactive") return !m.is_active;
    return m.type === filter;
  });

  // counts for badges
  const counts = {
    all: messages.length,
    greeting: messages.filter((m) => m.type === "greeting").length,
    event: messages.filter((m) => m.type === "event").length,
    active: messages.filter((m) => m.is_active).length,
    inactive: messages.filter((m) => !m.is_active).length,
  };

  // ── CRUD handlers ──────────────────────────────────────────────────────────

  const openCreate = () => {
    setEditTarget(null);
    setModalOpen(true);
  };

  const openEdit = (msg) => {
    setEditTarget(msg);
    setModalOpen(true);
  };

  const handleSave = async (form) => {
    if (!form.title.trim()) { toast.error("Title is required"); return; }
    if (!form.message.trim()) { toast.error("Message body is required"); return; }
    if (!form.start_date || !form.end_date) { toast.error("Date range is required"); return; }
    if (form.end_date < form.start_date) { toast.error("End date must be after start date"); return; }

    setModalLoading(true);
    try {
      if (editTarget) {
        await axios.put(`${adminurl}/splash/${editTarget.id}`, form, { withCredentials: true });
        toast.success("Message updated!");
      } else {
        await axios.post(`${adminurl}/splash`, form, { withCredentials: true });
        toast.success("Message created!");
      }
      setModalOpen(false);
      fetchMessages();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save message");
    } finally {
      setModalLoading(false);
    }
  };

  const handleToggle = async (msg) => {
    setTogglingId(msg.id);
    try {
      const res = await axios.patch(
        `${adminurl}/splash/${msg.id}/toggle`,
        {},
        { withCredentials: true }
      );
      setMessages((prev) =>
        prev.map((m) =>
          m.id === msg.id ? { ...m, is_active: res.data.is_active } : m
        )
      );
      toast.success(res.data.is_active ? "Message activated" : "Message deactivated");
    } catch {
      toast.error("Failed to toggle status");
    } finally {
      setTogglingId(null);
    }
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(`${adminurl}/splash/${deleteTarget.id}`, { withCredentials: true });
      toast.success("Message deleted");
      setDeleteTarget(null);
      fetchMessages();
    } catch {
      toast.error("Failed to delete message");
    } finally {
      setDeleteLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100 px-6 py-5 sticky top-0 z-20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-xl">
              ☀️
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Splash Messages</h1>
              <p className="text-sm text-gray-400">
                Greetings &amp; events shown on the user app splash screen
              </p>
            </div>
          </div>
          <button
            onClick={openCreate}
            id="add-splash-message-btn"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm rounded-xl shadow-sm shadow-amber-200 transition-all hover:shadow-md hover:shadow-amber-200 active:scale-95"
          >
            <FiPlus size={16} />
            Add Message
          </button>
        </div>

        {/* Search */}
        <div className="mt-4 relative max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
          <input
            type="text"
            placeholder="Search messages…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-amber-400 transition-colors bg-gray-50"
          />
        </div>

        {/* Filter tabs */}
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filter === f
                  ? "bg-amber-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {f === "all" && "All"}
              {f === "greeting" && "☀️ Greetings"}
              {f === "event" && "🎉 Events"}
              {f === "active" && "✅ Active"}
              {f === "inactive" && "⏸ Inactive"}
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  filter === f ? "bg-white/30 text-white" : "bg-white text-gray-500"
                }`}
              >
                {counts[f]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      <div className="p-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total", value: counts.all, color: "bg-gray-100 text-gray-700", icon: "📋" },
            { label: "Active", value: counts.active, color: "bg-emerald-50 text-emerald-700", icon: "✅" },
            { label: "Events", value: counts.event, color: "bg-purple-50 text-purple-700", icon: "🎉" },
            { label: "Greetings", value: counts.greeting, color: "bg-sky-50 text-sky-700", icon: "☀️" },
          ].map(({ label, value, color, icon }) => (
            <div key={label} className={`rounded-2xl p-4 ${color} border border-white shadow-sm`}>
              <div className="text-2xl mb-1">{icon}</div>
              <div className="text-2xl font-bold">{value}</div>
              <div className="text-xs font-medium opacity-70">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          ) : filtered.length === 0 ? (
            <EmptyState filter={filter} />
          ) : (
            filtered.map((msg) => (
              <div
                key={msg.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3"
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-3xl leading-none flex-shrink-0">{msg.emoji}</span>
                    <div className="min-w-0">
                      <p className="font-bold text-gray-800 text-sm leading-tight truncate">
                        {msg.title}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                        <TypeBadge type={msg.type} />
                        <StatusBadge row={msg} />
                      </div>
                    </div>
                  </div>

                  {/* Toggle */}
                  <button
                    onClick={() => handleToggle(msg)}
                    disabled={togglingId === msg.id}
                    title={msg.is_active ? "Deactivate" : "Activate"}
                    className="flex-shrink-0 transition-opacity disabled:opacity-40"
                  >
                    {togglingId === msg.id ? (
                      <span className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin inline-block" />
                    ) : msg.is_active ? (
                      <FiToggleRight size={28} className="text-emerald-500" />
                    ) : (
                      <FiToggleLeft size={28} className="text-gray-300" />
                    )}
                  </button>
                </div>

                {/* Message preview */}
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                  {msg.message}
                </p>

                {/* Date range */}
                <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                  <FiCalendar size={12} />
                  {formatDate(msg.start_date)}
                  <span className="text-gray-300">→</span>
                  {formatDate(msg.end_date)}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-gray-50 mt-auto">
                  <button
                    onClick={() => openEdit(msg)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-semibold transition-colors"
                  >
                    <FiEdit2 size={13} /> Edit
                  </button>
                  <button
                    onClick={() => setDeleteTarget(msg)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 text-xs font-semibold transition-colors"
                  >
                    <FiTrash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modals */}
      <MessageModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initial={editTarget}
        loading={modalLoading}
      />
      <DeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        loading={deleteLoading}
        message={deleteTarget}
      />
    </div>
  );
}
