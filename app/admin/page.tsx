import { LowStockAlert, RecentOrders, StatCard } from "./components";

export default async function AdminDashboard() {
  const stats = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Administrateur</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Commandes Totales"
          value={stats.totalOrders}
          icon="📦"
        />
        <StatCard
          title="Revenu Total"
          value={`${stats.totalRevenue}€`}
          icon="💰"
        />
        <StatCard title="Produits" value={stats.totalProducts} icon="🏷️" />
        <StatCard
          title="Stock Faible"
          value={stats.lowStockProducts.length}
          icon="⚠️"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders orders={stats.recentOrders} />
        <LowStockAlert products={stats.lowStockProducts} />
      </div>
    </div>
  );
}
