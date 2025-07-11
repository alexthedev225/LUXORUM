"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  Star,
  ArrowRight,
  Sparkles,
  Crown,
  Award,
  Gem,
  Diamond,
} from "lucide-react";

interface ProductCategory {
  _id: string;
  name: string;
}

interface ProductSpecifications {
  materials?: string;
  finish?: string;
  certificate?: string;
  additionalDetails?: string[];
}

interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  images: string[];
  category: ProductCategory | string;
  specifications?: ProductSpecifications;
}
interface ProductCardProps {
  product: Product;
  variant?: ProductCardVariant;
}
type ProductCardVariant = "boutique" | "categorie";

export default function ProductCard({
  product,
  variant = "boutique",
}: ProductCardProps) {
  const categoryName =
    typeof product.category === "string"
      ? product.category
      : product.category.name;

  function imageUrl(path: string) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
    if (path.startsWith("http") || path.startsWith("//")) return path;
    return baseUrl + path;
  }

  if (variant === "categorie") {
    return (
      <div className="group">
        <Link href={`/boutique/${product._id}`} className="block">
          <article className="relative bg-black backdrop-blur-xl rounded-3xl overflow-hidden border border-zinc-100/20 transition-all flex flex-col md:flex-row">
            {/* IMAGE - partie dédiée */}
            <div className="relative w-full md:w-[300px] aspect-[4/3] flex-shrink-0 overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
              <div className="absolute top-4 right-4 z-30">
                <div className="bg-black/95 backdrop-blur-xl border border-zinc-700 rounded-2xl px-4 py-2">
                  <div className="text-zinc-300 font-semibold tracking-wide">
                    <span className="text-xl cinzel-decorative-black group-hover:opacity-100 group-hover:text-amber-400">
                      {product.price.toLocaleString("fr-FR")} €
                    </span>
                  </div>
                </div>
              </div>

              {product.images && product.images.length > 0 ? (
                <div className="relative w-full h-full flex items-center justify-center group">
                  <Image
                    src={imageUrl(product.images[0])}
                    alt={product.name}
                    fill
                    className="object-contain object-center transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />

                  {product.images.length > 1 && (
                    <div className="absolute bottom-4 left-4 z-30">
                      <div className="bg-black/90 backdrop-blur-lg border border-zinc-700 rounded-xl px-3 py-1.5 text-sm text-zinc-400">
                        <Gem className="w-3 h-3 inline mr-1" />+
                        {product.images.length - 1} vues
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-50 group-hover:scale-100">
                    <div className="bg-black/95 backdrop-blur-xl border border-zinc-700 rounded-2xl p-4 shadow-2xl">
                      <Eye className="w-6 h-6 text-zinc-400" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <Sparkles className="w-10 h-10 text-white/70 mx-auto opacity-50" />
                    <span className="text-white/90 text-base font-light tracking-wide">
                      Collection à venir
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* CONTENU - partie texte et infos */}
            <div className="p-6 space-y-4 relative z-10 flex flex-col flex-1">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm tracking-[0.3em] text-zinc-400 uppercase font-light">
                    {categoryName}
                  </span>
                  <ArrowRight className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                </div>

                <h3 className="cinzel-decorative-black text-2xl font-bold bg-gradient-to-r from-amber-300 via-white to-amber-300 bg-clip-text text-transparent  transition-all duration-500 leading-tight line-clamp-2">
                  {product.name}
                </h3>
              </div>

              {product.description && (
                <p className="text-lg text-zinc-300 font-light leading-relaxed line-clamp-3 group-hover:text-zinc-100 transition-colors duration-500">
                  {product.description}
                </p>
              )}

              {product.specifications && (
                <section
                  aria-label="Spécifications du produit"
                  className="mt-6 border-t border-zinc-700 pt-5 font-sans text-zinc-400"
                >
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 text-base">
                    {product.specifications.materials && (
                      <>
                        <dt className="uppercase tracking-wide font-semibold">
                          Matériaux
                        </dt>
                        <dd className="truncate font-light">
                          {product.specifications.materials}
                        </dd>
                      </>
                    )}

                    {product.specifications.finish && (
                      <>
                        <dt className="uppercase tracking-wide font-semibold">
                          Finition
                        </dt>
                        <dd className="truncate font-light">
                          {product.specifications.finish}
                        </dd>
                      </>
                    )}
                  </dl>

                  {product.specifications.certificate && (
                    <div className="mt-6 flex items-center gap-3 text-base font-medium tracking-wide text-zinc-400">
                      <Award className="w-7 h-7 inline" />
                      <span>{product.specifications.certificate}</span>
                    </div>
                  )}

                  {product.specifications?.additionalDetails &&
                    product.specifications.additionalDetails.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-3">
                        {product.specifications.additionalDetails
                          .slice(0, 3)
                          .map((detail, index) => (
                            <div
                              key={index}
                              className="px-3 py-1 rounded-md border border-zinc-600 text-zinc-400 text-sm font-medium select-none cursor-default truncate max-w-xs"
                              title={detail}
                            >
                              {detail}
                            </div>
                          ))}

                        {product.specifications.additionalDetails.length >
                          3 && (
                          <div
                            className="px-3 py-1 rounded-md border border-zinc-600 text-zinc-500 text-sm font-medium select-none cursor-default"
                            title={`${
                              product.specifications.additionalDetails.length -
                              3
                            } détails supplémentaires`}
                          >
                            +
                            {product.specifications.additionalDetails.length -
                              3}
                          </div>
                        )}
                      </div>
                    )}
                </section>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-zinc-800/50 mt-auto">
                <div className="flex items-center space-x-0.5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-400 fill-current"
                    />
                  ))}
                </div>

                <div className="text-sm tracking-[0.3em] text-zinc-400 uppercase font-light opacity-60 group-hover:opacity-100 group-hover:text-amber-400 transition-all duration-500">
                  Explorer
                </div>
              </div>
            </div>
          </article>
        </Link>
      </div>
    );
  }

  // ===== VARIANTE BOUTIQUE ULTRA-LUXE =====
  return (
    <div className="group perspective-1000">
      <Link href={`/boutique/${product._id}`} className="block">
        <article className="relative bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-2xl overflow-hidden border border-zinc-800/50 transition-all hover:border-amber-200/50">
          {/* Image principale */}
          {product.images && product.images.length > 0 ? (
            <div className="relative w-full aspect-[4/3] max-h-[450px] bg-black rounded-t-2xl overflow-hidden">
              <Image
                src={imageUrl(product.images[0])}
                alt={product.name}
                fill
                className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          ) : (
            <div className="relative w-full aspect-[4/3] max-h-[450px] bg-zinc-800 rounded-t-2xl flex items-center justify-center">
              <span className="text-zinc-200 text-lg font-light tracking-wide">
                Collection à venir
              </span>
            </div>
          )}

          {/* Contenu */}
          <div className="p-6 bg-black/60 text-zinc-200 rounded-b-2xl">
            <h3 className="text-2xl font-bold text-amber-200">
              {product.name}
            </h3>
            <p className="mt-2 text-base line-clamp-2">{product.description}</p>
            <div className="mt-4 text-amber-300 font-light text-xl">
              {product.price.toLocaleString("fr-FR")} €
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}
