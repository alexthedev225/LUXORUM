import { useState } from "react";

interface Product {
  id: string;
  name: string;
  stock: number;
  category: { name: string };
}

export function AlertThresholds({ products }: { products: Product[] }) {
  const [threshold, setThreshold] = useState(5);
  const lowStockProducts = products.filter((p) => p.stock <= threshold);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Seuils d'Alerte</h2>
        <div className="flex items-center space-x-2">
          <label className="text-sm">Seuil :</label>
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(parseInt(e.target.value))}
            className="border rounded-md p-1 w-20"
            min="0"
          />
        </div>
      </div>

      <div className="mt-4">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                {lowStockProducts.length} produit(s) sous le seuil d'alerte
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {lowStockProducts.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center p-2 hover:bg-gray-50 rounded"
            >
              <span>{product.name}</span>
              <span className="font-medium text-red-600">
                {product.stock} en stock
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
