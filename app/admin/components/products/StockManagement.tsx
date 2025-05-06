import { useState } from "react";

interface Product {
  id: string;
  name: string;
  stock: number;
  category: { name: string };
}

export function StockManagement({ products }: { products: Product[] }) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [stockChange, setStockChange] = useState<number>(0);

  const handleSubmit = async () => {
    try {
      await fetch("/api/admin/inventory/bulk-update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productIds: selectedProducts,
          stockChange,
        }),
      });

      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du stock:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Mise à jour des Stocks</h2>

      <div className="space-y-4">
        <div className="max-h-96 overflow-y-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center p-2 hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={selectedProducts.includes(product.id)}
                onChange={(e) => {
                  setSelectedProducts((prev) =>
                    e.target.checked
                      ? [...prev, product.id]
                      : prev.filter((id) => id !== product.id)
                  );
                }}
                className="mr-3"
              />
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-500">
                  Stock actuel: {product.stock} | Catégorie:{" "}
                  {product.category.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 items-end mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Modification du stock
            </label>
            <input
              type="number"
              value={stockChange}
              onChange={(e) => setStockChange(parseInt(e.target.value))}
              className="border rounded-md p-2"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={selectedProducts.length === 0}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            Mettre à jour {selectedProducts.length} produit(s)
          </button>
        </div>
      </div>
    </div>
  );
}
