import { io } from "socket.io-client";
import { API_BASE_URL } from "@/app/config/constants";

let sockets = {};

export function getSocket(namespace, token) {
  const key = namespace;

  if (sockets[key]?.connected) {
    return sockets[key];
  }

  const socket = io(`${API_BASE_URL}${namespace}`, {
    auth: { token },
    query: { token },
    withCredentials: true,
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
  });

  socket.on("connect", () => {
    console.log(`Socket connected: ${namespace}`);
  });

  socket.on("connect_error", (err) => {
    console.error(`Socket connection error (${namespace}):`, err.message);
  });

  sockets[key] = socket;
  return socket;
}

export function disconnectSocket(namespace) {
  const key = namespace;
  if (sockets[key]) {
    sockets[key].disconnect();
    delete sockets[key];
  }
}

export function getAdminSocket() {
  const adminCookie = document.cookie.split(";").find((c) => c.trim().startsWith("admin="));
  const token = adminCookie?.split("=")[1];
  if (!token) return null;
  return getSocket("/admin", token);
}

export function getTrackingSocket() {
  return getSocket("/tracking");
}
