"use client";
import React, { useMemo, useState } from "react";
import { Search, Eye, ChevronDown } from "lucide-react";

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  // Mock orders data
  const mockOrders = [
    // {
    //   id: "QD1763968517352001",
    //   customer: { name: "Shiyam Kumar", phone: "9122053667" },
    //   items: "1 item(s)",
    //   amount: "₹249.00",
    //   status: "out for_delivery",
    //   payment: "pending",
    //   date: "24 Nov 2025, 12:45 pm",
    // },
    // {
    //   id: "QD1763968517352002",
    //   customer: { name: "Rahul Singh", phone: "9876543210" },
    //   items: "2 item(s)",
    //   amount: "₹500.00",
    //   status: "completed",
    //   payment: "paid",
    //   date: "23 Nov 2025, 10:30 am",
    // },
    // {
    //   id: "QD1763968517352003",
    //   customer: { name: "Priya Sharma", phone: "9123456789" },
    //   items: "3 item(s)",
    //   amount: "₹750.00",
    //   status: "pending",
    //   payment: "pending",
    //   date: "22 Nov 2025, 02:15 pm",
    // },
    // {
    //   id: "QD1763968517352004",
    //   customer: { name: "Amit Patel", phone: "9988776655" },
    //   items: "1 item(s)",
    //   amount: "₹199.00",
    //   status: "out for_delivery",
    //   payment: "paid",
    //   date: "21 Nov 2025, 05:00 pm",
    // },
    // {
    //   id: "QD1763968517352005",
    //   customer: { name: "Neha Gupta", phone: "9111222333" },
    //   items: "4 item(s)",
    //   amount: "₹1200.00",
    //   status: "completed",
    //   payment: "paid",
    //   date: "20 Nov 2025, 08:45 am",
    // },
  ];

  const filteredOrders = useMemo(() => {
    return mockOrders.filter((order) => {
      const search = searchTerm.trim().toLowerCase();
      const matchesSearch =
        order.id.toLowerCase().includes(search) ||
        order.customer.name.toLowerCase().includes(search) ||
        order.customer.phone.includes(search);
      const matchesStatus = statusFilter === "all" || order.status === statusFilter;
      const matchesPayment = paymentFilter === "all" || order.payment === paymentFilter;
      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [searchTerm, statusFilter, paymentFilter]);

  const getStatusColor = (status) => {
    const s = status.toLowerCase();
    if (s.includes("completed")) return "bg-green-100 text-green-700";
    if (s.includes("out")) return "bg-blue-100 text-blue-700";
    if (s.includes("pending")) return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-700";
  };

  const getPaymentColor = (payment) => {
    const p = payment.toLowerCase();
    if (p.includes("paid")) return "bg-green-100 text-green-700";
    if (p.includes("pending")) return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600 mt-1">Manage and track all orders</p>
      </div>

      {/* Search & Filters Bar */}
      <div className="bg-white border border-gray-300 rounded-lg p-5 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by order number or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-5 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="out for_delivery">Out For Delivery</option>
            <option value="completed">Completed</option>
          </select>

          {/* Payment Status Filter */}
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">All Payment Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Order #</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Items</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Payment</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-12 text-gray-500">
                  No orders available right now
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{order.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.customer.name}</p>
                      <p className="text-xs text-gray-500">{order.customer.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.items}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${getPaymentColor(order.payment)}`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button title="View" className="text-blue-600 hover:text-blue-800 transition">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="flex items-center justify-between gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium text-gray-900 w-40">
                        <span>{order.status}</span>
                        <ChevronDown className="w-5 h-4 text-gray-600 flex-shrink-0" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
