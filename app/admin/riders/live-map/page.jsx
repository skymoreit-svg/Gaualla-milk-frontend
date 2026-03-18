"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { adminurl } from "../../adminCompo/adminapis";
import { GOOGLE_MAPS_KEY } from "@/app/config/constants";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Polyline } from "@react-google-maps/api";
import { getAdminSocket, disconnectSocket } from "@/app/components/utils/socketClient";
import { FaCircle, FaSync } from "react-icons/fa";
import Link from "next/link";

const mapContainerStyle = { width: "100%", height: "calc(100vh - 180px)" };
const defaultCenter = { lat: 28.6139, lng: 77.209 };

export default function LiveMapPage() {
  const [riders, setRiders] = useState([]);
  const [selectedRider, setSelectedRider] = useState(null);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_KEY,
    id: "google-map-script",
  });

  const fetchLocations = useCallback(async () => {
    try {
      const { data } = await axios.get(`${adminurl}/riders/locations/live`, { withCredentials: true });
      if (data.success) {
        setRiders(data.riders);
      }
    } catch (err) {
      console.error("Fetch locations error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLocations();

    const socket = getAdminSocket();
    if (socket) {
      socketRef.current = socket;

      socket.on("rider:location", (data) => {
        setRiders((prev) =>
          prev.map((r) =>
            r.id === data.rider_id
              ? { ...r, current_latitude: data.latitude, current_longitude: data.longitude }
              : r
          )
        );
      });
    }

    const interval = setInterval(fetchLocations, 30000);

    return () => {
      clearInterval(interval);
      if (socketRef.current) {
        socketRef.current.off("rider:location");
      }
    };
  }, [fetchLocations]);

  const mapCenter = riders.length > 0 && riders[0].current_latitude
    ? { lat: parseFloat(riders[0].current_latitude), lng: parseFloat(riders[0].current_longitude) }
    : defaultCenter;

  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Live Rider Map</h1>
          <p className="text-sm text-gray-500">{riders.length} rider(s) online</p>
        </div>
        <button
          onClick={fetchLocations}
          className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200"
        >
          <FaSync /> Refresh
        </button>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-4 text-sm">
        <span className="flex items-center gap-1"><FaCircle className="text-green-500 text-xs" /> Idle</span>
        <span className="flex items-center gap-1"><FaCircle className="text-blue-500 text-xs" /> Delivering</span>
        <span className="flex items-center gap-1"><FaCircle className="text-red-500 text-xs" /> Delivery Destination</span>
      </div>

      <div className="rounded-xl overflow-hidden shadow-lg border">
        {!isLoaded ? (
          <div className="flex items-center justify-center bg-gray-100" style={mapContainerStyle}>
            <p className="text-gray-500">Loading map...</p>
          </div>
        ) : (
          <GoogleMap mapContainerStyle={mapContainerStyle} center={mapCenter} zoom={12}>
            {riders.map((rider) => {
              if (!rider.current_latitude || !rider.current_longitude) return null;
              const hasActiveOrder = !!rider.active_order_id;
              const pos = { lat: parseFloat(rider.current_latitude), lng: parseFloat(rider.current_longitude) };

              return (
                <div key={rider.id}>
                  <Marker
                    position={pos}
                    onClick={() => setSelectedRider(rider)}
                    icon={{
                      path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
                      fillColor: hasActiveOrder ? "#3B82F6" : "#22C55E",
                      fillOpacity: 1,
                      strokeWeight: 2,
                      strokeColor: "#FFFFFF",
                      scale: 1.8,
                      anchor: { x: 12, y: 22 },
                    }}
                    label={{
                      text: rider.name?.charAt(0) || "R",
                      color: "#FFFFFF",
                      fontSize: "11px",
                      fontWeight: "bold",
                    }}
                  />

                  {/* Delivery destination marker + line */}
                  {rider.delivery_lat && rider.delivery_lng && (
                    <>
                      <Marker
                        position={{ lat: parseFloat(rider.delivery_lat), lng: parseFloat(rider.delivery_lng) }}
                        icon={{
                          path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
                          fillColor: "#EF4444",
                          fillOpacity: 0.8,
                          strokeWeight: 1,
                          strokeColor: "#FFFFFF",
                          scale: 1.2,
                          anchor: { x: 12, y: 22 },
                        }}
                      />
                      <Polyline
                        path={[
                          pos,
                          { lat: parseFloat(rider.delivery_lat), lng: parseFloat(rider.delivery_lng) },
                        ]}
                        options={{
                          strokeColor: "#3B82F6",
                          strokeOpacity: 0.5,
                          strokeWeight: 2,
                          geodesic: true,
                        }}
                      />
                    </>
                  )}
                </div>
              );
            })}

            {selectedRider && selectedRider.current_latitude && (
              <InfoWindow
                position={{ lat: parseFloat(selectedRider.current_latitude), lng: parseFloat(selectedRider.current_longitude) }}
                onCloseClick={() => setSelectedRider(null)}
              >
                <div className="p-2 min-w-[180px]">
                  <p className="font-bold text-gray-800">{selectedRider.name}</p>
                  <p className="text-sm text-gray-600">{selectedRider.phone}</p>
                  <p className="text-sm text-gray-500 capitalize">{selectedRider.vehicle_type}</p>
                  {selectedRider.active_order_id && (
                    <p className="text-sm text-blue-600 mt-1">
                      Delivering Order #{selectedRider.active_order_id}
                    </p>
                  )}
                  {selectedRider.last_location_update && (
                    <p className="text-xs text-gray-400 mt-1">
                      Updated: {new Date(selectedRider.last_location_update).toLocaleTimeString()}
                    </p>
                  )}
                  <Link href={`/admin/riders/${selectedRider.id}`} className="text-xs text-blue-500 hover:underline mt-1 block">
                    View Profile
                  </Link>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        )}
      </div>
    </div>
  );
}
