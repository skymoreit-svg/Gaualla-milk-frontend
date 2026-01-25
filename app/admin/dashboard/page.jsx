"use client";
import React, { useState, useEffect } from "react";
import { Users, Package, ShoppingCart, TrendingUp, RefreshCw } from "lucide-react";
import axios from "axios";
import { adminurl } from "../adminCompo/adminapis";
import Link from "next/link";
import toast from "react-hot-toast";

// Enable credentials
axios.defaults.withCredentials = true;

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    todayRevenue: 0,
  });
  const [orderBreakdown, setOrderBreakdown] = useState({
    pending: 0,
    processing: 0,
    "out for_delivery": 0,
    completed: 0,
    cancelled: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${adminurl}/dashboard/stats`, {
        withCredentials: true
      });

      if (response.data.success && response.data.data) {
        const data = response.data.data;
        
        // Update stats
        setStats({
          totalUsers: data.totalUsers || 0,
          totalProducts: data.totalProducts || 0,
          totalOrders: data.totalOrders || 0,
          todayRevenue: data.todayRevenue || 0,
        });

        // Update order breakdown
        setOrderBreakdown(data.orderStatusBreakdown || {
          pending: 0,
          processing: 0,
          "out for_delivery": 0,
          completed: 0,
          cancelled: 0,
        });

        // Update recent orders
        setRecentOrders(data.recentOrders || []);

        // Update low stock products
        setLowStockProducts(data.lowStockProducts || []);
      } else {
        toast.error("Failed to load dashboard data");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    const lowerStatus = (status || "").toLowerCase();
    if (lowerStatus.includes("completed")) return "bg-green-100 text-green-700";
    if (lowerStatus.includes("pending")) return "bg-yellow-100 text-yellow-700";
    if (lowerStatus.includes("out") || lowerStatus.includes("delivery")) return "bg-blue-100 text-blue-700";
    if (lowerStatus.includes("processing")) return "bg-purple-100 text-purple-700";
    if (lowerStatus.includes("cancelled")) return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  const statsCards = [
    { 
      label: "Total Users", 
      value: stats.totalUsers.toString(), 
      icon: Users, 
      color: "bg-blue-500" 
    },
    { 
      label: "Total Products", 
      value: stats.totalProducts.toString(), 
      icon: Package, 
      color: "bg-green-500" 
    },
    { 
      label: "Total Orders", 
      value: stats.totalOrders.toString(), 
      icon: ShoppingCart, 
      color: "bg-purple-500" 
    },
    { 
      label: "Today's Revenue", 
      value: formatCurrency(stats.todayRevenue), 
      icon: TrendingUp, 
      color: "bg-orange-500" 
    },
  ];

  const orderBreakdownItems = [
    { status: "Out For_delivery", count: orderBreakdown["out for_delivery"] || 0 },
    { status: "Pending", count: orderBreakdown.pending || 0 },
    { status: "Processing", count: orderBreakdown.processing || 0 },
    { status: "Completed", count: orderBreakdown.completed || 0 },
    { status: "Cancelled", count: orderBreakdown.cancelled || 0 },
  ];

  if (loading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of your store</p>
        </div>
        <button
          onClick={fetchDashboardData}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-800 text-lg font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg text-white`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Breakdown & Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {/* Order Status Breakdown */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Order Status Breakdown</h2>
          <div className="space-y-4">
            {orderBreakdownItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <p className="text-gray-700 font-medium">{item.status}</p>
                <span className="text-gray-900 font-bold text-lg">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Low Stock Products</h2>
          {lowStockProducts.length > 0 ? (
            <div className="space-y-4">
              {lowStockProducts.map((product, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <p className="text-gray-700 font-medium">{product.name}</p>
                  <span className={`font-bold text-lg ${product.stock === 0 ? "text-red-600" : "text-orange-600"}`}>
                    {product.stock}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">All products are well stocked</p>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
          <Link 
            href="/admin/orders" 
            className="text-green-600 hover:text-green-700 font-semibold text-sm"
          >
            View all
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Order Number</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Customer</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Payment</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Amount</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No recent orders
                  </td>
                </tr>
              ) : (
                recentOrders.map((order, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      <Link 
                        href={`/admin/orders/${order.id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        #{order.id}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">{order.user_name || "N/A"}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                        order.payment_status === "paid" 
                          ? "bg-green-100 text-green-700" 
                          : order.payment_status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {order.payment_status || "pending"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 font-semibold">
                      {formatCurrency(order.amount)}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">{formatDate(order.date)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
