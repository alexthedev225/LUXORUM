import { motion } from "framer-motion";
import { Star, Zap, ShoppingBag } from "lucide-react";
export default function ProductSpecs({
  specifications,
}: {
  specifications: ProductSpecifications;
}) {
  const specs = [
    { label: "Matériaux", value: specifications.materials, icon: Star },
    { label: "Finition", value: specifications.finish, icon: Zap },
    {
      label: "Certificat",
      value: specifications.certificate,
      icon: ShoppingBag,
    },
  ].filter((spec) => spec.value);

  if (specs.length === 0 && !specifications.additionalDetails?.length) {
    return null;
  }

  return (
    <motion.div
      className="pt-6 border-t border-amber-400/10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <h4 className="text-sm tracking-[0.3em] text-zinc-400/90 uppercase mb-4 font-light">
        Spécifications
      </h4>
      <div className="space-y-3">
        {specs.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-center group/spec">
            <div className="flex items-center min-w-0 flex-1">
              <Icon className="w-3 h-3 text-amber-300/60 mr-3 flex-shrink-0" />
              <span className="text-sm text-zinc-400/90 w-20 flex-shrink-0 font-light">
                {label}
              </span>
              <span className="text-sm text-zinc-300/90 line-clamp-1 group-hover/spec:text-white/95 transition-colors duration-300">
                {value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}