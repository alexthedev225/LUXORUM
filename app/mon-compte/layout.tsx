// app/mon-compte/layout.tsx

import MonCompteLayoutClient from "./components/MonCompteLayoutClient";
import { cookies } from "next/headers";

// Types
interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface Address {
  _id: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

interface Order {
  _id: string;
  createdAt: string;
  amount: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  items: Array<{
    product: any;
    quantity: number;
    price: number;
    name: string;
  }>;
}

async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value || null;
}

async function fetchUserProfile(token: string): Promise<UserData | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/account/profile`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error();
    return res.json();
  } catch {
    return null;
  }
}

async function fetchUserAddresses(token: string): Promise<Address[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/account/addresses`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error();
    return res.json();
  } catch {
    return [];
  }
}

async function fetchUserOrders(token: string): Promise<Order[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/account/orders?page=1&limit=10`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error();
    const data = await res.json();
    return data.orders || [];
  } catch {
    return [];
  }
}


export default async function MonCompteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getAuthToken();
  if (!token) return null; // middleware de redirection doit s'en charger

  const [userData, addresses, orders] =
    await Promise.all([
      fetchUserProfile(token),
      fetchUserAddresses(token),
      fetchUserOrders(token),
  
    ]);

  if (!userData) return null;

  return (
    <MonCompteLayoutClient
      user={userData}
      addresses={addresses}
      orders={orders}
    
      
    >
      {children}
    </MonCompteLayoutClient>
  );
}
