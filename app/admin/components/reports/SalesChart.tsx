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
  ChartData,
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

// Définir le format attendu de la réponse API
interface SalesApiResponse {
  labels: string[];
  values: number[];
}

// Définir la structure exacte des données pour Chart.js
type SalesChartData = ChartData<"line", number[], string>;

export function SalesChart() {
  const [salesData, setSalesData] = useState<SalesChartData | null>(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await fetch("/api/admin/reports/sales");
        const data: SalesApiResponse = await res.json();

        setSalesData({
          labels: data.labels,
          datasets: [
            {
              label: "Ventes",
              data: data.values,
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.error(
          "Erreur lors du chargement des données de ventes :",
          error
        );
      }
    };

    fetchSales();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-zinc-800">
        Évolution des Ventes
      </h2>
      {salesData && (
        <Line
          data={salesData}
          options={{
            responsive: true,
            interaction: {
              mode: "index",
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
