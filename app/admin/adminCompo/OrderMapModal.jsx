"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { X } from "lucide-react";
import { GOOGLE_MAPS_KEY } from "@/app/config/constants";

const containerStyle = {
  width: "100%",
  height: "500px",
};

export default function OrderMapModal({ isOpen, onClose, latitude, longitude, address }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_KEY,
  });

  if (!isOpen) return null;

  const position = {
    lat: parseFloat(latitude),
    lng: parseFloat(longitude),
  };

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  // Handle click outside the modal
  const handleBackdropClick = (e) => {
    // Only close if the click is on the backdrop itself, not inside modal content
    if (e.target.id === "modal-backdrop") {
      onClose();
    }
  };

  return (
    <div
      id="modal-backdrop"
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Delivery Location</h2>
            <p className="text-sm text-gray-600 mt-1">
              Latitude: {latitude} | Longitude: {longitude}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Map */}
        <div className="p-6">
          <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={15}>
            <Marker position={position} />
          </GoogleMap>
        </div>

        {/* Address Details */}
        {address && (
          <div className="px-6 pb-6 bg-gray-50 rounded-b-xl">
            <h3 className="font-semibold text-gray-900 mb-3">Address Details</h3>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="font-semibold text-gray-900">
                {address.first_name} {address.last_name}
              </p>
              <p className="text-gray-700 mt-2">{address.street}</p>
              <p className="text-gray-700">
                {address.city}, {address.state} {address.zip_code}
              </p>
              <p className="text-gray-700">{address.country}</p>
              {address.phone && (
                <p className="text-gray-700 mt-2">
                  <span className="font-medium">Phone:</span> {address.phone}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}