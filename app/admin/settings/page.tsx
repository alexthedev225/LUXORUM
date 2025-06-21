"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Settings,
  Bell,
  Shield,
  Globe,
  Palette,
  Database,
  Mail,
  Users,
  CreditCard,
  Key,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  CheckCircle,
} from "lucide-react";
import * as Switch from "@radix-ui/react-switch";
import * as Tabs from "@radix-ui/react-tabs";
import * as Select from "@radix-ui/react-select";
import { toast } from "react-hot-toast";

interface SettingSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

const settingSections: SettingSection[] = [
  {
    id: "general",
    title: "Général",
    icon: <Settings className="w-5 h-5" />,
    description: "Paramètres de base de la boutique",
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: <Bell className="w-5 h-5" />,
    description: "Gestion des alertes et notifications",
  },
  {
    id: "security",
    title: "Sécurité",
    icon: <Shield className="w-5 h-5" />,
    description: "Paramètres de sécurité et authentification",
  },
  {
    id: "appearance",
    title: "Apparence",
    icon: <Palette className="w-5 h-5" />,
    description: "Thème et personnalisation visuelle",
  },
  {
    id: "integrations",
    title: "Intégrations",
    icon: <Database className="w-5 h-5" />,
    description: "API et services externes",
  },
];

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "Maison Luxe",
    siteDescription: "Boutique de luxe exceptionnelle",
    maintenanceMode: false,
    emailNotifications: true,
    orderNotifications: true,
    stockAlerts: true,
    twoFactorAuth: false,
    autoBackup: true,
    theme: "dark",
    language: "fr",
  });
  // Charger settings depuis l'API au chargement
  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
        }
      } catch (error) {
        console.error("Erreur récupération settings:", error);
      }
    }
    fetchSettings();
  }, []);
  // Sauvegarder settings via API
  const handleSave = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        toast.success("Paramètres sauvegardés avec succès");
      } else {
        toast.error("Erreur lors de la sauvegarde");
      }
    } catch (error) {
      toast.error("Erreur réseau");
    }
    setIsLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="min-h-screen  p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div className="mb-8" variants={itemVariants}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light text-white/95 mb-2">
              Paramètres
            </h1>
            <p className="text-zinc-400/90">
              Configurez et personnalisez votre boutique de luxe
            </p>
          </div>

          <motion.button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-amber-500 hover:bg-amber-600 text-black px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isLoading ? "Sauvegarde..." : "Sauvegarder"}
          </motion.button>
        </div>
      </motion.div>

      {/* Tabs Navigation */}
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <motion.div variants={itemVariants}>
          <Tabs.List className="flex gap-2 mb-8 bg-zinc-800/50 p-2 rounded-xl border border-zinc-800/50">
            {settingSections.map((section) => (
              <Tabs.Trigger
                key={section.id}
                value={section.id}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400/20 data-[state=active]:to-amber-300/20 data-[state=active]:text-amber-300 text-zinc-400 hover:text-zinc-300 data-[state=active]:border data-[state=active]:border-amber-400/30"
              >
                {section.icon}
                {section.title}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </motion.div>

        {/* General Settings */}
        <Tabs.Content value="general">
          <motion.div className="space-y-6" variants={containerVariants}>
            <motion.div
              className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-xl p-6 border border-zinc-800/50"
              variants={itemVariants}
            >
              <h3 className="text-xl font-medium text-white/95 mb-6 flex items-center gap-3">
                <Globe className="w-5 h-5 text-amber-400" />
                Informations de la boutique
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-300/90 mb-2">
                    Nom de la boutique
                  </label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) =>
                      setSettings({ ...settings, siteName: e.target.value })
                    }
                    className="w-full bg-black/60 border border-zinc-800/50 rounded-lg px-4 py-3 text-white/95 focus:border-amber-400/50 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300/90 mb-2">
                    Langue
                  </label>
                  <Select.Root
                    value={settings.language}
                    onValueChange={(value) =>
                      setSettings({ ...settings, language: value })
                    }
                  >
                    <Select.Trigger className="w-full bg-black/60 border border-zinc-800/50 rounded-lg px-4 py-3 text-white/95 focus:border-amber-400/50 flex items-center justify-between">
                      <Select.Value />
                      <Select.Icon />
                    </Select.Trigger>
                    <Select.Content className="bg-zinc-900 border border-zinc-800/50 rounded-lg overflow-hidden">
                      <Select.Item
                        value="fr"
                        className="px-4 py-2 text-white/95 hover:bg-amber-400/20 cursor-pointer"
                      >
                        Français
                      </Select.Item>
                      <Select.Item
                        value="en"
                        className="px-4 py-2 text-white/95 hover:bg-amber-400/20 cursor-pointer"
                      >
                        English
                      </Select.Item>
                    </Select.Content>
                  </Select.Root>
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-zinc-300/90 mb-2">
                    Description
                  </label>
                  <textarea
                    value={settings.siteDescription}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        siteDescription: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full bg-black/60 border border-zinc-800/50 rounded-lg px-4 py-3 text-white/95 focus:border-amber-400/50 focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-xl p-6 border border-zinc-800/50"
              variants={itemVariants}
            >
              <h3 className="text-xl font-medium text-white/95 mb-6 flex items-center gap-3">
                <Settings className="w-5 h-5 text-amber-400" />
                Paramètres système
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-zinc-800/30">
                  <div>
                    <h4 className="text-white/95 font-medium">
                      Mode maintenance
                    </h4>
                    <p className="text-zinc-400/90 text-sm">
                      Désactiver temporairement la boutique
                    </p>
                  </div>
                  <Switch.Root
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, maintenanceMode: checked })
                    }
                    className="w-11 h-6 bg-zinc-700 rounded-full data-[state=checked]:bg-amber-500 transition-colors"
                  >
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg transform transition-transform data-[state=checked]:translate-x-5 translate-x-0.5" />
                  </Switch.Root>
                </div>

                <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-zinc-800/30">
                  <div>
                    <h4 className="text-white/95 font-medium">
                      Sauvegarde automatique
                    </h4>
                    <p className="text-zinc-400/90 text-sm">
                      Sauvegarde quotidienne des données
                    </p>
                  </div>
                  <Switch.Root
                    checked={settings.autoBackup}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, autoBackup: checked })
                    }
                    className="w-11 h-6 bg-zinc-700 rounded-full data-[state=checked]:bg-amber-500 transition-colors"
                  >
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg transform transition-transform data-[state=checked]:translate-x-5 translate-x-0.5" />
                  </Switch.Root>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Tabs.Content>

        {/* Notifications Settings */}
        <Tabs.Content value="notifications">
          <motion.div className="space-y-6" variants={containerVariants}>
            <motion.div
              className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-xl p-6 border border-zinc-800/50"
              variants={itemVariants}
            >
              <h3 className="text-xl font-medium text-white/95 mb-6 flex items-center gap-3">
                <Bell className="w-5 h-5 text-amber-400" />
                Notifications par email
              </h3>

              <div className="space-y-4">
                {[
                  {
                    key: "emailNotifications",
                    title: "Notifications générales",
                    description: "Recevoir les alertes importantes",
                  },
                  {
                    key: "orderNotifications",
                    title: "Nouvelles commandes",
                    description: "Être notifié des nouvelles commandes",
                  },
                  {
                    key: "stockAlerts",
                    title: "Alertes de stock",
                    description: "Stock faible et ruptures",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-zinc-800/30"
                  >
                    <div>
                      <h4 className="text-white/95 font-medium">
                        {item.title}
                      </h4>
                      <p className="text-zinc-400/90 text-sm">
                        {item.description}
                      </p>
                    </div>
                    <Switch.Root
                      checked={
                        settings[item.key as keyof typeof settings] as boolean
                      }
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, [item.key]: checked })
                      }
                      className="w-11 h-6 bg-zinc-700 rounded-full data-[state=checked]:bg-amber-500 transition-colors"
                    >
                      <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg transform transition-transform data-[state=checked]:translate-x-5 translate-x-0.5" />
                    </Switch.Root>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </Tabs.Content>

        {/* Security Settings */}
        <Tabs.Content value="security">
          <motion.div className="space-y-6" variants={containerVariants}>
            <motion.div
              className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-xl p-6 border border-zinc-800/50"
              variants={itemVariants}
            >
              <h3 className="text-xl font-medium text-white/95 mb-6 flex items-center gap-3">
                <Shield className="w-5 h-5 text-amber-400" />
                Authentification et sécurité
              </h3>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-zinc-800/30">
                  <div>
                    <h4 className="text-white/95 font-medium">
                      Authentification à deux facteurs
                    </h4>
                    <p className="text-zinc-400/90 text-sm">
                      Sécurité renforcée pour les connexions
                    </p>
                  </div>
                  <Switch.Root
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, twoFactorAuth: checked })
                    }
                    className="w-11 h-6 bg-zinc-700 rounded-full data-[state=checked]:bg-amber-500 transition-colors"
                  >
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg transform transition-transform data-[state=checked]:translate-x-5 translate-x-0.5" />
                  </Switch.Root>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300/90 mb-2">
                    Nouveau mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      className="w-full bg-black/60 border border-zinc-800/50 rounded-lg px-4 py-3 pr-12 text-white/95 focus:border-amber-400/50 focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-amber-400 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Tabs.Content>

        {/* Appearance Settings */}
        <Tabs.Content value="appearance">
          <motion.div className="space-y-6" variants={containerVariants}>
            <motion.div
              className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-xl p-6 border border-zinc-800/50"
              variants={itemVariants}
            >
              <h3 className="text-xl font-medium text-white/95 mb-6 flex items-center gap-3">
                <Palette className="w-5 h-5 text-amber-400" />
                Thème et apparence
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/40 rounded-lg p-4 border border-zinc-800/30">
                  <h4 className="text-white/95 font-medium mb-3">
                    Thème sombre
                  </h4>
                  <div className="h-20 bg-gradient-to-b from-black via-zinc-950 to-black rounded border-2 border-amber-400/50 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-amber-400" />
                  </div>
                </div>

                <div className="bg-black/40 rounded-lg p-4 border border-zinc-800/30 opacity-50">
                  <h4 className="text-white/95 font-medium mb-3">
                    Thème clair (bientôt)
                  </h4>
                  <div className="h-20 bg-gradient-to-b from-zinc-100 to-white rounded border border-zinc-300 flex items-center justify-center">
                    <span className="text-zinc-600 text-sm">Prochainement</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Tabs.Content>

        {/* Integrations Settings */}
        <Tabs.Content value="integrations">
          <motion.div className="space-y-6" variants={containerVariants}>
            <motion.div
              className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-xl p-6 border border-zinc-800/50"
              variants={itemVariants}
            >
              <h3 className="text-xl font-medium text-white/95 mb-6 flex items-center gap-3">
                <Database className="w-5 h-5 text-amber-400" />
                Services externes
              </h3>

              <div className="space-y-4">
                {[
                  {
                    name: "Stripe",
                    icon: <CreditCard className="w-5 h-5" />,
                    status: "Connecté",
                    color: "text-green-400",
                  },
                  {
                    name: "MailChimp",
                    icon: <Mail className="w-5 h-5" />,
                    status: "Connecté",
                    color: "text-green-400",
                  },
                  {
                    name: "Analytics",
                    icon: <Users className="w-5 h-5" />,
                    status: "Non configuré",
                    color: "text-amber-400",
                  },
                ].map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-zinc-800/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-amber-400">{service.icon}</div>
                      <div>
                        <h4 className="text-white/95 font-medium">
                          {service.name}
                        </h4>
                        <p className={`text-sm ${service.color}`}>
                          {service.status}
                        </p>
                      </div>
                    </div>
                    <button className="text-zinc-400 hover:text-amber-400 transition-colors">
                      <Key className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </Tabs.Content>
      </Tabs.Root>
    </motion.div>
  );
}
