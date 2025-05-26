# 🚀 Prompt de démarrage – Luxorum

---

Je développe une application e-commerce fictive appelée **Luxorum**.

## 🧱 Stack technique

- **Next.js 15 FRONTEND & BACKEND(App Router)**
- **Mongoose** avec **MongoDB**
- **Stripe** en **mode test** pour la gestion des paiements
- **TailwindCSS** pour le style
- **Radix UI notament shadcn** pour les composants accessibles
- **Lucide** pour les icônes
- **Framer Motion** pour les animations

---

## 🎯 Objectif

Je vais demander :
- des composants,
- des pages frontend,
- de la logique backend (API routes, handlers),
- ou d'autres fonctions selon les besoins.

Fournis-moi uniquement ce dont j’ai besoin **pour coder**, avec **des données factices** si l’intégration réelle n’est pas encore prête.


---

## 📁 Fichiers de référence à insérer ici si besoin

Pour faciliter la reprise du projet, je peux insérer ici les fichiers essentiels à mon environnement de développement :

### ✅ `package.json`

{
  "name": "next-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "insert:categories": "node scripts/insertCategories.mjs",
    "insert:products": "node scripts/insertProducts.mjs",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "setup-db": "node scripts/setup-database.mjs"
  },
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.0.1",
    "@prisma/client": "6.7.0",
    "@radix-ui/react-checkbox": "^1.3.2",
    "@radix-ui/react-dialog": "^1.1.11",
    "@radix-ui/react-label": "^2.1.6",
    "@radix-ui/react-navigation-menu": "^1.2.10",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-slot": "^1.2.0",
    "@sentry/nextjs": "^9.21.0",
    "@types/tailwindcss": "^3.1.0",
    "@upstash/ratelimit": "^1.2.1",
    "@upstash/redis": "^1.28.0",
    "bcryptjs": "^3.0.2",
    "chart.js": "^4.0.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^2.30.0",
    "dotenv": "^16.5.0",
    "framer-motion": "^12.9.2",
    "jose": "^6.0.11",
    "js-cookie": "^3.0.5",
    "jsonwebtoken": "^9.0.2",
    "lucide-react": "^0.503.0",
    "mongoose": "^8.15.0",
    "next": "15.3.1",
    "react": "^19.0.0",
    "react-chartjs-2": "^5.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.56.4",
    "react-hot-toast": "^2.5.2",
    "resend": "^2.0.0",
    "runtime": "link:@prisma/client/runtime",
    "sonner": "^2.0.3",
    "stripe": "^14.0.0",
    "tailwind-merge": "^3.2.0",
    "tailwindcss-animate": "^1.0.7",
    "xlsx": "^0.18.5",
    "zod": "^3.25.28",
    "zustand": "^5.0.5"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/bcryptjs": "^3.0.0",
    "@types/js-cookie": "^3.0.6",
    "@types/jsonwebtoken": "^9.0.9",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.3.1",
    "prisma": "6.7.0",
    "tailwindcss": "^4",
    "ts-node": "^10.9.2",
    "tw-animate-css": "^1.2.8",
    "typescript": "^5"
  }
}



---


### ✅ `tailwind.config.ts`

import type { Config } from "tailwindcss";

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./styles/**/*.{css,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#D4AF37",
        dark: "#0B0B0B",
        anthracite: "#1E1E1E",
        offwhite: "#F5F5F5",
        metallic: "#888888",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        cinzel: ["Cinzel", "serif"],
        "cinzel-decorative": ["Cinzel Decorative", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "gold-breathe": "gold-breathe 8s ease-in-out infinite",
        "gold-pulse": "gold-pulse 12s ease-in-out infinite",
        "gold-rotate": "gold-rotate 20s linear infinite",
        "gold-shimmer": "gold-shimmer 15s ease-in-out infinite",
        "gold-stars": "gold-stars 10s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;


---
Palette de Couleurs

| Classe Tailwind                                                                 | Rôle / Couleur                                    | Utilisation                                                |
|----------------------------------------------------------------------------------|--------------------------------------------------|-------------------------------------------------------------|
| `bg-gradient-to-b from-black via-zinc-950 to-black`                              | Dégradé noir vertical                            | Fond principal de la page produit                          |
| `bg-gradient-to-br from-zinc-900 via-black to-zinc-900`                          | Dégradé sombre biseauté                          | Fond de la carte produit                                   |
| `bg-[radial-gradient(#ffffff11_1px,transparent_1px)]`                            | Texture en pointillé blanc très subtil           | Overlay décoratif                                          |
| `bg-gradient-to-t from-amber-400/5 to-transparent`                               | Dégradé doré léger                               | Lueur supérieure de la carte                               |
| `border-amber-400/20`, `border-amber-400/30`                                     | Or pâle, semi-transparent                        | Bordure de carte et étiquettes                             |
| `bg-black/80`, `bg-black/60`                                                     | Fond noir semi-transparent                       | Overlays, encadrés, info sections                          |
| `bg-gradient-to-t from-black/60 to-transparent`                                  | Dégradé noir vers transparent                    | Overlay d’image                                            |
| `text-xs text-amber-300/90`                                                      | Texte doré clair                                 | Valeurs numériques dans les stats                          |
| `bg-zinc-800/80`                                                                 | Fond gris foncé                                  | Barre de progression                                       |
| `bg-gradient-to-r from-amber-400/60 to-amber-300/80`                             | Dégradé doré horizontal                          | Barre de progression dynamique                             |
| `text-zinc-400`, `text-zinc-400/90`                                              | Texte gris clair                                 | Labels, infos secondaires                                  |
| `text-zinc-300/90`                                                               | Texte gris très clair                            | Description principale                                     |
| `border-zinc-800/50`, `border-zinc-800/90`                                       | Bordures gris très foncé                         | Séparateurs visuels                                        |
| `text-white/95`                                                                  | Blanc presque pur                                | Titres, infos importantes                                  |
| `text-sm tracking-[0.3em] text-zinc-400/90`                                      | Texte gris, très espacé                          | Catégories                                                  |
| `bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200` + `text-transparent bg-clip-text` | Dégradé doré très clair                         | Titres stylisés (nom produit, tag)                         |
| `bg-amber-500 hover:bg-amber-600`                                                | Fond bouton CTA                                  | Bouton “Ajouter au panier”                                 |
| `text-black`                                                                     | Texte noir                                       | Contraste sur bouton doré                                  |

