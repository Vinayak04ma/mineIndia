'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically load the client-only Leaflet map component
const ClientLeafletMap = dynamic(
  () => import('./leaflet-map-client').then((m) => m.LeafletMapClient),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-lg">
        <div className="animate-pulse text-gray-500">Loading map...</div>
      </div>
    ),
  }
);

export default function IndiaMiningMap({ onMineSelect, mines, selectedMine }: {
  onMineSelect: (mineId: string) => void;
  mines: Array<{
    id: string;
    name: string;
    type: string;
    location: string;
    coordinates: string;
    lat: number;
    lng: number;
  }>;
  selectedMine?: string;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show loading state until component is mounted
  if (!isMounted) {
    return (
      <div className="h-[500px] w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-lg">
        <div className="animate-pulse text-gray-500">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden shadow-lg">
      <ClientLeafletMap mines={mines} onMineSelect={onMineSelect} selectedMine={selectedMine} />
    </div>
  );
}
