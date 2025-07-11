"use client";

import { motion } from "framer-motion";
import { Calendar, CreditCard, Package } from "lucide-react";

interface OrderItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  amount: number;
  status: "paid" | "pending" | "failed";
  createdAt: string;
  updatedAt: string;
}

const OrdersSection = ({ orders }: { orders: Order[] }) => {
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "paid":
        return "bg-green-500/20 text-green-300";
      case "pending":
        return "bg-yellow-500/20 text-yellow-300";
      case "failed":
        return "bg-red-500/20 text-red-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  const getStatusLabel = (status: Order["status"]) => {
    switch (status) {
      case "paid":
        return "Payé";
      case "pending":
        return "En attente";
      case "failed":
        return "Échoué";
      default:
        return status;
    }
  };

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div className="grid gap-6 sm:gap-8 md:gap-10">
      {sortedOrders.map((order, index) => {
        const totalItems = order.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        return (
          <motion.article
            key={order._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="group relative bg-black border border-zinc-800/60 rounded-lg overflow-hidden hover:border-amber-400/40 transition-all duration-300"
          >
            {/* Header */}
            <header className="relative border-b border-zinc-800/40 bg-zinc-900/30 px-4 sm:px-6 md:px-8 py-4 sm:py-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4 sm:space-x-6 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-amber-400/10 border border-amber-400/20 flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />
                  </div>
                  <div className="min-w-0">
                    <h2 key={order._id} className="...">
                      Commande #{index + 1}
                    </h2>

                    <p className="text-zinc-400 text-xs sm:text-sm mt-1 tracking-wider">
                      {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <span
                    className={`inline-block px-3 py-1 rounded-md text-xs font-medium uppercase tracking-widest ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusLabel(order.status)}
                  </span>
                </div>
              </div>
            </header>

            {/* Contenu principal */}
            <div className="relative px-4 sm:px-6 md:px-8 py-6">
              {/* Résumé commande */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-zinc-800/50 flex items-center justify-center">
                    <Package className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-xs uppercase tracking-widest">
                      Articles
                    </p>
                    <p className="text-white font-medium">
                      {totalItems} article{totalItems > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-zinc-800/50 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-xs uppercase tracking-widest">
                      Date
                    </p>
                    <p className="text-white font-medium">
                      {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-amber-400/10 flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-amber-300" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-xs uppercase tracking-widest">
                      Total
                    </p>
                    <p className="text-amber-300 font-semibold text-lg sm:text-xl">
                      {order.amount.toLocaleString("fr-FR")}€
                    </p>
                  </div>
                </div>
              </div>

              {/* Liste des articles */}
              {order.items.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="border-t border-zinc-800/40 pt-6"
                >
                  <h3 className="text-zinc-400 text-xs uppercase tracking-widest mb-4">
                    Détail des articles
                  </h3>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.08 }}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-zinc-900/40 rounded-md border border-zinc-800/30 hover:border-zinc-700/50 transition-colors duration-200"
                      >
                        <div className="flex-1 mb-2 sm:mb-0">
                          <h4 className="text-white font-medium tracking-wide truncate max-w-xs sm:max-w-full">
                            {item.name}
                          </h4>
                        </div>
                        <div className="flex items-center space-x-6 text-sm min-w-[120px]">
                          <div className="text-center">
                            <p className="text-zinc-400 text-xs uppercase tracking-wider">
                              Qté
                            </p>
                            <p className="text-white font-medium">
                              {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-zinc-400 text-xs uppercase tracking-wider">
                              Prix
                            </p>
                            <p className="text-amber-300 font-semibold">
                              {(item.quantity * item.price).toLocaleString(
                                "fr-FR"
                              )}
                              €
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}
            </div>
          </motion.article>
        );
      })}
    </div>
  );
};

export default OrdersSection;
