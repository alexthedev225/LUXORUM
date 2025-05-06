"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function RevenueChart() {
  const [revenueData, setRevenueData] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const period = params.get("period") || "month";

    fetch(`/api/admin/reports/sales?period=${period}`)
      .then((res) => res.json())
      .then((data) => {
        const chartData = {
          labels: data.salesData.map((d: any) => d.status),
          datasets: [
            {
              label: "Revenus par statut",
              data: data.salesData.map((d: any) => d._sum.total),
              backgroundColor: [
                "rgba(75, 192, 192, 0.5)",
                "rgba(54, 162, 235, 0.5)",
              ],
              borderColor: ["rgb(75, 192, 192)", "rgb(54, 162, 235)"],
              borderWidth: 1,
            },
          ],
        };
        setRevenueData(chartData);
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Revenus</h2>
      {revenueData && (
        <Bar
          data={revenueData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Revenus par statut de commande",
              },
            },
          }}
        />
      )}
    </div>
  );
}
