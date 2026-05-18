"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { adminurl } from "./adminapis";
import { getAdminSocket } from "@/app/components/utils/socketClient";
import { FaBell, FaTimes } from "react-icons/fa";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get(`${adminurl}/notifications?limit=10`, { withCredentials: true });
      if (data.success) {
        setNotifications(data.notifications);
        setUnreadCount(data.unread_count);
      }
    } catch (err) {
      console.error("Fetch notifications error:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);

    const socket = getAdminSocket();
    if (socket) {
      socket.on("order:new", () => {
        fetchNotifications();
        try {
          const audio = new Audio("/notification.mp3");
          audio.play().catch(() => {});
        } catch {}
      });
      socket.on("order:status_changed", () => fetchNotifications());
      socket.on("order:delivered", () => fetchNotifications());
      socket.on("order:rejected", () => fetchNotifications());
      socket.on("payment:cod_collected", () => fetchNotifications());
    }

    return () => {
      clearInterval(interval);
      if (socket) {
        socket.off("order:new");
        socket.off("order:status_changed");
        socket.off("order:delivered");
        socket.off("order:rejected");
        socket.off("payment:cod_collected");
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkRead = async () => {
    try {
      await axios.put(`${adminurl}/notifications/read`, {}, { withCredentials: true });
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: 1 })));
    } catch (err) {
      console.error("Mark read error:", err);
    }
  };

  const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = (now - d) / 1000;
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return d.toLocaleDateString();
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-white transition"
      >
        <FaBell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-background rounded-xl shadow-2xl border z-50 max-h-[400px] overflow-y-auto">
          <div className="flex justify-between items-center p-3 border-b sticky top-0 bg-background">
            <h3 className="font-bold text-text">Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={handleMarkRead} className="text-xs text-primary hover:underline">
                Mark all read
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <p className="text-center text-gray-[#252729b8] py-6 text-sm">No notifications</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3 border-b last:border-0 hover:bg-background ${!n.is_read ? "bg-primary" : ""}`}
              >
                <p className="text-sm font-medium text-text">{n.title}</p>
                <p className="text-xs text-gray-700 mt-0.5">{n.body}</p>
                <p className="text-xs text-gray-[#252729b8] mt-1">{formatTime(n.created_at)}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
