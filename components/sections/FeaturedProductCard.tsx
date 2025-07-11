import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Crown, Star, ArrowUpRight, Diamond, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: string; // Tu peux changer en number si tu préfères
  images: string[];
  category: {
    _id: string;
    name: string;
  };

  specifications: {
    materials: string;
    finish: string;
    certificate: string;
    collection: string;
    additionalDetails?: string[];
    stats: {
      craftsmanship: string;
      rarity: string;
      prestige: string;
      durability: string;
    };
    detailedDescription: string;
  };
  tag?: string;
  discount?: string;
};

type ProductCardProps = {
  product: Product;
  index: number;
};


export function FeaturedProductCard({ product, index }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const craftsmanship = parseInt(
    product.specifications.stats.craftsmanship,
    10
  );
  const rarity = parseInt(product.specifications.stats.rarity, 10);
  const prestige = parseInt(product.specifications.stats.prestige, 10);
  const durability = parseInt(product.specifications.stats.durability, 10);

  return (
    <motion.div
      className="group h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={`/boutique/${product._id}`} className="block">
        <article
          className="flex flex-col h-full relative bg-gradient-to-br from-zinc-900/40 via-black/60 to-zinc-900/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-amber-400/20 hover:border-amber-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-400/10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={product.images?.[0] ?? "/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            {product.tag && (
              <div className="absolute top-4 left-4">
                <div className="bg-black/70 backdrop-blur-base rounded-xl border border-amber-400/30 px-3 py-2 flex items-center gap-2">
                  <Crown className="w-3 h-3 text-amber-300" />
                  <span className="text-sm tracking-wider uppercase font-medium text-amber-200">
                    {product.tag}
                  </span>
                </div>
              </div>
            )}
            <div className="absolute top-4 right-4">
              <div className="bg-black/70 backdrop-blur-base rounded-xl border border-zinc-700/50 px-3 py-2">
                <p className="text-base font-semibold text-amber-300">
                  {product.price.toLocaleString("fr-FR")} €
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["craftsmanship", craftsmanship],
                  ["rarity", rarity],
                  ["prestige", prestige],
                  ["durability", durability],
                ].map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-zinc-300 flex items-center gap-1 capitalize">
                        <Star className="w-2 h-2 text-amber-400" />
                        {key}
                      </span>
                      <span className="text-sm text-amber-300 font-semibold">
                        {value}%
                      </span>
                    </div>
                    <div className="h-1 bg-zinc-900/60 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hover icon */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
            >
              <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                <Diamond className="w-5 h-5 text-black" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4 flex-1">
            <div className="text-center">
              <span className="text-sm tracking-widest uppercase text-zinc-400">
                {product.category.name}
              </span>
            </div>

            <h3 className="font-cinzel-decorative text-2xl text-center">
              <span className="cinzel-decorative-black bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 bg-clip-text text-transparent group-hover:from-amber-200 group-hover:via-amber-100 group-hover:to-amber-200 transition-all duration-500">
                {product.name}
              </span>
            </h3>
            <p className="text-base text-zinc-300 text-center leading-relaxed line-clamp-1 max-w-md mx-auto">
              {product.description}
            </p>

            {/* Collection */}
            <div className="text-center text-xs uppercase tracking-wide text-amber-400 font-semibold mb-1">
              Collection
            </div>
            <span className="px-3 py-1 text-sm font-semibold bg-amber-500 text-black rounded-full shadow-md border border-amber-600">
              {product.specifications.collection}
            </span>

            {/* Additional Details */}
            <div className="text-center text-xs uppercase tracking-wide text-zinc-500 font-medium mt-4 mb-1">
              Détails
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {product.specifications.additionalDetails?.map((detail, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm bg-zinc-900/50 border border-zinc-700/50 rounded-md text-zinc-400"
                >
                  {detail}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-zinc-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-base text-zinc-300 group-hover:text-amber-300 transition-colors duration-300">
                  <Sparkles className="w-4 h-4" />
                  <span>Explorer</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </div>
                <span className="text-sm text-zinc-500 font-mono">
                  #{product._id ? product._id.slice(-3).toUpperCase() : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
