"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Crown, Shield, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

const ROLES = ["USER", "ADMIN", "MANAGER"] as const;

interface UsersFilterProps {
  filterRole?: string;
  setFilterRole: (role?: string) => void;
  searchEmail: string;
  setSearchEmail: (email: string) => void;
  onSearch: () => void;
}

const getRoleIcon = (role: string) => {
  switch (role) {
    case "ADMIN":
      return <Crown className="h-5 w-5 stroke-amber-400" />;
    case "MANAGER":
      return <Shield className="h-5 w-5 stroke-amber-400" />;
    default:
      return <UserCheck className="h-5 w-5 stroke-amber-400" />;
  }
};

export default function UsersFilter({
  filterRole,
  setFilterRole,
  searchEmail,
  setSearchEmail,
  onSearch,
}: UsersFilterProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-16 max-w-5xl mx-auto px-6"
    >
      <div
        className="
          relative rounded-3xl
          bg-gradient-to-br from-zinc-900 via-black to-zinc-900
          border border-amber-400/20
          backdrop-blur-xl
          p-8
          overflow-hidden
        "
      >
        {/* Overlay pointillé blanc subtil */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[length:20px_20px] rounded-3xl mix-blend-overlay"></div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch();
          }}
          className="flex flex-col md:flex-row gap-8 items-center justify-between relative z-10"
          aria-label="Filtrer et rechercher les utilisateurs"
        >
          {/* Recherche email */}
          <label
            htmlFor="searchEmail"
            className="flex items-center gap-3 flex-1 max-w-md group relative"
          >
            <Search
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 stroke-amber-400 opacity-60 group-focus-within:opacity-100 transition-opacity duration-300"
            />
            <Input
              id="searchEmail"
              type="email"
              placeholder="Recherche par email..."
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="
                pl-14 bg-black/50 border border-amber-400/20 text-white/95 placeholder:text-zinc-400/80
                rounded-2xl h-14
                focus:border-amber-400/40 focus:ring-2 focus:ring-amber-400/20
                transition-all duration-300
                backdrop-blur-sm
                shadow-[inset_0_0_10px_#b4861b33]
              "
              aria-label="Recherche par email"
              autoComplete="off"
              spellCheck={false}
            />
          </label>

          {/* Filtre rôle */}
          <label
            htmlFor="roleFilter"
            className="flex items-center gap-3 flex-shrink-0 relative group max-w-xs w-full md:w-64"
          >
            <Filter
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 stroke-amber-400 opacity-60 group-focus-within:opacity-100 transition-opacity duration-300 z-10"
            />
            <Select
              id="roleFilter"
              onValueChange={(val) =>
                setFilterRole(val === "all" ? undefined : val)
              }
              value={filterRole || "all"}
            >
              <SelectTrigger
                aria-label="Filtrer par rôle"
                className="
                  pl-14 bg-black/50 border border-amber-400/20 rounded-2xl h-14
                  text-white/95
                  focus:border-amber-400/40 focus:ring-2 focus:ring-amber-400/20
                  transition-all duration-300
                  backdrop-blur-sm
                  shadow-[inset_0_0_10px_#b4861b33]
                "
              >
                <SelectValue placeholder="Filtrer par rôle" />
              </SelectTrigger>
              <SelectContent
                className="
                  bg-gradient-to-br from-zinc-900 via-black to-zinc-900
                  border border-amber-400/20
                  backdrop-blur-xl
                  rounded-lg
                  p-2
                "
              >
                <SelectItem
                  value="all"
                  className="text-zinc-300/90 hover:bg-amber-400/10 focus:bg-amber-400/10 rounded-md"
                >
                  Tous les rôles
                </SelectItem>
                {ROLES.map((role) => (
                  <SelectItem
                    key={role}
                    value={role}
                    className="text-zinc-300/90 hover:bg-amber-400/10 focus:bg-amber-400/10 rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      {getRoleIcon(role)}
                      <span className="font-medium tracking-wide">{role}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>

          {/* Bouton recherche */}
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px #fbbf24aa" }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Button
              type="submit"
              className="
                bg-amber-400 hover:bg-amber-500 text-black
                font-semibold tracking-wide
                rounded-2xl h-14
                px-8
                shadow-md
                transition-colors duration-300
                focus-visible:outline focus-visible:outline-amber-400/60
                focus-visible:outline-4
              "
            >
              <Search className="h-6 w-6 mr-3" />
              Rechercher
            </Button>
          </motion.div>
        </form>
      </div>
    </motion.section>
  );
}
