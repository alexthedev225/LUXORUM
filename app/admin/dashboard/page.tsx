import { getDashboardStats } from "@/lib/api/getDashboardStats";
import DashboardContent from "./DashboardContent";

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return <DashboardContent stats={stats} />;
}
