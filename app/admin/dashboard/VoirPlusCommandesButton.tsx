import Link from "next/link";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

const MotionLink = motion(Link);

export default function VoirPlusCommandesButton() {
  return (
    <MotionLink
      href="/admin/orders"
      className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 px-4 text-black font-semibold transition-all duration-300 hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-500/25"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Eye className="h-4 w-4" />
      Voir toutes les commandes
    </MotionLink>
  );
}
