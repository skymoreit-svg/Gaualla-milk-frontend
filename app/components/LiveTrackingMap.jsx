"use client";

import { useState, useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker, Polyline } from "@react-google-maps/api";
import { GOOGLE_MAPS_KEY } from "@/app/config/constants";
import { getTrackingSocket, disconnectSocket } from "./utils/socketClient";

const mapStyle = { width: "100%", height: "300px", borderRadius: "12px" };

export default function LiveTrackingMap({ orderId, riderLocation, deliveryAddress }) {
  const [riderPos, setRiderPos] = useState(
    riderLocation?.latitude && riderLocation?.longitude
      ? { lat: parseFloat(riderLocation.latitude), lng: parseFloat(riderLocation.longitude) }
      : null
  );

  const socketRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_KEY,
    id: "google-map-script",
  });

  useEffect(() => {
    if (!orderId) return;

    const socket = getTrackingSocket();
    socketRef.current = socket;

    socket.emit("track:order", { order_id: orderId });

    socket.on("rider:location", (data) => {
      setRiderPos({ lat: parseFloat(data.latitude), lng: parseFloat(data.longitude) });
    });

    return () => {
      socket.emit("untrack:order", { order_id: orderId });
      socket.off("rider:location");
    };
  }, [orderId]);

  useEffect(() => {
    if (riderLocation?.latitude && riderLocation?.longitude) {
      setRiderPos({
        lat: parseFloat(riderLocation.latitude),
        lng: parseFloat(riderLocation.longitude),
      });
    }
  }, [riderLocation]);

  if (!isLoaded) {
    return <div className="bg-gray-100 rounded-xl h-[300px] flex items-center justify-center text-gray-500">Loading map...</div>;
  }

  const deliveryPos = deliveryAddress?.latitude && deliveryAddress?.longitude
    ? { lat: parseFloat(deliveryAddress.latitude), lng: parseFloat(deliveryAddress.longitude) }
    : null;

  const center = riderPos || deliveryPos || { lat: 28.6139, lng: 77.209 };

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200">
      <GoogleMap mapContainerStyle={mapStyle} center={center} zoom={14}>
        {riderPos && (
          <Marker
            position={riderPos}
            icon={{
              path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
              fillColor: "#2563eb",
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: "#FFFFFF",
              scale: 1.8,
              anchor: { x: 12, y: 22 },
            }}
            label={{ text: "🏍", fontSize: "14px" }}
          />
        )}

        {deliveryPos && (
          <Marker
            position={deliveryPos}
            icon={{
              path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
              fillColor: "#16a34a",
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: "#FFFFFF",
              scale: 1.6,
              anchor: { x: 12, y: 22 },
            }}
          />
        )}

        {riderPos && deliveryPos && (
          <Polyline
            path={[riderPos, deliveryPos]}
            options={{
              strokeColor: "#2563eb",
              strokeOpacity: 0.6,
              strokeWeight: 3,
              geodesic: true,
            }}
          />
        )}
      </GoogleMap>

      {riderPos && (
        <div className="bg-blue-50 px-4 py-2 text-sm text-blue-700 text-center">
          Live tracking active - rider location updates in real-time
        </div>
      )}
    </div>
  );
}
