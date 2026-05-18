"use client";
import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { Search, Eye } from "lucide-react";
import { adminurl } from "../adminCompo/adminapis";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // NEW STATES FOR MODAL
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleView = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const fetchUsers = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await axios.get(`${adminurl}/users`);

      if (res.data.success) {
        setUsers(res.data.users);
      } else {
        setErrorMsg("Failed to load users. Please try again.");
      }
    } catch (error) {
      console.log("Error fetching users:", error);
      setErrorMsg("Backend error — unable to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const search = searchTerm.trim().toLowerCase();

      const matchesSearch =
        (user.name || "").toLowerCase().includes(search) ||
        (user.phone || "").includes(search) ||
        (user.email || "").toLowerCase().includes(search);

      const matchesFilter =
        filterStatus === "all" || user.profile === filterStatus;

      return matchesSearch && matchesFilter;
    });
  }, [users, searchTerm, filterStatus]);

  const getProfileColor = (status) => {
    if (status === "complete") return "bg-green-100 text-accent";
    if (status === "incomplete") return "bg-yellow-100 text-highlight";
    return "bg-background00 text-text";
  };

  return (
    <div className="container mx-auto px-7 py-8 font-sans">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text">Users</h1>
        <p className="text-text text-sm mt-1">Manage user accounts</p>
      </div>

      {/* SEARCH + FILTERS CARD */}
      <div className="bg-background border border-gray-400 rounded-lg p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">

          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-[#252729b8] w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, phone, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-5 py-3 bg-background border border-highlight rounded-lg text-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 bg-background border border-highlight rounded-lg text-text font-medium focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            <option value="all">All Users</option>
            <option value="complete">Complete Profile</option>
            <option value="incomplete">Incomplete Profile</option>
          </select>
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {errorMsg && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-6 flex justify-between items-center">
          <span>{errorMsg}</span>
          <button
            onClick={fetchUsers}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Retry
          </button>
        </div>
      )}

      {/* TABLE CARD */}
      <div className="overflow-x-auto bg-background rounded-lg shadow border border-highlight">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-2 text-text">Loading users...</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-background border-b">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase">Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase">Phone</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase">Email</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase">Address</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase">Profile</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase">Joined</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-700">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-background">
                    <td className="px-6 py-4 text-sm font-semibold">
                      {user.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm">{user.phone || "N/A"}</td>
                    <td className="px-6 py-4 text-sm">{user.email || "N/A"}</td>
                    <td className="px-6 py-4 text-sm">{user.address || "N/A"}</td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-bold capitalize ${getProfileColor(
                          user.profile
                        )}`}
                      >
                        {user.profile}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleString()
                        : "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleView(user)}
                        className="text-accent font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* USER DETAILS MODAL */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-background p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-text">
              User Details
            </h2>

            <div className="space-y-2 text-text">
              <p><strong>Name:</strong> {selectedUser.name || "N/A"}</p>
              <p><strong>Email:</strong> {selectedUser.email || "N/A"}</p>
              <p><strong>Phone:</strong> {selectedUser.phone || "N/A"}</p>
              <p><strong>Address:</strong> {selectedUser.address || "N/A"}</p>
              <p><strong>Profile:</strong> {selectedUser.profile}</p>
              <p>
                <strong>Joined:</strong>{" "}
                {selectedUser.createdAt
                  ? new Date(selectedUser.createdAt).toLocaleString()
                  : "N/A"}
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-text text-white rounded-lg cursor-pointer"
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

export default UsersPage;
