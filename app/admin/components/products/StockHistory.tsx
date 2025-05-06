import { useEffect, useState } from "react";

interface StockUpdate {
  id: string;
  productId: string;
  productName: string;
  previousStock: number;
  newStock: number;
  updatedBy: string;
  updatedAt: string;
}

export function StockHistory() {
  const [history, setHistory] = useState<StockUpdate[]>([]);

  useEffect(() => {
    fetch("/api/admin/inventory/history")
      .then((res) => res.json())
      .then((data) => setHistory(data));
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">
        Historique des Modifications
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Produit</th>
              <th className="text-left p-4">Ancien Stock</th>
              <th className="text-left p-4">Nouveau Stock</th>
              <th className="text-left p-4">Modifié par</th>
              <th className="text-left p-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((update) => (
              <tr key={update.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{update.productName}</td>
                <td className="p-4">{update.previousStock}</td>
                <td className="p-4">{update.newStock}</td>
                <td className="p-4">{update.updatedBy}</td>
                <td className="p-4">
                  {new Date(update.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
