// app/admin/orders/page.tsx

import { OrdersList } from "@/components/admin/OrdersList";

interface Order {
  _id: string;
  amount: number;
  status: string;
  createdAt: string;
  items: {
    product: {
      name: string;
      price: number;
      images: string[];
    };
    quantity: number;
  }[];
  userId: string;
}

export default async function AdminOrdersPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`, {
    cache: "no-store",
  });

  const orders: Order[] = await res.json();
  console.log("Orders fetched:", orders);

  return (
    <div className="p-6 bg-gradient-to-b from-black via-zinc-950 to-black min-h-screen">
      <h1 className="text-3xl font-semibold mb-8 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 text-transparent bg-clip-text">
        Historique des Commandes
      </h1>

      <OrdersList orders={orders} />
    </div>
  );
}
