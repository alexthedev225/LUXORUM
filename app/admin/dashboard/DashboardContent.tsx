"use client";

import { motion } from "framer-motion";
import {
  ShoppingBag,
  Users,
  CreditCard,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  TrendingUp,
  Package,
  Eye,
  Link,
  XCircle,
} from "lucide-react";
import VoirPlusCommandesButton from "./VoirPlusCommandesButton";

type OrderStatus = "pending" | "paid" | "failed";

export type DashboardStats = {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  lowStockProducts: number;
  recentOrders: {
    id: string;
    date: string;
    customer: string;
    status: OrderStatus;
    total: number;
  }[];
  salesData: {
    date: string;
    amount: number;
  }[];
};

type DashboardContentProps = {
  stats: DashboardStats;
};

export default function DashboardContent({ stats }: DashboardContentProps) {
  // Animation des éléments au chargement
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      scale: 1.02,
      y: -8,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Fonction pour obtenir la couleur du statut et l'icône
  const getStatusDetails = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return {
          color: "text-amber-300/90",
          bgColor: "bg-amber-400/10",
          borderColor: "border-amber-400/20",
          icon: <AlertTriangle className="h-3.5 w-3.5" />,
          label: "En attente",
        };
      case "paid":
        return {
          color: "text-blue-300/90",
          bgColor: "bg-blue-400/10",
          borderColor: "border-blue-400/20",
          icon: <CreditCard className="h-3.5 w-3.5" />,
          label: "Payé",
        };
      case "failed":
        return {
          color: "text-red-300/90",
          bgColor: "bg-red-400/10",
          borderColor: "border-red-400/20",
          icon: <XCircle className="h-3.5 w-3.5" />,
          label: "Échoué",
        };
      default:
        return {
          color: "text-zinc-300/90",
          bgColor: "bg-zinc-400/10",
          borderColor: "border-zinc-400/20",
          icon: <AlertTriangle className="h-3.5 w-3.5" />,
          label: "Inconnu",
        };
    }
  };


  const statCards = [
    {
      title: "Chiffre d'affaires",
      value: stats.totalRevenue.toLocaleString("fr-FR") + " €",
      icon: <CreditCard className="h-7 w-7" />,
      change: "+12.3%",
      trend: "up",
      description: "Par rapport au mois dernier",
    },
    {
      title: "Commandes",
      value: stats.totalOrders.toString(),
      icon: <ShoppingBag className="h-7 w-7" />,
      change: "+3.2%",
      trend: "up",
      description: "Nouvelles commandes cette semaine",
    },
    {
      title: "Utilisateurs",
      value: stats.totalUsers.toString(),
      icon: <Users className="h-7 w-7" />,
      change: "+5.7%",
      trend: "up",
      description: "Comptes clients actifs",
    },
    {
      title: "Produits en rupture",
      value: stats.lowStockProducts.toString(),
      icon: <AlertTriangle className="h-7 w-7" />,
      change: "-2.8%",
      trend: "down",
      description: "Nécessitent un réapprovisionnement",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Pattern décoratif subtil */}
      <div className="fixed inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      <div className="relative">
        {/* En-tête avec lueur dorée */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-amber-400/5 to-transparent blur-3xl" />
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
                  Tableau de bord
                </span>
              </h1>
              <p className="text-lg text-zinc-300/90 font-light tracking-wide">
                Vue d'ensemble de votre boutique{" "}
                <span className="text-amber-300/90 font-medium">Luxorum</span>
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Cartes de statistiques premium */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {statCards.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover="hover"
                className="group cursor-pointer"
              >
                <motion.div
                  variants={cardHoverVariants}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-amber-400/20 p-8 backdrop-blur-sm"
                >
                  {/* Lueur dorée au survol */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Contenu */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-black/60 border border-zinc-800/50 text-amber-300/90 group-hover:border-amber-400/30 transition-colors duration-500">
                        {stat.icon}
                      </div>
                      <div
                        className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-500 ${
                          stat.trend === "up"
                            ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300/90"
                            : "border-red-400/20 bg-red-400/10 text-red-300/90"
                        }`}
                      >
                        {stat.trend === "up" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )}
                        {stat.change}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm font-medium text-zinc-400/90 tracking-wide uppercase">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-white/95 tracking-tight">
                        {stat.value}
                      </p>
                      <p className="text-xs text-zinc-400/80 leading-relaxed">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Section graphique et commandes */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Graphique des ventes premium */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-amber-400/20 p-8 backdrop-blur-sm">
                {/* Lueur dorée de fond */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-400/5 to-transparent" />

                <div className="relative">
                  <div className="mb-8 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white/95 mb-2">
                        Évolution des ventes
                      </h3>
                      <p className="text-sm text-zinc-400/90">
                        Performance de la semaine passée
                      </p>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl bg-black/60 border border-zinc-800/50 px-4 py-2">
                      <TrendingUp className="h-4 w-4 text-amber-300/90" />
                      <span className="text-sm text-zinc-300/90 font-medium">
                        Cette semaine
                      </span>
                    </div>
                  </div>

                  {/* Graphique en barres stylisé */}
                  <div className="h-80 p-4">
                    <div className="flex h-full w-full items-end justify-between gap-3">
                      {stats.salesData.map((point, idx) => {
                        {
                          console.log("salesData", stats.salesData);
                        }

                        const maxAmount = Math.max(
                          ...stats.salesData.map((p) => p.amount)
                        );
                        const heightPercent = (point.amount / maxAmount) * 100;
                        return (
                          <motion.div
                            key={idx}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            transition={{
                              delay: idx * 0.1 + 0.5,
                              duration: 0.8,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="flex flex-col items-center gap-3 group cursor-pointer"
                          >
                            <div className="relative">
                              <div
                                className="w-8 rounded-t-xl bg-gradient-to-t from-amber-400/60 to-amber-300/80 group-hover:from-amber-400/80 group-hover:to-amber-300/100 transition-all duration-300"
                                style={{ height: `${heightPercent * 2.4}px` }}
                              />
                              {/* Lueur sur la barre */}
                              <div className="absolute inset-0 rounded-t-xl bg-gradient-to-t from-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="text-center">
                              <span className="block text-xs text-zinc-400/90 font-medium">
                                {point.date}
                              </span>
                              <span className="block text-xs text-amber-300/90 font-semibold mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {point.amount.toLocaleString()}€
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Commandes récentes premium */}
            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-amber-400/20 p-8 backdrop-blur-sm"
            >
              {/* Lueur dorée de fond */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-400/5 to-transparent" />

              <div className="relative">
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white/95 mb-2">
                    Commandes récentes
                  </h3>
                  <p className="text-sm text-zinc-400/90">
                    Dernières transactions
                  </p>
                </div>

                <div className="space-y-4">
                  {stats.recentOrders.map((order, index) => {
                    const { color, bgColor, borderColor, icon, label } =
                      getStatusDetails(order.status);
                    return (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.1 + 0.7,
                          duration: 0.6,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        className="group relative overflow-hidden rounded-xl bg-black/60 border border-zinc-800/50 p-4 cursor-pointer hover:border-amber-400/30 transition-all duration-300"
                      >
                        {/* Lueur au survol */}
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-semibold text-white/95 mb-1 group-hover:text-amber-100/95 transition-colors">
                              {order.customer}
                            </p>
                            <p className="text-xs text-zinc-400/80 tracking-wide">
                              {new Date(order.date).toLocaleDateString(
                                "fr-FR",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <div
                              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${color} ${bgColor} ${borderColor}`}
                            >
                              {icon}
                              <span className="hidden sm:inline">{label}</span>
                            </div>
                            <div className="text-right">
                              <span className="block text-sm font-bold text-white/95">
                                {order.total.toLocaleString("fr-FR", {
                                  style: "currency",
                                  currency: "EUR",
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                <VoirPlusCommandesButton />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
