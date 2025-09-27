"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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
  const [markers, setMarkers] = useState<MineLocation[]>([]);

  useEffect(() => {
    setIsClient(true);
    // Update markers only when mines prop changes
    setMarkers(mines);
    
    // Cleanup function
    return () => {
      // Cleanup any marker references if needed
      setMarkers([]);
    };
  }, [mines]);

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
      <div class="relative flex items-center justify-center w-8 h-8">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" 
            fill="white" 
            stroke="${color}" 
            stroke-width="1.5"
            class="drop-shadow-md"
          />
          <circle cx="12" cy="9" r="3" fill="${color}" />
        </svg>
        <div class="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white" style="background-color: ${color}"></div>
      </div>
    `;

    return L.divIcon({
      html: iconHtml,
      className: "custom-marker",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
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

        {markers.map((mine) => {
          const icon = createMineIcon(mine.type);
          const isSelected = selectedMine === mine.id;

          if (!icon) {
            console.log("No icon created for mine:", mine.name, mine.type);
            return null;
          }

          // Create a larger, highlighted icon for selected mine
          const selectedIcon = isSelected ? L.divIcon({
            html: `
              <div class="relative flex items-center justify-center w-12 h-12">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="animate-pulse">
                  <path 
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" 
                    fill="white" 
                    stroke="${mineColors[mine.type] || 'gray'}" 
                    stroke-width="2"
                    class="drop-shadow-lg"
                  />
                  <circle cx="12" cy="9" r="4" fill="${mineColors[mine.type] || 'gray'}" />
                  <circle cx="12" cy="9" r="6" fill="${mineColors[mine.type] || 'gray'}" fill-opacity="0.4">
                    <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
                  </circle>
                </svg>
                <div class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white bg-yellow-400 flex items-center justify-center">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
              </div>
            `,
            className: "custom-marker selected-marker",
            iconSize: [48, 48],
            iconAnchor: [24, 48],
            popupAnchor: [0, -48]
          }) : icon;

          // Use selectedIcon if this mine is selected, otherwise use the default icon
          const markerIcon = isSelected ? selectedIcon : icon;
          
          return (
            <Marker
              key={mine.id}
              position={[mine.lat, mine.lng]}
              icon={markerIcon}
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
