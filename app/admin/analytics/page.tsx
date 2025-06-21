"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Eye,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";

// Composant de carte de statistique
const StatCard = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  delay = 0,
}) => (
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

// Composant de graphique simulé
const ChartCard = ({ title, children, delay = 0 }) => (
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
          <button className="p-2 rounded-lg bg-black/60 border border-zinc-800/90 hover:border-amber-400/30 transition-colors">
            <Filter className="h-4 w-4 text-zinc-400" />
          </button>
          <button className="p-2 rounded-lg bg-black/60 border border-zinc-800/90 hover:border-amber-400/30 transition-colors">
            <Download className="h-4 w-4 text-zinc-400" />
          </button>
        </div>
      </div>
      {children}
    </div>
  </motion.div>
);

// Composant de barre de progression
const ProgressBar = ({ label, value, maxValue, color = "amber" }) => {
  const percentage = (value / maxValue) * 100;

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

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulation du rechargement
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative border-b border-zinc-800/50 bg-gradient-to-t from-amber-400/5 to-transparent"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[size:20px_20px] opacity-30" />
        <div className="relative px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 text-transparent bg-clip-text">
                Analytics Dashboard
              </h1>
              <p className="text-zinc-400/90 mt-1">
                Tableau de bord des performances de votre boutique
              </p>
            </div>
            <div className="flex items-center gap-4">
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
              >
                <RefreshCw
                  className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                Actualiser
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="px-8 py-8 space-y-8">
        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Revenus totaux"
            value="€47,392"
            change="+12.5%"
            changeType="up"
            icon={DollarSign}
            delay={0.1}
          />
          <StatCard
            title="Commandes"
            value="1,249"
            change="+8.2%"
            changeType="up"
            icon={ShoppingCart}
            delay={0.2}
          />
          <StatCard
            title="Visiteurs uniques"
            value="12,489"
            change="-2.4%"
            changeType="down"
            icon={Users}
            delay={0.3}
          />
          <StatCard
            title="Pages vues"
            value="48,392"
            change="+15.7%"
            changeType="up"
            icon={Eye}
            delay={0.4}
          />
        </div>

        {/* Graphiques principaux */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Évolution des ventes" delay={0.5}>
            <div className="h-64 flex items-end justify-between gap-2">
              {[65, 78, 52, 89, 94, 76, 88, 92, 85, 97, 89, 94].map(
                (height, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
                    className="flex-1 bg-gradient-to-t from-amber-400/60 to-amber-300/80 rounded-t-sm min-w-0"
                  />
                )
              )}
            </div>
            <div className="flex justify-between text-xs text-zinc-400/90 mt-4">
              <span>Jan</span>
              <span>Fév</span>
              <span>Mar</span>
              <span>Avr</span>
              <span>Mai</span>
              <span>Jun</span>
            </div>
          </ChartCard>

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
                <span className="text-lg font-bold text-amber-300/90">
                  23.6%
                </span>
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Métriques détaillées */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartCard title="Top Produits" delay={0.7}>
            <div className="space-y-4">
              {[
                { name: "Sac Hermès Kelly", sales: 89, revenue: "€12,450" },
                {
                  name: "Montre Rolex Submariner",
                  sales: 67,
                  revenue: "€8,900",
                },
                { name: "Parfum Chanel N°5", sales: 156, revenue: "€6,780" },
                { name: "Chaussures Louboutin", sales: 43, revenue: "€4,320" },
              ].map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-black/60 rounded-lg border border-zinc-800/90"
                >
                  <div>
                    <p className="text-sm font-medium text-white/95">
                      {product.name}
                    </p>
                    <p className="text-xs text-zinc-400/90">
                      {product.sales} ventes
                    </p>
                  </div>
                  <span className="text-sm font-bold text-amber-300/90">
                    {product.revenue}
                  </span>
                </motion.div>
              ))}
            </div>
          </ChartCard>

          <ChartCard title="Sources de trafic" delay={0.8}>
            <div className="space-y-4">
              <ProgressBar
                label="Recherche organique"
                value={4892}
                maxValue={8000}
              />
              <ProgressBar
                label="Réseaux sociaux"
                value={2847}
                maxValue={8000}
              />
              <ProgressBar
                label="Email marketing"
                value={1956}
                maxValue={8000}
              />
              <ProgressBar
                label="Publicité payante"
                value={1294}
                maxValue={8000}
                color="green"
              />
            </div>
          </ChartCard>

          <ChartCard title="Métriques temps réel" delay={0.9}>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gradient-to-t from-black/60 to-transparent rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm text-zinc-300/90">
                    Visiteurs actifs
                  </span>
                </div>
                <span className="text-lg font-bold text-white/95">247</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-t from-black/60 to-transparent rounded-lg">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-amber-400/90" />
                  <span className="text-sm text-zinc-300/90">
                    Pages par session
                  </span>
                </div>
                <span className="text-lg font-bold text-white/95">3.2</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-t from-black/60 to-transparent rounded-lg">
                <div className="flex items-center gap-3">
                  <Target className="w-4 h-4 text-amber-400/90" />
                  <span className="text-sm text-zinc-300/90">
                    Temps sur site
                  </span>
                </div>
                <span className="text-lg font-bold text-white/95">4m 32s</span>
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Alertes et notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-xl p-6 border border-amber-400/20"
        >
          <h3 className="text-lg font-semibold text-white/95 mb-4">
            Alertes & Recommandations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-400">
                  Performance exceptionnelle
                </p>
                <p className="text-xs text-zinc-300/90 mt-1">
                  Les ventes ont augmenté de 15% cette semaine
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <BarChart3 className="w-5 h-5 text-amber-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-400">
                  Optimisation suggérée
                </p>
                <p className="text-xs text-zinc-300/90 mt-1">
                  Considérez une campagne pour les produits à faible rotation
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
