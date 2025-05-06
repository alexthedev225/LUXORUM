import { StockManagement } from "../components/products/StockManagement";
import { StockHistory } from "../components/products/StockHistory";
import { AlertThresholds } from "../components/products/AlertThresholds";

export default async function ProductsManagement() {
  const products = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/inventory`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Gestion des Stocks</h1>

      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
        <StockManagement products={products} />
        <AlertThresholds products={products} />
      </div>

      <StockHistory />
    </div>
  );
}
