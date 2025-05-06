"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function SalesChart() {
  const [salesData, setSalesData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/reports/sales")
      .then((res) => res.json())
      .then((data) => {
        setSalesData({
          labels: data.labels,
          datasets: [
            {
              label: "Ventes",
              data: data.values,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        });
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Évolution des Ventes</h2>
      {salesData && (
        <Line
          data={salesData}
          options={{
            responsive: true,
            interaction: {
              mode: "index" as const,
              intersect: false,
            },
            plugins: {
              title: {
                display: true,
                text: "Ventes quotidiennes",
              },
            },
          }}
        />
      )}
    </div>
  );
}
