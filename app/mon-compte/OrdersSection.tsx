import { motion } from "framer-motion";
import { Calendar, ChevronRight, CreditCard, Eye, Package } from "lucide-react";

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

 return (
   <div className="space-y-6">
     {orders.map((order, index) => {
       const totalItems = order.items.reduce(
         (sum, item) => sum + item.quantity,
         0
       );

       return (
         <motion.div
           key={order._id}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{
             duration: 0.5,
             delay: index * 0.1,
             ease: [0.25, 0.46, 0.45, 0.94],
           }}
           whileHover={{
             scale: 1.02,
             transition: { duration: 0.2 },
           }}
           className="group relative overflow-hidden bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-2xl border border-zinc-800/50 hover:border-amber-400/20 transition-all duration-300"
         >
           {/* Overlay décoratif subtil */}
           <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[size:20px_20px] opacity-30" />
           <div className="absolute inset-0 bg-gradient-to-t from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

           <div className="relative p-6">
             <div className="flex items-start justify-between">
               <div className="flex-1 space-y-4">
                 {/* En-tête de commande */}
                 <div className="flex items-center space-x-4">
                   <div className="flex items-center space-x-3">
                     <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/20 border border-amber-400/30 flex items-center justify-center">
                       <Package className="w-5 h-5 text-amber-300/90" />
                     </div>
                     <h3 className="text-white/95 font-semibold text-lg tracking-wide">
                       #{order._id}
                     </h3>
                   </div>
                   <span
                     className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase ${getStatusColor(
                       order.status
                     )}`}
                   >
                     {getStatusLabel(order.status)}
                   </span>
                 </div>

                 {/* Informations de la commande */}
                 <div className="flex items-center space-x-8 text-sm">
                   <div className="flex items-center space-x-2 text-zinc-400/90">
                     <Calendar className="w-4 h-4" />
                     <span>
                       {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                         day: "2-digit",
                         month: "long",
                         year: "numeric",
                       })}
                     </span>
                   </div>
                   <div className="flex items-center space-x-2 text-zinc-400/90">
                     <Package className="w-4 h-4" />
                     <span>
                       {totalItems} article{totalItems > 1 ? "s" : ""}
                     </span>
                   </div>
                   <div className="flex items-center space-x-2">
                     <CreditCard className="w-4 h-4 text-amber-300/90" />
                     <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 text-transparent bg-clip-text font-bold text-lg">
                       {order.amount.toLocaleString("fr-FR")}€
                     </span>
                   </div>
                 </div>
               </div>

               {/* Bouton Détails */}
               <motion.button
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.98 }}
                 className="group/btn relative overflow-hidden flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-amber-400/10 to-amber-600/10 hover:from-amber-400/20 hover:to-amber-600/20 text-amber-300/90 hover:text-amber-300 border border-amber-400/20 hover:border-amber-400/40 rounded-xl transition-all duration-300 backdrop-blur-sm"
               >
                 <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/10 to-amber-400/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                 <Eye className="w-4 h-4 relative z-10" />
                 <span className="text-sm font-medium tracking-wide relative z-10">
                   Détails
                 </span>
                 <ChevronRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-200" />
               </motion.button>
             </div>

             {/* Détails des articles */}
             {order.items.length > 0 && (
               <motion.div
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: "auto" }}
                 transition={{ duration: 0.3, delay: 0.2 }}
                 className="mt-6 bg-black/60 backdrop-blur-sm rounded-xl border border-zinc-800/90 overflow-hidden"
               >
                 <div className="bg-gradient-to-r from-amber-400/5 to-transparent p-4">
                   <h4 className="text-xs tracking-[0.3em] text-zinc-400/90 uppercase font-medium mb-3">
                     Articles commandés
                   </h4>
                   <div className="space-y-3">
                     {order.items.map((item, index) => (
                       <motion.div
                         key={index}
                         initial={{ opacity: 0, x: -10 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ duration: 0.3, delay: index * 0.1 }}
                         className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 transition-colors duration-200"
                       >
                         <div className="flex-1">
                           <span className="text-zinc-300/90 font-medium">
                             {item.name}
                           </span>
                         </div>
                         <div className="flex items-center space-x-4 text-sm">
                           <span className="text-zinc-400/90">
                             Qté: {item.quantity}
                           </span>
                           <span className="text-amber-300/90 font-semibold">
                             {(item.quantity * item.price).toLocaleString(
                               "fr-FR"
                             )}
                             €
                           </span>
                         </div>
                       </motion.div>
                     ))}
                   </div>
                 </div>
               </motion.div>
             )}
           </div>
         </motion.div>
       );
     })}
   </div>
 );
};

export default OrdersSection;
