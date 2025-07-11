// types.ts
export interface Product {
  _id: string;
  name: string;
  stock: number;
  threshold?: number; // seuil pour alerte stock bas
  // autres champs possibles, comme images, price, category, etc.
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
  name: string; // nom figé au moment de la commande
}

export interface User {
  email: string;
  // autres champs si besoin
}

export interface Order {
  id: string; // identifiant unique de la commande
  user: User;
  items: OrderItem[];
  total: number;
  status: string; // ex: "PENDING", "PAID", etc.
}
