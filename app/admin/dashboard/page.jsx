"use client";
import React from "react";
import { Users, Package, ShoppingCart, TrendingUp } from "lucide-react";

const DashboardPage = () => {
  // Mock data
  const stats = [
    { label: "Total Users", value: "0", icon: Users, color: "bg-blue-500" },
    { label: "Total Products", value: "0", icon: Package, color: "bg-green-500" },
    { label: "Total Orders", value: "0", icon: ShoppingCart, color: "bg-purple-500" },
    { label: "Today's Revenue", value: "₹0.00", icon: TrendingUp, color: "bg-orange-500" },
  ];

  const orderBreakdown = [
    { status: "Out For_delivery", count: 0 },
    { status: "Pending", count: 0 },
    { status: "Completed", count: 0 },
  ];

  const recentOrders = [
    // {
    //   id: "QD1763968517352001",
    //   status: "out for_delivery",
    //   amount: "₹249.00",
    //   date: "24 Nov 2025, 12:45 pm",
    // },
    // {
    //   id: "QD1763968517352002",
    //   status: "completed",
    //   amount: "₹500.00",
    //   date: "23 Nov 2025, 10:30 am",
    // },
    // {
    //   id: "QD1763968517352003",
    //   status: "pending",
    //   amount: "₹150.00",
    //   date: "22 Nov 2025, 02:15 pm",
    // },
  ];

  const lowStockProducts = [
    { name: "Product A", stock: 0 },
    { name: "Product B", stock: 0 },
  ];

  const getStatusColor = (status) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes("completed")) return "bg-green-100 text-green-700";
    if (lowerStatus.includes("pending")) return "bg-yellow-100 text-yellow-700";
    if (lowerStatus.includes("out")) return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your store</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => {
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
            {orderBreakdown.map((item, idx) => (
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
                  <span className="text-gray-900 font-bold text-lg">{product.stock}</span>
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
          <a href="#" className="text-green-600 hover:text-green-700 font-semibold text-sm">
            View all
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Order Number</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Amount</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 font-semibold">{order.amount}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
