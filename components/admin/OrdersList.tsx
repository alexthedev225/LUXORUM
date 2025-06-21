"use client";

import { format } from "date-fns";
import { Badge } from "@/components/ui/badge"; // Vérifie bien l'import
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface OrderItem {
  productId: string | null; // _id du produit ou null si supprimé
  name: string; // nom sauvegardé au moment de la commande
  price: number; // prix sauvegardé au moment de la commande (en centimes)
  images: string[]; // tableau d'images (vide si produit supprimé)
  quantity: number;
}

interface Order {
  _id: string;
  amount: number;
  status: "paid" | "pending" | "cancelled" | string;
  createdAt: string;
  items: OrderItem[];
  userId: string;
}

const statusVariants = {
  paid: {
    bg: "bg-green-700/30",
    border: "border-green-400",
    text: "text-green-400",
  },
  pending: {
    bg: "bg-yellow-700/30",
    border: "border-yellow-400",
    text: "text-yellow-300",
  },
  cancelled: {
    bg: "bg-red-700/30",
    border: "border-red-400",
    text: "text-red-400",
  },
  default: {
    bg: "bg-zinc-700/30",
    border: "border-zinc-500",
    text: "text-zinc-400",
  },
};

function getStatusVariant(status: string) {
  if (status in statusVariants) {
    return statusVariants[status as keyof typeof statusVariants];
  }
  return statusVariants.default;
}
export function OrdersList({ orders }: { orders: Order[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence>
        {orders.map((order, index) => {
          const statusStyle = getStatusVariant(order.status);

          return (
            <motion.article
              key={order._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{
                duration: 0.5,
                delay: index * 0.07,
                ease: "easeOut",
              }}
              className="relative rounded-3xl border border-amber-400/20 bg-gradient-to-tr from-black/60 via-zinc-900/70 to-black/60 backdrop-blur-md shadow-lg shadow-black/80 p-7 flex flex-col"
              tabIndex={0} // accessible keyboard focus
              aria-label={`Commande numéro ${order._id.slice(-6)}, statut ${
                order.status
              }`}
              role="group"
              // hover glow and lift effect
              style={{ willChange: "transform, box-shadow" }}
            >
              {/* Glow border on hover */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow:
                    "0 0 15px 4px rgba(255, 191, 64, 0.7), 0 0 30px 8px rgba(255, 191, 64, 0.5)",
                  zIndex: 0,
                }}
              />

              {/* Header */}
              <header className="relative z-10 flex justify-between items-center mb-5">
                <h2 className="text-2xl font-semibold text-amber-300 tracking-wide select-text">
                  #{order._id.slice(-6)}
                </h2>

                <Badge
                  variant="outline"
                  className={cn(
                    "uppercase font-semibold text-sm px-4 py-1 rounded-full tracking-wider",
                    statusStyle.border,
                    statusStyle.text,
                    statusStyle.bg
                  )}
                >
                  {order.status}
                </Badge>
              </header>

              {/* Info */}
              <section className="relative z-10 mb-6 flex flex-col gap-2 text-zinc-300 text-sm">
                <p>
                  <span className="font-medium text-amber-300">
                    Montant total :
                  </span>{" "}
                  {(order.amount / 100).toFixed(2)} €
                </p>
                <p>
                  <span className="font-medium text-amber-300">
                    Passée le :
                  </span>{" "}
                  {format(new Date(order.createdAt), "dd/MM/yyyy 'à' HH:mm")}
                </p>
              </section>

              {/* Produits */}
              <section
                className="relative z-10 flex flex-col gap-3 overflow-auto max-h-[220px]"
                aria-label="Liste des produits commandés"
              >
                {order.items.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center justify-between gap-3 rounded-xl bg-zinc-800/40 backdrop-blur-sm p-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    {/* Miniature */}
                    {item.images.length > 0 && (
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover shadow-md border border-amber-500"
                        loading="lazy"
                      />
                    )}

                    {/* Nom produit + quantité */}
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-semibold text-amber-200">
                        {item.name || "Produit indisponible"}
                      </p>
                      <p className="text-xs text-zinc-400">
                        Quantité: {item.quantity}
                      </p>
                    </div>

                    {/* Prix */}
                    <div className="text-amber-300 font-semibold min-w-[60px] text-right">
                      {(item.price / 100).toFixed(2)} €
                    </div>
                  </motion.div>
                ))}
              </section>
            </motion.article>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
