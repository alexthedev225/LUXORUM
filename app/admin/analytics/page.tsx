import { getAnalyticsStats } from "@/lib/api/getAnalyticsStats";
import AnalyticsDashboardClient from "./AnalyticsDashboardClient";

export default async function AnalyticsPage() {
  // Charger les données côté serveur avant rendu
  const stats = await getAnalyticsStats("7d");

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      <AnalyticsDashboardClient stats={stats} />
    </main>
  );
}
