"use client";
import React, { useState, useEffect } from "react";
import { 
  Search, 
  RefreshCw, 
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Filter
} from "lucide-react";
import axios from "axios";
import { adminurl } from "../../adminCompo/adminapis";
import toast from "react-hot-toast";
import Link from "next/link";

const WebhooksPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ total: 0, limit: 50, offset: 0 });
  const [filters, setFilters] = useState({
    event_type: "",
    processed: "",
    start_date: "",
    end_date: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchWebhookEvents();
  }, [currentPage, filters]);

  const fetchWebhookEvents = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        limit: pagination.limit.toString(),
        offset: ((currentPage - 1) * pagination.limit).toString(),
      });

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== "") params.append(key, value);
      });

      const response = await axios.get(
        `${adminurl}/payments/webhooks?${params.toString()}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        setEvents(response.data.data.events || []);
        setPagination(response.data.data.pagination || pagination);
      } else {
        toast.error("Failed to fetch webhook events");
      }
    } catch (error) {
      console.error("Error fetching webhook events:", error);
      toast.error("Error loading webhook events");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getEventTypeBadge = (eventType) => {
    if (eventType?.includes("captured") || eventType?.includes("paid")) {
      return "bg-green-100 text-accent";
    }
    if (eventType?.includes("failed")) {
      return "bg-red-100 text-red-700";
    }
    if (eventType?.includes("refund")) {
      return "bg-orange-100 text-highlight";
    }
    if (eventType?.includes("expired") || eventType?.includes("cancelled")) {
      return "bg-background00 text-text";
    }
    return "bg-primary text-primary";
  };

  const getProcessedBadge = (processed) => {
    return processed
      ? "bg-green-100 text-accent"
      : "bg-yellow-100 text-highlight";
  };

  const formatCurrency = (amount) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <div className="p-8 bg-background min-h-screen">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text">Webhook Events</h1>
          <p className="text-text mt-1">Audit trail of all payment webhook events</p>
        </div>
        <Link
          href="/admin/payments"
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-primary transition"
        >
          Back to Dashboard
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-background border border-highlight rounded-lg p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={filters.event_type}
            onChange={(e) => setFilters({ ...filters, event_type: e.target.value })}
            className="px-4 py-2 border border-highlight rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Event Types</option>
            <option value="payment.captured">Payment Captured</option>
            <option value="payment.failed">Payment Failed</option>
            <option value="payment_link.paid">Payment Link Paid</option>
            <option value="payment_link.expired">Payment Link Expired</option>
            <option value="payment_link.cancelled">Payment Link Cancelled</option>
            <option value="refund.created">Refund Created</option>
            <option value="refund.processed">Refund Processed</option>
          </select>

          <select
            value={filters.processed}
            onChange={(e) => setFilters({ ...filters, processed: e.target.value })}
            className="px-4 py-2 border border-highlight rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Status</option>
            <option value="true">Processed</option>
            <option value="false">Pending</option>
          </select>

          <input
            type="date"
            placeholder="Start Date"
            value={filters.start_date}
            onChange={(e) => setFilters({ ...filters, start_date: e.target.value })}
            className="px-4 py-2 border border-highlight rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <div className="flex gap-2">
            <input
              type="date"
              placeholder="End Date"
              value={filters.end_date}
              onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
              className="flex-1 px-4 py-2 border border-highlight rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={() => {
                setFilters({
                  event_type: "",
                  processed: "",
                  start_date: "",
                  end_date: ""
                });
                setCurrentPage(1);
              }}
              className="px-4 py-2 text-text border border-highlight rounded-lg hover:bg-background transition"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-background rounded-lg shadow border border-highlight overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-text">Loading webhook events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="p-12 text-center">
            <AlertCircle className="w-12 h-12 text-gray-[#252729b8] mx-auto mb-4" />
            <p className="text-text">No webhook events found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-background border-b border-highlight">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-text uppercase">Event ID</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-text uppercase">Event Type</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-text uppercase">Entity ID</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-text uppercase">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-text uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-text uppercase">Processed</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-text uppercase">Received At</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-text uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {events.map((event) => (
                    <tr key={event.id} className="hover:bg-background transition">
                      <td className="px-6 py-4">
                        <div className="text-sm font-mono text-text">
                          {event.event_id?.substring(0, 20) || event.id}...
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${getEventTypeBadge(event.event_type)}`}>
                          {event.event_type || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-text">
                          {event.entity_id?.substring(0, 20) || "N/A"}...
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-text">
                          {event.amount ? formatCurrency(event.amount) : "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${getEventTypeBadge(event.status)}`}>
                          {event.status || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${getProcessedBadge(event.processed)}`}>
                          {event.processed ? (
                            <span className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Processed
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" /> Pending
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-text">
                        {formatDate(event.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedEvent(event)}
                          className="text-primary hover:text-primary transition"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-highlight flex justify-between items-center">
                <div className="text-sm text-text">
                  Showing {((currentPage - 1) * pagination.limit) + 1} to{" "}
                  {Math.min(currentPage * pagination.limit, pagination.total)} of{" "}
                  {pagination.total} events
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-highlight rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background transition"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-highlight rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background transition"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-text">Webhook Event Details</h2>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-[#252729b8] hover:text-text"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-text">Event ID</label>
                  <p className="text-sm font-mono text-text mt-1">{selectedEvent.event_id || selectedEvent.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text">Event Type</label>
                  <p className="text-sm text-text mt-1">{selectedEvent.event_type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text">Entity Type</label>
                  <p className="text-sm text-text mt-1">{selectedEvent.entity_type || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text">Entity ID</label>
                  <p className="text-sm font-mono text-text mt-1">{selectedEvent.entity_id || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text">Payment ID</label>
                  <p className="text-sm font-mono text-text mt-1">{selectedEvent.payment_id || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text">Payment Link ID</label>
                  <p className="text-sm font-mono text-text mt-1">{selectedEvent.payment_link_id || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text">Amount</label>
                  <p className="text-sm text-text mt-1">{selectedEvent.amount ? formatCurrency(selectedEvent.amount) : "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text">Status</label>
                  <p className="text-sm text-text mt-1">{selectedEvent.status || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text">Processed</label>
                  <p className="text-sm text-text mt-1">
                    {selectedEvent.processed ? (
                      <span className="text-accent">Yes</span>
                    ) : (
                      <span className="text-highlight">No</span>
                    )}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text">Signature Verified</label>
                  <p className="text-sm text-text mt-1">
                    {selectedEvent.signature_verified ? (
                      <span className="text-accent">Yes</span>
                    ) : (
                      <span className="text-red-600">No</span>
                    )}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-text">Received At</label>
                  <p className="text-sm text-text mt-1">{formatDate(selectedEvent.created_at)}</p>
                </div>
                {selectedEvent.processed_at && (
                  <div>
                    <label className="text-sm font-medium text-text">Processed At</label>
                    <p className="text-sm text-text mt-1">{formatDate(selectedEvent.processed_at)}</p>
                  </div>
                )}
              </div>

              {selectedEvent.error_message && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <label className="text-sm font-medium text-red-700">Error Message</label>
                  <p className="text-sm text-red-600 mt-1">{selectedEvent.error_message}</p>
                </div>
              )}

              {selectedEvent.payload && (
                <div>
                  <label className="text-sm font-medium text-text">Payload</label>
                  <pre className="mt-2 p-4 bg-background border border-highlight rounded-lg text-xs overflow-x-auto">
                    {JSON.stringify(JSON.parse(selectedEvent.payload), null, 2)}
                  </pre>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 bg-gray-300 text-text rounded-lg hover:bg-gray-400 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebhooksPage;
