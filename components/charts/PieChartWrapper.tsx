'use client';

import dynamic from 'next/dynamic';

// Dynamically import the PieChart component with SSR disabled
const PieChart = dynamic(
  () => import('recharts').then((mod) => mod.PieChart),
  { ssr: false }
);

export default PieChart;
