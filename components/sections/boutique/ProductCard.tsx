
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import ProductSpecs from "./ProductSpecs";
export default // Composant ProductCard luxueux
function ProductCard({ product }: { product: Product }) {
  const categoryName =
    typeof product.category === "string"
      ? product.category
      : product.category.name;

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

  function imageUrl(path: string) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
    if (path.startsWith("http") || path.startsWith("//")) return path;
    return baseUrl + path;
  }
  
  return (
    <motion.div variants={ANIMATION_VARIANTS.item} className="group">
      <Link href={`/boutique/${product._id}`} className="block">
        <article
          className="relative bg-gradient-to-br from-zinc-900 via-black to-zinc-900 backdrop-blur-sm 
          rounded-3xl overflow-hidden border border-zinc-800/50 transition-all duration-700 
          hover:border-amber-400/30 hover:shadow-2xl hover:shadow-amber-400/5 group-hover:scale-[1.02]"
        >
          {/* Overlay décoratif principal */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[length:40px_40px] opacity-30" />

          {/* Lueur d'ambiance */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-400/0 via-amber-400/2 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative z-10">
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl">
              {product.images && product.images.length > 0 ? (
                <div className="relative w-full h-full group">
                  {/* Image principale */}
                  <Image
                    src={imageUrl(product.images[0])}
                    alt={product.name}
                    fill
                    className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />

                  {/* Overlay noir semi-transparent */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700 z-10" />

                  {/* Lueur dorée hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-400/0 via-amber-400/5 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20" />

                  {/* Motif décoratif */}
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[length:25px_25px] opacity-30 z-30" />

                  {/* Icône Eye hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100 z-40">
                    <div className="bg-black/80 backdrop-blur-sm border border-amber-400/20 rounded-full p-4">
                      <Eye className="w-6 h-6 text-amber-300/90" />
                    </div>
                  </div>
                </div>
              ) : (
                // Fallback sans image
                <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 w-full h-full flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[length:30px_30px] opacity-20" />
                  <span className="text-zinc-400/90 text-sm font-light tracking-wider relative z-10">
                    Aucune image
                  </span>
                </div>
              )}

              {/* Badge catégorie sur l'image */}
              <div className="absolute top-4 left-4">
                <span
                  className="inline-block bg-black/80 backdrop-blur-sm border border-amber-400/20 
                  rounded-full px-4 py-2 text-[10px] tracking-[0.3em] uppercase text-amber-300/90 font-light"
                >
                  {categoryName}
                </span>
              </div>

              {/* Prix en overlay sur l'image */}
              <div className="absolute bottom-4 right-4">
                <div className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 text-transparent bg-clip-text">
                  <span className="text-xl font-light tracking-wider">
                    {product.price.toLocaleString("fr-FR")} €
                  </span>
                </div>
              </div>
            </div>

            {/* Contenu */}
            <div className="p-8 space-y-6 bg-black/40 backdrop-blur-sm">
              <div className="space-y-4">
                <h3 className="text-2xl cinzel-decorative-black bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 bg-clip-text text-transparent group-hover:from-amber-200 group-hover:via-amber-100 group-hover:to-amber-200 transition-all duration-500">
                  {product.name}
                </h3>

                {product.description && (
                  <p
                    className="text-sm text-zinc-300/90 font-light leading-relaxed line-clamp-1 
                    group-hover:text-zinc-200/95 transition-colors duration-500"
                  >
                    {product.description}
                  </p>
                )}
              </div>

              {product.specifications && (
                <ProductSpecs specifications={product.specifications} />
              )}

              {/* Indicateur d'interaction */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
                <span className="text-sm tracking-[0.3em] text-zinc-400/90 uppercase font-light">
                  Voir détails
                </span>
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                  <div className="w-1 h-1 bg-amber-400/60 rounded-full animate-pulse"></div>
                  <div
                    className="w-1 h-1 bg-amber-400/40 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-1 h-1 bg-amber-400/20 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bordure de lueur en hover */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-sm" />
        </article>
      </Link>
    </motion.div>
  );
}