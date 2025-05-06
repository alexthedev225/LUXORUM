# Configuration Base de Données

## Configuration Neon + Prisma

### Base URL Neon (fournie par défaut)

```env
DATABASE_URL="postgresql://user:password@host-pooler.region.aws.neon.tech/dbname?sslmode=require"
```

### Configuration optimisée requise

```env
# Ajouter ces paramètres importants :
# 1. :5432 - Port explicite
# 2. connect_timeout=30 - Évite les timeouts rapides
# 3. DIRECT_URL - Pour les migrations Prisma

DATABASE_URL="postgresql://user:password@host-pooler.region.aws.neon.tech:5432/dbname?sslmode=require&connect_timeout=30"
DIRECT_URL="postgresql://user:password@host.region.aws.neon.tech:5432/dbname?sslmode=require&connect_timeout=30"
```

### Schema Prisma requis

```prisma
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

## Pourquoi cette configuration ?

1. **Connexions poolées (DATABASE_URL)**

   - Optimisé pour les lectures multiples
   - Meilleure performance pour les requêtes simultanées

2. **Connexions directes (DIRECT_URL)**

   - Nécessaire pour les migrations Prisma
   - Meilleure fiabilité pour les écritures

3. **Paramètres supplémentaires**
   - `connect_timeout=30` : Évite les échecs de connexion
   - Port `:5432` explicite : Garantit la connexion correcte
   - `previewFeatures=["driverAdapters"]` : Support Neon optimisé
