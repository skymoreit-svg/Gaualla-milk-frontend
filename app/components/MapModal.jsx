"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "420px",
};

const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629,
};

export default function MapModal({ onClose, onConfirm, initialLocation }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    id: "google-map-script",
  });

  const [position, setPosition] = useState(initialLocation || defaultCenter);
  const [addressData, setAddressData] = useState(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  // Reverse Geocode
  const fetchAddress = (lat, lng) => {
    setIsLoadingAddress(true);

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        const components = results[0].address_components;

        const getComponent = (type) =>
          components.find((c) => c.types.includes(type))?.long_name || "";

        setAddressData({
          formattedAddress: results[0].formatted_address,
          components: {
            street: `${getComponent("street_number")} ${getComponent("route")}`.trim(),
            city: getComponent("locality"),
            state: getComponent("administrative_area_level_1"),
            zip: getComponent("postal_code"),
            country: getComponent("country"),
          },
          lat,
          lng,
        });
      }
      setIsLoadingAddress(false);
    });
  };

  const handleLocationChange = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setPosition({ lat, lng });
    fetchAddress(lat, lng);
  };

  useEffect(() => {
    if (isLoaded) {
      fetchAddress(position.lat, position.lng);
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-2xl p-4 shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-800">
            Select Delivery Location
          </h3>
          <button onClick={onClose} className="text-xl">✕</button>
        </div>

        {/* MAP */}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={15}
          onClick={handleLocationChange}
        >
          <Marker
            position={position}
            draggable
            onDragEnd={handleLocationChange}
          />
        </GoogleMap>

        {/* ADDRESS PREVIEW */}
        {addressData && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-medium text-blue-900 mb-1">
              Selected Address:
            </p>
            <p className="text-sm text-gray-700">
              {addressData.formattedAddress}
            </p>
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onConfirm(
                addressData || {
                  formattedAddress: "",
                  components: {},
                  lat: position.lat,
                  lng: position.lng,
                }
              );
            }}
            disabled={!addressData || isLoadingAddress}
            className="px-4 py-2 bg-[#60BE74] text-white rounded-lg disabled:bg-gray-400"
          >
            {isLoadingAddress ? "Loading..." : "Use This Location"}
          </button>
        </div>
      </div>
    </div>
  );
}