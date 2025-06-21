import AccountPage from "./AccountPage";
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

interface UserPreferences {
  newsletter: boolean;
  language: string;
  notifications: boolean;
}

async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value || null;
}


// ===================
// Fetch functions API
// ===================

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

async function fetchPaymentMethods(token: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/account/payment-methods`,
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

async function fetchUserPreferences(token: string): Promise<UserPreferences> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/account/preferences`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );

    if (res.status === 204) {
      return {
        newsletter: true,
        language: "fr",
        notifications: true,
      };
    }

    if (!res.ok) throw new Error();
    return res.json();
  } catch {
    return {
      newsletter: true,
      language: "fr",
      notifications: true,
    };
  }
}

// ===================
// Transform functions
// ===================

function transformOrderData(orders: any[]): Order[] {
  return orders.map((order) => ({
    _id: order._id,
    createdAt: order.createdAt,
    amount: order.amount,
    status: order.status,
    items: order.items || [],
  }));
}

function transformAddressData(addresses: any[]): Address[] {
  return addresses.map((address) => ({
    _id: address._id,
    street: address.street,
    city: address.city,
    state: address.state,
    postalCode: address.postalCode,
    country: address.country,
    isDefault: address.isDefault,
  }));
}

function transformPaymentMethodData(paymentMethods: any[]) {
  return paymentMethods.map((pm) => ({
    id: pm.id,
    type: pm.card?.brand || "card",
    last4: pm.card?.last4 || "0000",
    expiryMonth: pm.card?.exp_month || 12,
    expiryYear: pm.card?.exp_year || 2025,
    isDefault: false, // à ajuster selon votre logique Stripe
  }));
}

// ===================
// Wrapper Component
// ===================
export default async function AccountPageWrapper() {
  const token = await getAuthToken();
  if (!token) return null; // middleware gère la redirection

  const [userData, addresses, orders, paymentMethods, preferences] =
    await Promise.all([
      fetchUserProfile(token),
      fetchUserAddresses(token),
      fetchUserOrders(token),
      fetchPaymentMethods(token),
      fetchUserPreferences(token),
    ]);

  if (!userData) return null;

  return (
    <AccountPage
      userData={userData}
      addresses={transformAddressData(addresses)}
      orders={transformOrderData(orders)}
      paymentMethods={transformPaymentMethodData(paymentMethods)}
      preferences={preferences}
      authToken={token}
    />
  );
}

