// stores/cart.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductWithId } from "@/types/product";

interface CartItem {
  product: ProductWithId;
  quantity: number;
}
interface CartState {
  items: CartItem[];
  setItems: (items: CartItem[]) => void; 

  addToCart: (product: ProductWithId, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const useCartBase = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      setItems: (items) => set({ items }), 
      addToCart: async (product, quantity) => {
        const items = get().items;
        const existingItem = items.find(
          (item) => item.product._id === product._id
        );
        if (existingItem) {
          set({
            items: items.map((item) =>
              item.product._id === product._id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ items: [...items, { product, quantity }] });
        }
      },
      removeFromCart: (productId) => {
        set({
          items: get().items.filter((item) => item.product._id !== productId),
        });
      },
      updateQuantity: (productId, quantity) => {
        set({
          items: get().items.map((item) =>
            item.product._id === productId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: "luxorum-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);


// 👇 Ajout de fonctions externes à Zustand
export const useCartStore = () => {
  const store = useCartBase();
  const getTotalItems = () =>
    store.items.reduce((sum, item) => sum + item.quantity, 0);
  return { ...store, getTotalItems };
};
