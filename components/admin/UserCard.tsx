import React, { useState } from "react";
import { UserData } from "./types";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Crown, Mail, Shield, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UserCardProps {
  user: UserData;
  onEdit: (user: UserData) => void;
  onDelete: (userId: string) => void;
}

export default function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return <Crown className="w-4 h-4" />;
      case "user":
        return <Shield className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "text-amber-400 bg-amber-400/10 border-amber-400/30";
      case "user":
        return "text-zinc-300 bg-zinc-800/30 border-zinc-600/30";
      default:
        return "text-zinc-300 bg-zinc-800/30 border-zinc-600/30";
    }
  };

  return (
    <motion.div
      className="relative w-full max-w-sm"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, rotateX: -15, z: -100 }}
      animate={{ opacity: 1, rotateX: 0, z: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.8,
      }}
    >
      {/* Glow effect background */}
      <motion.div
        className="absolute -inset-1 rounded-3xl opacity-0 blur-xl"
        animate={{
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background:
            "linear-gradient(45deg, rgb(251 191 36 / 0.3), rgb(245 158 11 / 0.2), rgb(251 191 36 / 0.3))",
        }}
      />

      <motion.article
        role="region"
        aria-label={`Profil utilisateur ${user.name}`}
        tabIndex={0}
        className="
          relative
          bg-gradient-to-b from-black via-zinc-950 to-black
          border border-zinc-800/50
          rounded-3xl
          overflow-hidden
          cursor-pointer
          outline-none
          focus-visible:ring-2 focus-visible:ring-amber-400/60
          transform-gpu
        "
        whileHover={{ scale: 1.02, y: -8 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.03),transparent_70%)]"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Header section */}
        <div className="relative z-10 p-4 pb-4">
          <div className="flex items-start justify-between mb-4">
            {/* User avatar avec initiales */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400/20 via-amber-500/30 to-amber-600/20 border border-amber-400/30 flex items-center justify-center relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-transparent"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <span className="text-xl font-bold text-amber-200 relative z-10">
                  {user.firstName.charAt(0).toUpperCase()}
                </span>
              </div>

              {/* Status indicator */}
              <motion.div
                className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-black flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-green-300 rounded-full" />
              </motion.div>
            </motion.div>

            {/* Role badge */}
            <motion.div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${getRoleColor(
                user.role
              )}`}
              whileHover={{ scale: 1.05 }}
            >
              {getRoleIcon(user.role)}
              <span className="uppercase tracking-wider">{user.role}</span>
            </motion.div>
          </div>

          {/* User info */}
          <div className="space-y-2">
            <motion.h2
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-200"
              layoutId={`name-${user._id}`}
            >
              {user.name}
            </motion.h2>

            <div className="flex items-center gap-2 text-zinc-300/90">
              <Mail className="w-4 h-4 text-amber-400/70" />
              <span className="text-sm truncate">{user.email}</span>
            </div>

            <motion.div
              className="text-xs text-amber-300/70 font-mono tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              #{user._id}
            </motion.div>
          </div>
        </div>

        {/* Divider avec animation */}
        <motion.div
          className="mx-6 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />

        {/* Actions section */}
        <AnimatePresence>
          <motion.div
            className="relative z-10 px-2 pt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                className="
                  flex-1
                  bg-gradient-to-r from-amber-400/10 to-amber-500/5
                  border-amber-400/30
                  text-amber-300
                  hover:from-amber-400/20 hover:to-amber-500/10
                  hover:border-amber-400/50
                  hover:text-amber-200
                  hover:shadow-lg hover:shadow-amber-400/20
                  transition-all duration-300
                  backdrop-blur-sm
                  group
                "
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(user);
                }}
              >
                <Edit className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
                <span className="font-medium">Modifier</span>
              </Button>

              <Button
                variant="destructive"
                size="sm"
                className="
                  flex-1
                  bg-gradient-to-r from-red-900/40 to-red-800/20
                  border-red-700/40
                  text-red-300
                  hover:from-red-800/60 hover:to-red-700/40
                  hover:border-red-600/60
                  hover:text-red-200
                  hover:shadow-lg hover:shadow-red-500/20
                  transition-all duration-300
                  backdrop-blur-sm
                  group
                "
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(user._id);
                }}
              >
                <Trash2 className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Supprimer</span>
              </Button>
            </div>

            {/* Expand indicator */}
            <motion.div
              className="flex items-center justify-center mt-4 pt-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronRight
                className={`w-4 h-4 text-amber-400/60 transition-transform duration-300 ${
                  isExpanded ? "rotate-90" : ""
                }`}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-amber-400/5 to-transparent"
          animate={{
            translateX: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 5,
            ease: "easeInOut",
          }}
        />

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-400/10 to-transparent rounded-bl-3xl" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-amber-400/5 to-transparent rounded-tr-3xl" />
      </motion.article>
    </motion.div>
  );
}
