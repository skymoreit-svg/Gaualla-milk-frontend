"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Calendar, CheckCircle2, Edit2, Loader, Plus, RefreshCw, Search, Trash2 } from "lucide-react";

const defaultForm = {
  offer_title: "",
  offer_percent: "",
  start_time: "",
  end_time: "",
  status: "active",
};

const statusOptions = ["active", "inactive", "scheduled", "expired"];

export default function OffersPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({ limit: 20, offset: 0, total: 0 });
  const [formData, setFormData] = useState(defaultForm);
  const [editingOfferId, setEditingOfferId] = useState(null);
  const [formMode, setFormMode] = useState("create");
  const [fetchingSingle, setFetchingSingle] = useState(false);

  const apiBase = process.env.NEXT_PUBLIC_ADMIN_OFFERS_API_URL || "http://localhost:8000/admin/offers";

  const getAuthHeaders = () => {
    const token = localStorage.getItem("adminToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const parseOffers = (payload) => {
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.offers)) return payload.offers;
    if (Array.isArray(payload?.offer)) return payload.offer;
    return [];
  };

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        limit: String(pagination.limit),
        offset: String(pagination.offset),
        status: selectedStatus,
      });

      const { data } = await axios.get(`${apiBase}?${params.toString()}`, {
        headers: getAuthHeaders(),
      });

      if (data.success) {
        setOffers(parseOffers(data));
        setPagination((prev) => ({
          ...prev,
          total: data.pagination?.total ?? 0,
          limit: data.pagination?.limit ?? prev.limit,
          offset: data.pagination?.offset ?? prev.offset,
        }));
      } else {
        toast.error(data.message || "Failed to load offers");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load offers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatus, pagination.offset, pagination.limit]);

  const filteredOffers = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    return offers.filter((offer) => {
      const title = String(offer.offer_title || offer.title || "").toLowerCase();
      const status = String(offer.status || "").toLowerCase();
      return title.includes(search) || status.includes(search);
    });
  }, [offers, searchTerm]);

  const resetForm = () => {
    setFormData(defaultForm);
    setEditingOfferId(null);
    setFormMode("create");
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const normalizeOffer = (offer) => ({
    offer_title: offer.offer_title || offer.title || "",
    offer_percent: offer.offer_percent ?? offer.percent ?? "",
    start_time: offer.start_time ? String(offer.start_time).slice(0, 16) : "",
    end_time: offer.end_time ? String(offer.end_time).slice(0, 16) : "",
    status: offer.status || "active",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.offer_title || !formData.offer_percent || !formData.start_time || !formData.end_time) {
      toast.error("Please fill all offer fields.");
      return;
    }

    const payload = {
      offer_title: formData.offer_title.trim(),
      offer_percent: Number(formData.offer_percent),
      start_time: new Date(formData.start_time).toISOString(),
      end_time: new Date(formData.end_time).toISOString(),
      status: formData.status,
    };

    try {
      setSaving(true);
      const tokenHeaders = { headers: { ...getAuthHeaders(), "Content-Type": "application/json" } };

      const response = editingOfferId
        ? await axios.put(`${apiBase}/${editingOfferId}`, payload, tokenHeaders)
        : await axios.post(apiBase, payload, tokenHeaders);

      if (response.data.success) {
        toast.success(editingOfferId ? "Offer updated successfully" : "Offer created successfully");
        resetForm();
        fetchOffers();
      } else {
        toast.error(response.data.message || "Unable to save offer");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to save offer");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (offerId) => {
    try {
      setFetchingSingle(true);
      const { data } = await axios.get(`${apiBase}/${offerId}`, {
        headers: getAuthHeaders(),
      });

      const offer = data.data || data.offer || data;
      if (data.success && offer) {
        setFormData(normalizeOffer(offer));
        setEditingOfferId(offerId);
        setFormMode("edit");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        toast.error(data.message || "Failed to load offer");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load offer");
    } finally {
      setFetchingSingle(false);
    }
  };

  const handleDelete = async (offerId) => {
    if (!window.confirm("Delete this offer?")) return;

    try {
      setDeletingId(offerId);
      const { data } = await axios.delete(`${apiBase}/${offerId}`, {
        headers: getAuthHeaders(),
      });

      if (data.success) {
        toast.success("Offer deleted successfully");
        fetchOffers();
      } else {
        toast.error(data.message || "Failed to delete offer");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete offer");
    } finally {
      setDeletingId(null);
    }
  };

  const handleStatusChange = async (offerId, status) => {
    try {
      setUpdatingStatusId(offerId);
      const { data } = await axios.patch(
        `${apiBase}/${offerId}/status`,
        { status },
        { headers: { ...getAuthHeaders(), "Content-Type": "application/json" } }
      );

      if (data.success) {
        toast.success("Offer status updated");
        fetchOffers();
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const handlePrevPage = () => {
    setPagination((prev) => ({ ...prev, offset: Math.max(0, prev.offset - prev.limit) }));
  };

  const handleNextPage = () => {
    if (pagination.offset + pagination.limit < pagination.total) {
      setPagination((prev) => ({ ...prev, offset: prev.offset + prev.limit }));
    }
  };

  const currentPage = Math.floor(pagination.offset / pagination.limit) + 1;
  const totalPages = Math.max(1, Math.ceil(pagination.total / pagination.limit));

  const formatDateTime = (value) => {
    if (!value) return "N/A";
    return new Date(value).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto px-6 py-8 font-sans">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text">Offers</h1>
          <p className="text-sm text-text mt-1">Create, update, and manage active offers</p>
        </div>

        <button
          type="button"
          onClick={fetchOffers}
          className="inline-flex items-center gap-2 bg-background border border-highlight px-4 py-2 rounded-lg font-semibold text-text hover:bg-background transition"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <div className="bg-background rounded-2xl border border-highlight shadow-sm p-6 h-fit sticky top-4">
          <div className="flex items-center justify-between gap-3 mb-5">
            <div>
              <h2 className="text-xl font-bold text-text">
                {formMode === "edit" ? "Edit Offer" : "Create Offer"}
              </h2>
              <p className="text-sm text-gray-700">
                {formMode === "edit" ? "Update the selected offer" : "Add a new promotional offer"}
              </p>
            </div>

            {formMode === "edit" && (
              <button
                type="button"
                onClick={resetForm}
                className="text-sm font-medium text-text hover:text-text"
              >
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Offer title</label>
              <input
                name="offer_title"
                value={formData.offer_title}
                onChange={handleFormChange}
                placeholder="Summer Sale"
                className="w-full rounded-lg border border-highlight px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">Offer percent</label>
              <input
                type="number"
                name="offer_percent"
                value={formData.offer_percent}
                onChange={handleFormChange}
                placeholder="20"
                min="0"
                max="100"
                className="w-full rounded-lg border border-highlight px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-text mb-1">Start time</label>
                <input
                  type="datetime-local"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleFormChange}
                  className="w-full rounded-lg border border-highlight px-4 py-3 outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">End time</label>
                <input
                  type="datetime-local"
                  name="end_time"
                  value={formData.end_time}
                  onChange={handleFormChange}
                  className="w-full rounded-lg border border-highlight px-4 py-3 outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleFormChange}
                className="w-full rounded-lg border border-highlight px-4 py-3 outline-none focus:border-primary bg-background"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={saving || fetchingSingle}
              className="inline-flex items-center justify-center gap-2 w-full rounded-lg bg-primary px-4 py-3 font-semibold text-white hover:bg-primary disabled:opacity-70 disabled:cursor-not-allowed transition"
            >
              {saving || fetchingSingle ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              {formMode === "edit" ? "Update Offer" : "Create Offer"}
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="bg-background border border-highlight rounded-2xl p-4 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-[#252729b8] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by title or status..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-highlight outline-none focus:border-primary"
                />
              </div>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded-lg border border-highlight px-4 py-3 bg-background outline-none focus:border-primary"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-background rounded-2xl border border-highlight shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-12 text-center">
                <Loader className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                <p className="text-text">Loading offers...</p>
              </div>
            ) : filteredOffers.length === 0 ? (
              <div className="p-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-text text-lg">No offers found</p>
                <p className="text-gray-700">Create an offer or adjust your filters</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-background border-b border-highlight">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text">Title</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text">Percent</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text">Schedule</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOffers.map((offer) => {
                      const offerId = offer.id;

                      return (
                        <tr key={offerId} className="border-b border-highlight hover:bg-background transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-text">{offer.offer_title || offer.title}</div>
                          </td>
                          <td className="px-6 py-4 text-text">{offer.offer_percent ?? offer.percent}%</td>
                          <td className="px-6 py-4 text-sm text-text">
                            <div className="flex items-center gap-2 mb-1">
                              <Calendar className="w-4 h-4 text-gray-[#252729b8]" />
                              <span>{formatDateTime(offer.start_time)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-[#252729b8]" />
                              <span>{formatDateTime(offer.end_time)}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={offer.status || "active"}
                              onChange={(e) => handleStatusChange(offerId, e.target.value)}
                              disabled={updatingStatusId === offerId}
                              className="rounded-full border border-highlight px-3 py-2 bg-background text-sm outline-none disabled:opacity-60"
                            >
                              {statusOptions.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleEdit(offerId)}
                                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-primary hover:bg-primary transition"
                              >
                                <Edit2 className="w-4 h-4" />
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(offerId)}
                                disabled={deletingId === offerId}
                                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50 transition disabled:opacity-60"
                              >
                                {deletingId === offerId ? (
                                  <Loader className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 text-sm text-text">
            <p>
              Showing <strong>{filteredOffers.length}</strong> of {pagination.total} offers
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevPage}
                disabled={pagination.offset === 0}
                className="rounded-lg border border-highlight px-4 py-2 bg-background disabled:opacity-60"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                onClick={handleNextPage}
                disabled={pagination.offset + pagination.limit >= pagination.total}
                className="rounded-lg border border-highlight px-4 py-2 bg-background disabled:opacity-60"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
