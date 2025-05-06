import { OrderStatus } from "@prisma/client";

interface RecentOrdersProps {
  orders: Array<{
    id: string;
    total: number;
    status: OrderStatus;
    createdAt: string;
    user: { username: string };
  }>;
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Commandes Récentes</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="flex justify-between border-b pb-2">
            <div>
              <p className="font-medium">{order.user.username}</p>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold">{order.total}€</p>
              <p className={`text-sm ${getStatusColor(order.status)}`}>
                {order.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getStatusColor(status: OrderStatus): string {
  const colors = {
    PENDING: "text-yellow-500",
    PAID: "text-green-500",
    PROCESSING: "text-blue-500",
    SHIPPED: "text-purple-500",
    DELIVERED: "text-green-700",
    CANCELLED: "text-red-500",
  };
  return colors[status] || "text-gray-500";
}
