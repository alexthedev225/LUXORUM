import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category?: {
    name: string;
  };
  discount?: number;
}

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
  variants: any;
  imageUrl: (path: string) => string;
}

export function ProductCard({
  product,
  viewMode,
  variants,
  imageUrl,
}: ProductCardProps) {
  return (
    <Link href={`/admin/products/${product._id}`}>
      <motion.div variants={variants} className="group cursor-pointer">
        <div className="relative bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-xl border border-amber-400/20 overflow-hidden transition-all duration-500 hover:border-amber-400/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:scale-[1.02]">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"></div>

          {viewMode === "grid" ? (
            <>
              <div className="relative h-48 overflow-hidden">
                {product.images.length > 0 ? (
                  <Image
                    src={imageUrl(product.images[0])}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                    <Package className="w-12 h-12 text-zinc-600" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {product.discount && (
                  <div className="absolute top-3 right-3 bg-amber-500 text-black px-2 py-1 rounded-lg text-xs font-bold">
                    -{product.discount.toFixed(0)}%
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white/95 mb-2 group-hover:text-amber-100 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-zinc-400/90 text-sm line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-amber-400">
                      {product.price.toFixed(2)} €
                    </span>
                    <div className="text-right">
                      <p className="text-xs text-zinc-400/90">Stock</p>
                      <p className="text-sm font-semibold text-white/90">
                        {product.stock} unités
                      </p>
                    </div>
                  </div>

                  {product.category?.name && (
                    <div className="pt-3 border-t border-zinc-800/50">
                      <span className="text-xs tracking-[0.3em] text-zinc-400/90 uppercase">
                        {product.category.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center p-6 gap-6">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                {product.images.length > 0 ? (
                  <Image
                    src={imageUrl(product.images[0])}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                    <Package className="w-6 h-6 text-zinc-600" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-white/95 mb-1 truncate">
                  {product.name}
                </h3>
                <p className="text-zinc-400/90 text-sm mb-2 line-clamp-1">
                  {product.description}
                </p>
                {product.category?.name && (
                  <span className="text-xs tracking-wide text-zinc-500 uppercase">
                    {product.category.name}
                  </span>
                )}
              </div>

              <div className="text-right space-y-1">
                <p className="text-xl font-bold text-amber-400">
                  {product.price.toFixed(2)} €
                </p>
                <p className="text-xs text-zinc-400/90">
                  Stock: {product.stock}
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
