interface LowStockAlertProps {
  products: Array<{
    id: string;
    name: string;
    stock: number;
  }>;
}

export function LowStockAlert({ products }: LowStockAlertProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <span className="mr-2">Stock Faible</span>
        {products.length > 0 && (
          <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm">
            {products.length}
          </span>
        )}
      </h2>
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <p className="font-medium">{product.name}</p>
            <span
              className={`px-2 py-1 rounded ${
                product.stock === 0
                  ? "bg-red-100 text-red-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {product.stock} en stock
            </span>
          </div>
        ))}
        {products.length === 0 && (
          <p className="text-gray-500 text-center">
            Tous les produits ont un stock suffisant
          </p>
        )}
      </div>
    </div>
  );
}
