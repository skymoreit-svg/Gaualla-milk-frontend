"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Mail, Phone, Calendar, Users, Loader, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

const NewsletterSubscribersPage = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [pagination, setPagination] = useState({
    limit: 20,
    offset: 0,
    total: 0,
  });

  const newsletterApiUrl = process.env.NEXT_PUBLIC_NEWSLETTER_API_URL ||
    "https://api.gauallamilk.com/api/newsletter/subscribers";
  // "http://localhost:8000/api/newsletter/subscribers";

  useEffect(() => {
    fetchSubscribers();
  }, [pagination.limit, pagination.offset]);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const url = `${newsletterApiUrl}?limit=${pagination.limit}&offset=${pagination.offset}`;

      // Try with credentials first (cookie-based auth)
      const { data } = await axios.get(url, {
        withCredentials: true,
      });

      if (data.success) {
        setSubscribers(data.data || []);
        setPagination((prev) => ({
          ...prev,
          total: data.pagination?.total || 0,
          limit: data.pagination?.limit || 20,
          offset: data.pagination?.offset || 0,
        }));
      } else {
        toast.error(data.message || "Failed to load subscribers");
      }
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      toast.error(error.response?.data?.message || "Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubscriber = async (subscriberId) => {
    if (!window.confirm("Are you sure you want to delete this subscriber?")) {
      return;
    }

    try {
      setDeleting(subscriberId);
      const deleteUrl = `${newsletterApiUrl}/${subscriberId}`;

      const { data } = await axios.delete(deleteUrl, {
        withCredentials: true,
      });

      if (data.success) {
        toast.success("Subscriber deleted successfully");
        // Refresh the list
        fetchSubscribers();
      } else {
        toast.error(data.message || "Failed to delete subscriber");
      }
    } catch (error) {
      console.error("Error deleting subscriber:", error);
      toast.error(error.response?.data?.message || "Failed to delete subscriber");
    } finally {
      setDeleting(null);
    }
  };

  const handlePrevPage = () => {
    if (pagination.offset > 0) {
      setPagination((prev) => ({
        ...prev,
        offset: Math.max(0, prev.offset - prev.limit),
      }));
    }
  };

  const handleNextPage = () => {
    if (pagination.offset + pagination.limit < pagination.total) {
      setPagination((prev) => ({
        ...prev,
        offset: prev.offset + prev.limit,
      }));
    }
  };

  const currentPage = Math.floor(pagination.offset / pagination.limit) + 1;
  const totalPages = Math.ceil(pagination.total / pagination.limit);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="p-8 bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-text">Loading newsletter subscribers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-text">
              Newsletter Subscribers
            </h1>
          </div>
          <p className="text-text">Manage your newsletter email subscribers</p>
        </div>

        {/* Stats Card */}
        <div className="bg-background rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <Users className="w-10 h-10 text-primary mr-4" />
              <div>
                <p className="text-text text-sm">Total Subscribers</p>
                <p className="text-2xl font-bold text-text">{pagination.total}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="w-10 h-10 text-accent mr-4" />
              <div>
                <p className="text-text text-sm">Page</p>
                <p className="text-2xl font-bold text-text">
                  {totalPages > 0 ? currentPage : 0} / {totalPages}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="w-10 h-10 text-primary mr-4" />
              <div>
                <p className="text-text text-sm">Per Page</p>
                <p className="text-2xl font-bold text-text">{pagination.limit}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Subscribers Table */}
        <div className="bg-background rounded-lg shadow-md overflow-hidden">
          {subscribers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-background00 border-b border-highlight">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text">
                      Subscribed On
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((subscriber) => (
                    <tr
                      key={subscriber.id}
                      className="border-b border-highlight hover:bg-background transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-[#252729b8]" />
                          <span className="text-text font-medium">
                            {subscriber.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-[#252729b8]" />
                          <span className="text-text">{subscriber.phone || "N/A"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-[#252729b8]" />
                          <span className="text-text">
                            {formatDate(subscriber.created_at)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-accent">
                          {subscriber.status || "Active"}
                        </span>
                      </td>
                      {/* <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            handleDeleteSubscriber(subscriber.id)
                          }
                          disabled={deleting === subscriber.id}
                          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {deleting === subscriber.id ? (
                            <Loader className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                          Delete
                        </button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-text text-lg">No subscribers yet</p>
              <p className="text-gray-700">Newsletter subscribers will appear here</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {subscribers.length > 0 && (
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-text">
              Showing {pagination.offset + 1} to{" "}
              {Math.min(pagination.offset + pagination.limit, pagination.total)} of{" "}
              {pagination.total} subscribers
            </p>
            <div className="flex gap-2">
              <button
                onClick={handlePrevPage}
                disabled={pagination.offset === 0}
                className="flex items-center gap-2 px-4 py-2 bg-background border border-highlight rounded-lg text-text hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <span className="flex items-center px-4 py-2 text-text">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={pagination.offset + pagination.limit >= pagination.total}
                className="flex items-center gap-2 px-4 py-2 bg-background border border-highlight rounded-lg text-text hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterSubscribersPage;
