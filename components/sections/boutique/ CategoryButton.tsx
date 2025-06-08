import { motion } from "framer-motion";
// Animation variants
const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  },
  categoryButton: {
    hidden: { opacity: 0, y: -20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  },
} as const;
interface CategoryButtonProps {
  category: string;
  isSelected: boolean;
  onClick: (category: string) => void;
}

export default function CategoryButton({
  category,
  isSelected,
  onClick,
}: CategoryButtonProps) {
  return (
    <motion.button
      variants={ANIMATION_VARIANTS.categoryButton}
      onClick={() => onClick(category)}
      className={`group relative px-8 py-4 text-sm tracking-[0.3em] uppercase rounded-2xl 
        transition-all duration-700 overflow-hidden cursor-pointer backdrop-blur-sm
        border transition-colors ${
          isSelected
            ? "text-amber-300/90 border-amber-400/30 bg-gradient-to-br from-zinc-900 via-black to-zinc-900"
            : "text-zinc-400/90 border-zinc-800/50 bg-black/60 hover:text-amber-200/80 hover:border-amber-400/20"
        }`}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
      whileTap={{ scale: 0.95 }}
      aria-pressed={isSelected}
      aria-label={`Filtrer par ${category}`}
    >
      {/* Overlay décoratif */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[length:20px_20px] opacity-40" />

      {isSelected && (
        <>
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-amber-400/5 to-transparent"
            layoutId="activeCategoryGlow"
            transition={{
              type: "spring",
              bounce: 0.15,
              duration: 0.8,
            }}
          />
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-amber-400/10 via-amber-400/5 to-amber-400/10 rounded-2xl blur-sm"
            layoutId="activeCategoryBorder"
            transition={{
              type: "spring",
              bounce: 0.15,
              duration: 0.8,
            }}
          />
        </>
      )}

      <span className="relative z-10 font-light">{category}</span>

      {/* Effet hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-400/0 to-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.button>
  );
}

// Composant ProductSpecs amélioré
