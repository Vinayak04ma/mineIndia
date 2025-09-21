"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons (only runs on client)
if (typeof window !== "undefined") {
  const L = require("leaflet");
  // @ts-ignore
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/marker-icon-2x.png",
    iconUrl: "/marker-icon.png",
    shadowUrl: "/marker-shadow.png",
  });
}

export type MineLocation = {
  id: string;
  name: string;
  type: string; // Iron Ore | Coal | Copper | Lead-Zinc
  location: string;
  coordinates: string;
  lat: number;
  lng: number;
};

export function LeafletMapClient({
  mines,
  onMineSelect,
  selectedMine,
}: {
  mines: MineLocation[];
  onMineSelect: (mineId: string) => void;
  selectedMine?: string;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const center: [number, number] = [20.5937, 78.9629];

  const mineColors: Record<string, string> = {
    "Iron Ore": "blue",
    Coal: "green",
    Copper: "yellow",
    "Lead-Zinc": "red",
  };

  const createMineIcon = (type: string) => {
    if (typeof window === "undefined") return null;

    const L = require("leaflet");
    const color = mineColors[type] || "gray";
    const iconHtml = `
      <div class="flex items-center justify-center w-5 h-5">
        <div class="w-3 h-3 bg-${color}-600 rounded-full border-2 border-white shadow-md"></div>
      </div>
    `;

    return L.divIcon({
      html: iconHtml,
      className: "custom-marker",
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };

  // Don't render on server
  if (!isClient) {
    return (
      <div className="h-[500px] w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-lg">
        <div className="animate-pulse text-gray-500">Loading map...</div>
      </div>
    );
  }

  // Debug: Log mines data to console
  console.log("Map rendering with mines:", mines);

  return (
    <div className="h-[500px] w-full">
      <MapContainer
        center={center}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        className="map-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {mines.map((mine) => {
          const icon = createMineIcon(mine.type);
          const isSelected = selectedMine === mine.id;

          if (!icon) {
            console.log("No icon created for mine:", mine.name, mine.type);
            return null;
          }

          // Create a larger, highlighted icon for selected mine
          const selectedIcon = isSelected ? L.divIcon({
            html: `
              <div class="flex items-center justify-center w-8 h-8 animate-pulse">
                <div class="w-5 h-5 bg-${mineColors[mine.type] || 'gray'}-600 rounded-full border-4 border-yellow-400 shadow-lg"></div>
              </div>
            `,
            className: "custom-marker selected-marker",
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          }) : icon;

          return (
            <Marker
              key={mine.id}
              position={[mine.lat, mine.lng]}
              icon={selectedIcon}
              eventHandlers={{
                click: () => {
                  console.log("Mine clicked:", mine.name, mine.id);
                  onMineSelect(mine.id);
                },
              }}
            >
              <Popup>
                <div className="space-y-1">
                  <h4 className="font-semibold">{mine.name}</h4>
                  <p className="text-sm">Type: {mine.type}</p>
                  <p className="text-sm">Location: {mine.location}</p>
                  <p className="text-xs text-gray-500">
                    Coordinates: {mine.coordinates} (Lat: {mine.lat}, Lng: {mine.lng})
                  </p>
                  {isSelected && (
                    <p className="text-xs text-green-600 font-semibold mt-2">
                      ✓ Currently Selected
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}

        {mines.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 z-[1000]">
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border">
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                No mines to display
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Select a state to show mine locations
              </p>
            </div>
          </div>
        )}
      </MapContainer>
    </div>
  );
}
