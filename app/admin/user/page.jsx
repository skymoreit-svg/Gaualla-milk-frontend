"use client";
import React, { useMemo, useState } from "react";
import { Search, Eye } from "lucide-react";

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock users data
  const mockUsers = [
    {
      id: 1,
      name: "Shiyam Kumar",
      phone: "1234567890",
      email: "shiyam@example.com",
      address: "123 Main St, City",
      profile: "incomplete",
      joined: "24 Nov 2025, 12:28 pm",
    },
    {
      id: 2,
      name: "Rahul Singh",
      phone: "9876543210",
      email: "rahul@example.com",
      address: "456 Oak Ave, Town",
      profile: "complete",
      joined: "23 Nov 2025, 10:30 am",
    },
    {
      id: 3,
      name: "Priya Sharma",
      phone: "9123456789",
      email: "priya@example.com",
      address: "789 Pine Rd, Village",
      profile: "incomplete",
      joined: "22 Nov 2025, 02:15 pm",
    },
    {
      id: 4,
      name: "Amit Patel",
      phone: "9988776655",
      email: "amit@example.com",
      address: "321 Elm St, District",
      profile: "complete",
      joined: "21 Nov 2025, 05:00 pm",
    },
    {
      id: 5,
      name: "Neha Gupta",
      phone: "9111222333",
      email: "neha@example.com",
      address: "654 Maple Dr, Region",
      profile: "incomplete",
      joined: "20 Nov 2025, 08:45 am",
    },
  ];

  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      const search = searchTerm.trim().toLowerCase();
      const matchesSearch =
        user.name.toLowerCase().includes(search) ||
        user.phone.includes(search) ||
        user.email.toLowerCase().includes(search);
      const matchesFilter = filterStatus === "all" || user.profile === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterStatus]);

  const getProfileColor = (status) => {
    if (status === "complete") return "bg-green-100 text-green-700";
    if (status === "incomplete") return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-600 mt-1">Manage user accounts</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-gray-300 rounded-lg p-5 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, phone, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-5 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Dropdown */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">All Users</option>
            <option value="complete">Complete Profile</option>
            <option value="incomplete">Incomplete Profile</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Address</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Profile</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{user.name || "N/A"}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.phone || "N/A"}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.email || "N/A"}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.address || "N/A"}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold capitalize ${getProfileColor(user.profile)}`}>
                      {user.profile}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.joined}</td>
                  <td className="px-6 py-4">
                    <button title="View" className="text-green-600 hover:text-green-800 transition flex items-center gap-1 font-medium text-sm">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
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

export default UsersPage;
