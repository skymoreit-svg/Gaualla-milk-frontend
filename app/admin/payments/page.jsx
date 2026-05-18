"use client";
import React, { useState, useEffect } from "react";
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  RefreshCw, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Search,
  Download,
  Eye
} from "lucide-react";
import axios from "axios";
import { adminurl } from "../adminCompo/adminapis";
import toast from "react-hot-toast";
import Link from "next/link";

const PaymentsPage = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start_date: "",
    end_date: ""
  });

  useEffect(() => {
    fetchStatistics();
  }, [dateRange]);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (dateRange.start_date) params.append("start_date", dateRange.start_date);
      if (dateRange.end_date) params.append("end_date", dateRange.end_date);

      const response = await axios.get(
        `${adminurl}/payments/statistics?${params.toString()}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        setStatistics(response.data.data);
      } else {
        toast.error("Failed to fetch payment statistics");
      }
    } catch (error) {
      console.error("Error fetching statistics:", error);
      toast.error("Error loading payment statistics");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  if (loading) {
    return (
      <div className="p-8 bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-text">Loading payment statistics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-background min-h-screen">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text">Payment Management</h1>
          <p className="text-text mt-1">Overview and statistics of all payments</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/payments/transactions"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary transition"
          >
            View Transactions
          </Link>
          <Link
            href="/admin/payments/refunds"
            className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent transition"
          >
            Manage Refunds
          </Link>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="bg-background border border-highlight rounded-lg p-5 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-text mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.start_date}
              onChange={(e) => setDateRange({ ...dateRange, start_date: e.target.value })}
              className="w-full px-4 py-2 border border-highlight rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-text mb-2">
              End Date
            </label>
            <input
              type="date"
              value={dateRange.end_date}
              onChange={(e) => setDateRange({ ...dateRange, end_date: e.target.value })}
              className="w-full px-4 py-2 border border-highlight rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            onClick={() => setDateRange({ start_date: "", end_date: "" })}
            className="px-4 py-2 text-text border border-highlight rounded-lg hover:bg-background transition"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      {statistics && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Total Revenue */}
            <div className="bg-background rounded-lg shadow border border-highlight p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-accent" />
                </div>
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-sm font-medium text-text mb-1">Total Revenue</h3>
              <p className="text-2xl font-bold text-text">
                {formatCurrency(statistics.revenue?.total || 0)}
              </p>
              <p className="text-xs text-gray-700 mt-2">
                From {formatNumber(statistics.transactions?.successful || 0)} successful transactions
              </p>
            </div>

            {/* Total Transactions */}
            <div className="bg-background rounded-lg shadow border border-highlight p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary rounded-lg">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-medium text-text mb-1">Total Transactions</h3>
              <p className="text-2xl font-bold text-text">
                {formatNumber(statistics.transactions?.total || 0)}
              </p>
              <p className="text-xs text-gray-700 mt-2">
                {formatNumber(statistics.transactions?.successful || 0)} successful
              </p>
            </div>

            {/* Payment Links */}
            <div className="bg-background rounded-lg shadow border border-highlight p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary rounded-lg">
                  <RefreshCw className="w-6 h-6 text-primary" />
                </div>
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-medium text-text mb-1">Payment Links</h3>
              <p className="text-2xl font-bold text-text">
                {formatNumber(statistics.payment_links?.total || 0)}
              </p>
              <p className="text-xs text-gray-700 mt-2">
                {formatNumber(statistics.payment_links?.paid || 0)} paid
              </p>
            </div>

            {/* Refunds */}
            <div className="bg-background rounded-lg shadow border border-highlight p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <XCircle className="w-6 h-6 text-highlight" />
                </div>
                <AlertCircle className="w-5 h-5 text-highlight" />
              </div>
              <h3 className="text-sm font-medium text-text mb-1">Total Refunds</h3>
              <p className="text-2xl font-bold text-text">
                {formatCurrency(statistics.refunds?.amount || 0)}
              </p>
              <p className="text-xs text-gray-700 mt-2">
                {formatNumber(statistics.refunds?.count || 0)} refunds processed
              </p>
            </div>
          </div>

          {/* Payment Methods Breakdown */}
          {statistics.payment_methods && statistics.payment_methods.length > 0 && (
            <div className="bg-background rounded-lg shadow border border-highlight p-6 mb-6">
              <h2 className="text-xl font-bold text-text mb-4">Payment Methods</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {statistics.payment_methods.map((method, index) => (
                  <div key={index} className="border border-highlight rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-text capitalize">
                        {method.payment_method || "Unknown"}
                      </span>
                      <span className="text-xs text-gray-700">
                        {formatNumber(method.count || 0)} transactions
                      </span>
                    </div>
                    <p className="text-lg font-bold text-text">
                      {formatCurrency(method.total || 0)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/admin/payments/transactions"
              className="bg-background rounded-lg shadow border border-highlight p-6 hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary rounded-lg">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-text">View All Transactions</h3>
                  <p className="text-sm text-text">Manage and track all payment transactions</p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/payments/refunds"
              className="bg-background rounded-lg shadow border border-highlight p-6 hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <RefreshCw className="w-6 h-6 text-highlight" />
                </div>
                <div>
                  <h3 className="font-bold text-text">Manage Refunds</h3>
                  <p className="text-sm text-text">Process and track refunds</p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/payments/webhooks"
              className="bg-background rounded-lg shadow border border-highlight p-6 hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary rounded-lg">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-text">Webhook Events</h3>
                  <p className="text-sm text-text">View payment webhook audit trail</p>
                </div>
              </div>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentsPage;
