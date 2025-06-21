import { Schema, model, models } from "mongoose";

const SettingsSchema = new Schema({
  siteName: { type: String, default: "Maison Luxe" },
  siteDescription: { type: String, default: "Boutique de luxe exceptionnelle" },
  maintenanceMode: { type: Boolean, default: false },
  emailNotifications: { type: Boolean, default: true },
  orderNotifications: { type: Boolean, default: true },
  stockAlerts: { type: Boolean, default: true },
  twoFactorAuth: { type: Boolean, default: false },
  autoBackup: { type: Boolean, default: true },
  theme: { type: String, default: "dark" },
  language: { type: String, default: "fr" },
});

const Settings = models.Settings || model("Settings", SettingsSchema);
export default Settings;
