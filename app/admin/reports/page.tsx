import { SalesChart } from "../components/reports/SalesChart";
import { RevenueChart } from "../components/reports/RevenueChart";
import { DateRangeFilter } from "../components/reports/DateRangeFilter";
import { ExportButton } from "../components/reports/ExportButton";

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Statistiques et Rapports</h1>
        <div className="flex gap-4">
          <DateRangeFilter />
          <ExportButton />
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
        <SalesChart />
        <RevenueChart />
      </div>
    </div>
  );
}
