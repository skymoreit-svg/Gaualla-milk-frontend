"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { adminurl } from "../../adminCompo/adminapis";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import {
  FaArrowLeft, FaMotorcycle, FaCircle, FaMapMarkerAlt, FaClock,
  FaTruck, FaMoneyBill, FaPhone, FaEnvelope, FaCalendarAlt,
  FaRoute, FaSyncAlt,
} from "react-icons/fa";

const mapContainerStyle = { width: "100%", height: "350px", borderRadius: "12px" };
const defaultCenter = { lat: 28.7041, lng: 77.1025 };

export default function RiderDetailPage() {
  const { id } = useParams();
  const [rider, setRider] = useState(null);
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    id: "google-map-script",
  });

  const fetchRider = useCallback(async () => {
    try {
      const { data } = await axios.get(`${adminurl}/riders/${id}`, { withCredentials: true });
      if (data.success) {
        setRider(data.rider);
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Fetch rider error:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRider();
  }, [fetchRider]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          `${adminurl}/riders/assignments?rider_id=${id}&limit=10`,
          { withCredentials: true }
        );
        if (data.success) setRecentOrders(data.assignments || []);
      } catch {
        // assignments endpoint may not exist yet
      }
    };
    fetchOrders();
  }, [id]);

  if (loading) return <div className="p-6 text-center text-gray-700">Loading...</div>;
  if (!rider) return <div className="p-6 text-center text-red-500">Rider not found</div>;

  const hasLocation = rider.current_latitude && rider.current_longitude;
  const riderPosition = hasLocation
    ? { lat: parseFloat(rider.current_latitude), lng: parseFloat(rider.current_longitude) }
    : null;

  const statusColor = {
    active: "bg-green-100 text-accent",
    suspended: "bg-red-100 text-red-700",
    inactive: "bg-background00 text-text",
  };

  const assignmentStatusColor = {
    pending: "bg-yellow-100 text-highlight",
    accepted: "bg-primary text-white",
    picked_up: "bg-primary text-white",
    in_transit: "bg-primary text-white",
    delivered: "bg-green-100 text-accent",
    failed: "bg-red-100 text-red-700",
    rejected: "bg-background00 text-text",
  };

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Link href="/admin/riders" className="flex items-center gap-2 text-text hover:text-text">
          <FaArrowLeft /> Back to Riders
        </Link>
        <button
          onClick={fetchRider}
          className="flex items-center gap-2 text-sm text-gray-700 hover:text-text bg-background00 px-3 py-1.5 rounded-lg"
        >
          <FaSyncAlt /> Refresh
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-background rounded-xl shadow p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold">{rider.name}</h1>
              <FaCircle className={`text-xs ${rider.is_online ? "text-accent" : "text-gray-600"}`} />
              <span className={`text-sm font-medium ${rider.is_online ? "text-accent" : "text-gray-700"}`}>
                {rider.is_online ? "Online" : "Offline"}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-text mt-2">
              <span className="flex items-center gap-1.5"><FaPhone className="text-gray-[#252729b8]" /> {rider.phone}</span>
              {rider.email && <span className="flex items-center gap-1.5"><FaEnvelope className="text-gray-[#252729b8]" /> {rider.email}</span>}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 text-text">
              <FaMotorcycle className="text-gray-[#252729b8]" />
              <span className="capitalize">{rider.vehicle_type}</span>
              {rider.vehicle_number && (
                <span className="bg-background00 px-2 py-0.5 rounded text-sm font-mono">{rider.vehicle_number}</span>
              )}
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor[rider.status] || "bg-background00 text-text"}`}>
              {rider.status}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 pt-4 border-t text-sm text-gray-700">
          <FaCalendarAlt className="text-gray-[#252729b8]" />
          Joined {new Date(rider.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          {rider.last_location_update && (
            <span className="ml-auto flex items-center gap-1.5">
              <FaClock className="text-gray-[#252729b8]" />
              Last seen: {new Date(rider.last_location_update).toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-background rounded-xl shadow p-4">
            <div className="flex items-center gap-2 text-primary mb-2">
              <FaTruck /> <span className="text-sm font-medium">Total Deliveries</span>
            </div>
            <p className="text-3xl font-bold text-text">{stats.total_deliveries || 0}</p>
          </div>
          <div className="bg-background rounded-xl shadow p-4">
            <div className="flex items-center gap-2 text-highlight mb-2">
              <FaRoute /> <span className="text-sm font-medium">Active Orders</span>
            </div>
            <p className="text-3xl font-bold text-text">{stats.active_orders || 0}</p>
          </div>
          <div className="bg-background rounded-xl shadow p-4">
            <div className="flex items-center gap-2 text-primary mb-2">
              <FaClock /> <span className="text-sm font-medium">Avg Delivery</span>
            </div>
            <p className="text-3xl font-bold text-text">
              {stats.avg_delivery_minutes ? `${Math.round(stats.avg_delivery_minutes)}m` : "N/A"}
            </p>
          </div>
          <div className="bg-background rounded-xl shadow p-4">
            <div className="flex items-center gap-2 text-accent mb-2">
              <FaMoneyBill /> <span className="text-sm font-medium">Unsettled COD</span>
            </div>
            <p className="text-3xl font-bold text-text">
              ₹{stats.unsettled_cod ? parseFloat(stats.unsettled_cod).toLocaleString("en-IN") : "0"}
            </p>
          </div>
        </div>
      )}

      {/* Map + Info side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Map */}
        <div className="lg:col-span-2 bg-background rounded-xl shadow p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-text flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500" /> Live Location
            </h3>
            {hasLocation && (
              <span className="text-xs text-gray-[#252729b8]">
                {rider.current_latitude}, {rider.current_longitude}
              </span>
            )}
          </div>
          {isLoaded ? (
            hasLocation ? (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={riderPosition}
                zoom={15}
                options={{
                  disableDefaultUI: true,
                  zoomControl: true,
                  streetViewControl: false,
                  mapTypeControl: false,
                }}
              >
                <Marker
                  position={riderPosition}
                  label={{ text: "🏍️", fontSize: "24px" }}
                  title={rider.name}
                />
              </GoogleMap>
            ) : (
              <div className="flex items-center justify-center bg-background rounded-xl" style={{ height: 350 }}>
                <div className="text-center text-gray-[#252729b8]">
                  <FaMapMarkerAlt className="text-4xl mx-auto mb-2 opacity-50" />
                  <p className="font-medium">No location data available</p>
                  <p className="text-sm mt-1">Rider hasn&apos;t shared their location yet</p>
                </div>
              </div>
            )
          ) : (
            <div className="flex items-center justify-center bg-background rounded-xl" style={{ height: 350 }}>
              <p className="text-gray-[#252729b8]">Loading map...</p>
            </div>
          )}
        </div>

        {/* Quick Info Sidebar */}
        <div className="space-y-4">
          <div className="bg-background rounded-xl shadow p-4">
            <h3 className="font-semibold text-text mb-3">Rider Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">Status</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[rider.status]}`}>
                  {rider.status}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">Online</span>
                <span className={`font-medium ${rider.is_online ? "text-accent" : "text-gray-700"}`}>
                  {rider.is_online ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">Vehicle</span>
                <span className="font-medium capitalize">{rider.vehicle_type}</span>
              </div>
              {rider.vehicle_number && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Plate</span>
                  <span className="font-mono text-sm">{rider.vehicle_number}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">Phone</span>
                <a href={`tel:${rider.phone}`} className="font-medium text-primary hover:underline">{rider.phone}</a>
              </div>
              {rider.email && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Email</span>
                  <span className="font-medium text-sm truncate max-w-[160px]">{rider.email}</span>
                </div>
              )}
            </div>
          </div>

          {stats && (
            <div className="bg-background rounded-xl shadow p-4">
              <h3 className="font-semibold text-text mb-3">Earnings</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Total COD Collected</span>
                  <span className="font-bold text-accent">
                    ₹{stats.total_cod_collected ? parseFloat(stats.total_cod_collected).toLocaleString("en-IN") : "0"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Unsettled COD</span>
                  <span className="font-bold text-highlight">
                    ₹{stats.unsettled_cod ? parseFloat(stats.unsettled_cod).toLocaleString("en-IN") : "0"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      {recentOrders.length > 0 && (
        <div className="bg-background rounded-xl shadow p-4 mb-6">
          <h3 className="font-semibold text-text mb-4">Recent Assignments</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-700">
                  <th className="pb-2 font-medium">Order</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Assigned</th>
                  <th className="pb-2 font-medium">Delivered</th>
                  <th className="pb-2 font-medium text-right">COD</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-background">
                    <td className="py-2.5">
                      <Link href={`/admin/orders/${o.order_id}`} className="text-primary hover:underline font-medium">
                        #{o.order_id}
                      </Link>
                    </td>
                    <td className="py-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${assignmentStatusColor[o.status] || "bg-background00 text-text"}`}>
                        {o.status?.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-2.5 text-gray-700">
                      {o.assigned_at ? new Date(o.assigned_at).toLocaleDateString("en-IN") : "-"}
                    </td>
                    <td className="py-2.5 text-gray-700">
                      {o.delivered_at ? new Date(o.delivered_at).toLocaleDateString("en-IN") : "-"}
                    </td>
                    <td className="py-2.5 text-right font-medium">
                      {o.cod_amount > 0 ? (
                        <span className={o.cod_collected ? "text-accent" : "text-highlight"}>
                          ₹{o.cod_amount} {o.cod_collected ? "✓" : ""}
                        </span>
                      ) : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
