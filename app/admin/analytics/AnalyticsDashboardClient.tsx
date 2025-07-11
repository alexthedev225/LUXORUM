"use client";

import { useState,ReactNode, useCallback } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Eye,
  RefreshCw,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "up" | "down";
  icon: React.ComponentType<{ className?: string }>;
  delay?: number;
}

const StatCard = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  delay = 0,
}: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-xl p-6 border border-zinc-800/50 hover:border-amber-400/30 transition-all duration-500">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-black/60 border border-zinc-800/90">
          <Icon className="h-6 w-6 text-amber-400/90" />
        </div>
        {change && (
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              changeType === "up"
                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                : "bg-red-500/10 text-red-400 border border-red-500/20"
            }`}
          >
            {changeType === "up" ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {change}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-sm tracking-[0.3em] text-zinc-400/90 uppercase font-light">
          {title}
        </h3>
        <p className="text-2xl font-bold text-white/95">{value}</p>
      </div>
    </div>
  </motion.div>
);

interface TooltipWrapperProps {
  children: ReactNode;
  text: string;
}

const TooltipWrapper = ({ children, text }: TooltipWrapperProps) => (
  <div className="relative group cursor-help inline-block">
    {children}
    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none bg-zinc-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10 transition-opacity">
      {text}
    </div>
  </div>
);

interface ChartCardProps {
  title: string;
  children: ReactNode;
  delay?: number;
}

const ChartCard = ({ title, children, delay = 0 }: ChartCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[size:20px_20px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="relative bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-xl p-6 border border-zinc-800/50 hover:border-amber-400/20 transition-all duration-500">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white/95">{title}</h3>
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-lg bg-black/60 border border-zinc-800/90 hover:border-amber-400/30 transition-colors"
            title="Filtrer (non fonctionnel)"
            type="button"
          >
            <Filter className="h-4 w-4 text-zinc-400" />
          </button>
          <button
            className="p-2 rounded-lg bg-black/60 border border-zinc-800/90 hover:border-amber-400/30 transition-colors"
            title="Télécharger (non fonctionnel)"
            type="button"
          >
            <Download className="h-4 w-4 text-zinc-400" />
          </button>
        </div>
      </div>
      {children}
    </div>
  </motion.div>
);

interface ProgressBarProps {
  label: string;
  value: number;
  maxValue: number;
  color?: "amber" | "green";
}

const ProgressBar = ({
  label,
  value,
  maxValue,
  color = "amber",
}: ProgressBarProps) => {
  const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-zinc-300/90">{label}</span>
        <span className="text-sm font-medium text-white/95">
          {value.toLocaleString()}
        </span>
      </div>
      <div className="h-2 bg-zinc-800/80 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`h-full bg-gradient-to-r ${
            color === "amber"
              ? "from-amber-400/60 to-amber-300/80"
              : "from-green-400/60 to-green-300/80"
          } rounded-full`}
        />
      </div>
    </div>
  );
};

interface SalesDataPoint {
  date: string;
  amount: number;
}

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  salesData: SalesDataPoint[];
  // ajoute d'autres propriétés si besoin
}

interface AnalyticsDashboardClientProps {
  stats: Stats;
}

export default function AnalyticsDashboardClient({
  stats: initialStats,
}: AnalyticsDashboardClientProps) {
  const [timeRange, setTimeRange] = useState<string>("7d");
  const [stats, setStats] = useState<Stats>(initialStats);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch(`/api/analytics?timeRange=${timeRange}`);
      if (!res.ok) throw new Error("Erreur de chargement");
      const data = (await res.json()) as Stats;
      setStats(data);
    } catch (e) {
      console.error(e);
      alert("Erreur lors du chargement des données");
    }
    setIsRefreshing(false);
  }, [timeRange]);

  return (
    <div>
      {/* Filtres & bouton refresh */}
      <div className="flex items-center justify-between mb-6">
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 bg-black/80 border border-zinc-800/90 rounded-lg text-zinc-300/90 focus:border-amber-400/30 focus:outline-none transition-colors"
        >
          <option value="24h">Dernières 24h</option>
          <option value="7d">7 derniers jours</option>
          <option value="30d">30 derniers jours</option>
          <option value="90d">90 derniers jours</option>
        </select>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-lg transition-colors disabled:opacity-50"
          type="button"
        >
          <RefreshCw
            className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
          />
          Actualiser
        </motion.button>
      </div>

      {/* Cartes stats principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Revenus totaux"
          value={stats.totalRevenue.toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR",
          })}
          change="+12.5%"
          changeType="up"
          icon={DollarSign}
          delay={0.1}
        />
        <StatCard
          title="Commandes"
          value={stats.totalOrders.toLocaleString("fr-FR")}
          change="+8.2%"
          changeType="up"
          icon={ShoppingCart}
          delay={0.2}
        />

        {/* Tooltip ajouté ici */}
        <TooltipWrapper text="Donnée factice, en attente d’intégration réelle">
          <StatCard
            title="Visiteurs uniques"
            value="12,489"
            change="-2.4%"
            changeType="down"
            icon={Users}
            delay={0.3}
          />
        </TooltipWrapper>

        <TooltipWrapper text="Donnée factice, en attente d’intégration réelle">
          <StatCard
            title="Pages vues"
            value="48,392"
            change="+15.7%"
            changeType="up"
            icon={Eye}
            delay={0.4}
          />
        </TooltipWrapper>
      </div>

      {/* Graphique Évolution des ventes */}
      <ChartCard title="Évolution des ventes" delay={0.5}>
        <div className="h-64 flex items-end justify-between gap-1">
          {stats.salesData.map((point, index) => {
            const maxAmount = Math.max(...stats.salesData.map((p) => p.amount));
            const heightPercent = maxAmount
              ? (point.amount / maxAmount) * 100
              : 0;

            return (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${heightPercent}%` }}
                transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
                className="w-6 bg-gradient-to-t from-amber-400/60 to-amber-300/80 rounded-t-sm"
                title={`${point.date}: ${point.amount.toLocaleString()}€`}
              />
            );
          })}
        </div>

        <div className="flex justify-between text-xs text-zinc-400/90 mt-4">
          {stats.salesData.map((point, idx) => (
            <span key={idx}>{point.date}</span>
          ))}
        </div>
      </ChartCard>

      {/* Taux de conversion */}
      <ChartCard title="Taux de conversion" delay={0.6}>
        <div className="space-y-4">
          <ProgressBar
            label="Visiteurs → Ajouts panier"
            value={2847}
            maxValue={5000}
          />
          <ProgressBar
            label="Ajouts panier → Commandes"
            value={1249}
            maxValue={2847}
          />
          <ProgressBar
            label="Commandes → Paiements"
            value={1182}
            maxValue={1249}
            color="green"
          />
        </div>
        <div className="mt-6 p-4 bg-black/60 rounded-lg border border-zinc-800/90">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400/90">Taux global</span>
            <span className="text-lg font-bold text-amber-300/90">23.6%</span>
          </div>
        </div>
      </ChartCard>
    </div>
  );
}
