"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Link from "next/link";
import { adminurl } from "../adminCompo/adminapis";
import RiderFormModal from "../adminCompo/RiderFormModal";
import { FaPlus, FaSearch, FaMotorcycle, FaCircle, FaTrash, FaExclamationTriangle } from "react-icons/fa";

export default function RidersPage() {
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [onlineFilter, setOnlineFilter] = useState("");
  const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 0 });
  const [showForm, setShowForm] = useState(false);
  const [editingRider, setEditingRider] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const fetchRiders = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ page: pagination.page, limit: 20 });
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (onlineFilter !== "") params.append("is_online", onlineFilter);
      if (search) params.append("search", search);

      const { data } = await axios.get(`${adminurl}/riders?${params}`, { withCredentials: true });
      if (data.success) {
        setRiders(data.riders);
        setPagination((p) => ({ ...p, ...data.pagination }));
      }
    } catch (err) {
      console.error("Fetch riders error:", err);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, statusFilter, onlineFilter, search]);

  useEffect(() => {
    fetchRiders();
  }, [fetchRiders]);

  const handleStatusChange = async (riderId, newStatus) => {
    try {
      await axios.put(`${adminurl}/riders/${riderId}/status`, { status: newStatus }, { withCredentials: true });
      fetchRiders();
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      setDeleteError("");
      const { data } = await axios.delete(`${adminurl}/riders/${deleteTarget.id}`, { withCredentials: true });
      if (data.success) {
        setDeleteTarget(null);
        fetchRiders();
      }
    } catch (err) {
      setDeleteError(err.response?.data?.message || "Failed to delete rider");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-text">Rider Management</h1>
        <button
          onClick={() => { setEditingRider(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent transition"
        >
          <FaPlus /> Add Rider
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-3 text-gray-[#252729b8]" />
          <input
            type="text"
            placeholder="Search by name, phone, email..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPagination((p) => ({ ...p, page: 1 })); }}
          />
        </div>
        <select
          className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPagination((p) => ({ ...p, page: 1 })); }}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
        </select>
        <select
          className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
          value={onlineFilter}
          onChange={(e) => { setOnlineFilter(e.target.value); setPagination((p) => ({ ...p, page: 1 })); }}
        >
          <option value="">All</option>
          <option value="1">Online</option>
          <option value="0">Offline</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-background rounded-lg shadow overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="bg-background">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-text uppercase">Rider</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-text uppercase">Phone</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-text uppercase">Vehicle</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-text uppercase">Status</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-text uppercase">Online</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-text uppercase">Active</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-text uppercase">Today</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-text uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={8} className="text-center py-10 text-gray-700">Loading...</td></tr>
            ) : riders.length === 0 ? (
              <tr><td colSpan={8} className="text-center py-10 text-gray-700">No riders found</td></tr>
            ) : (
              riders.map((rider) => (
                <tr key={rider.id} className="hover:bg-background">
                  <td className="px-4 py-3">
                    <Link href={`/admin/riders/${rider.id}`} className="font-medium text-primary hover:underline">
                      {rider.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-text">{rider.phone}</td>
                  <td className="px-4 py-3 text-text flex items-center gap-1">
                    <FaMotorcycle className="text-gray-[#252729b8]" />
                    {rider.vehicle_type} {rider.vehicle_number && `(${rider.vehicle_number})`}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${rider.status === "active" ? "bg-green-100 text-accent" :
                        rider.status === "suspended" ? "bg-red-100 text-red-700" : "bg-background00 text-text"}`}>
                      {rider.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <FaCircle className={`inline text-xs ${rider.is_online ? "text-accent" : "text-gray-600"}`} />
                  </td>
                  <td className="px-4 py-3 text-center font-medium">{rider.active_orders || 0}</td>
                  <td className="px-4 py-3 text-center text-text">{rider.today_deliveries || 0}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => { setEditingRider(rider); setShowForm(true); }}
                        className="text-xs px-2 py-1 bg-primary text-white rounded hover:bg-primary"
                      >
                        Edit
                      </button>
                      {rider.status === "active" ? (
                        <button
                          onClick={() => handleStatusChange(rider.id, "suspended")}
                          className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100"
                        >
                          Suspend
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(rider.id, "active")}
                          className="text-xs px-2 py-1 bg-green-50 text-accent rounded hover:bg-green-100"
                        >
                          Activate
                        </button>
                      )}
                      <button
                        onClick={() => { setDeleteTarget(rider); setDeleteError(""); }}
                        className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100"
                        title="Delete rider"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`px-3 py-1 rounded ${p === pagination.page ? "bg-accent text-white" : "bg-background00 hover:bg-gray-300"}`}
              onClick={() => setPagination((prev) => ({ ...prev, page: p }))}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {showForm && (
        <RiderFormModal
          rider={editingRider}
          onClose={() => { setShowForm(false); setEditingRider(null); }}
          onSaved={fetchRiders}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-background rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-[fadeIn_0.15s_ease-out]">
            <div className="flex items-center gap-3 px-6 pt-6 pb-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100">
                <FaExclamationTriangle className="text-red-600 text-lg" />
              </div>
              <h3 className="text-lg font-semibold text-text">Delete Rider</h3>
            </div>

            <div className="px-6 py-4">
              <p className="text-text">
                Are you sure you want to delete <span className="font-semibold">&quot;{deleteTarget.name}&quot;</span>?
              </p>
              <p className="text-sm text-gray-700 mt-2">
                This will deactivate the rider. Riders with active orders cannot be deleted.
              </p>
              {deleteError && (
                <p className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {deleteError}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-background border-t">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="px-4 py-2 text-sm font-medium text-text bg-background border border-highlight rounded-lg hover:bg-background transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition disabled:opacity-50 flex items-center gap-2"
              >
                {deleting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>
                    Deleting...
                  </>
                ) : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
