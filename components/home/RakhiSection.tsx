"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getProducts } from "@/services/productService";
import { Product } from "@/types/product";

export default function RakhiSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRakhiProducts() {
      try {
        const allProducts = await getProducts();

        const rakhiProducts = allProducts
          .filter((product) => product.rakhi)
          .slice(0, 4);

        setProducts(rakhiProducts);
      } catch (error) {
        console.error("Failed to load Rakhi products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadRakhiProducts();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#F5EAD9] px-5 py-20 sm:px-6 md:py-28">

      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-[#D4AF37]/10" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-[#6F4E37]/10" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-9 bg-[#D4AF37]" />

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B58A32]">
                Celebrate the bond
              </p>
            </div>

            <h2 className="font-[var(--font-heading)] text-4xl leading-tight text-[#4A2C1A] sm:text-5xl">
              Rakhi Collection
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-[#756457] sm:text-base">
              Celebrate the beautiful bond between brothers and sisters
              with something chosen with love.
            </p>
          </div>

          <Link
            href="/rakhi"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-[#6F4E37] px-6 py-3 text-sm font-medium text-[#6F4E37] transition-all duration-300 hover:bg-[#6F4E37] hover:text-white"
          >
            View All Rakhi
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-[1.75rem] bg-white shadow-sm"
              >
                <div className="h-[340px] animate-pulse bg-[#E8DCCB]" />

                <div className="space-y-3 p-5">
                  <div className="h-3 w-20 animate-pulse rounded bg-[#E8DCCB]" />
                  <div className="h-5 w-3/4 animate-pulse rounded bg-[#E8DCCB]" />
                  <div className="h-5 w-20 animate-pulse rounded bg-[#E8DCCB]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Rakhi products */}
        {!loading && products.length === 0 && (
          <div className="rounded-[2rem] border border-[#E5D8C7] bg-white/70 px-6 py-16 text-center shadow-sm">
            <p className="font-[var(--font-heading)] text-2xl text-[#4A2C1A]">
              Rakhi collection coming soon
            </p>

            <p className="mt-2 text-[#756457]">
              We're preparing something special for this Rakhi season.
            </p>

            <Link
              href="/rakhi"
              className="mt-6 inline-block rounded-full bg-[#6F4E37] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#4A2C1A]"
            >
              Explore Rakhi
            </Link>
          </div>
        )}

        {/* Products */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
              >
                <Link
                  href={`/product/${product.id}`}
                  className="group block"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-[1.75rem] bg-white shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-[#6F4E37]/10">

                    <div className="relative h-[340px] overflow-hidden">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />

                      {/* Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60" />

                      {/* Rakhi badge */}
                      <span className="absolute left-4 top-4 rounded-full border border-white/40 bg-[#D4AF37]/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur-md">
                        Rakhi
                      </span>

                      {/* Low stock */}
                      {product.stock > 0 && product.stock <= 5 && (
                        <span className="absolute right-4 top-4 rounded-full bg-[#6F4E37]/90 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-md">
                          Only {product.stock} left
                        </span>
                      )}

                      {/* Out of stock */}
                      {product.stock <= 0 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/45">
                          <span className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-red-600 shadow-lg">
                            Out of Stock
                          </span>
                        </div>
                      )}

                      {/* View button */}
                      {product.stock > 0 && (
                        <div className="absolute bottom-4 left-4 right-4 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          <div className="rounded-full bg-white/95 py-3 text-center text-sm font-semibold text-[#6F4E37] shadow-lg backdrop-blur-md">
                            View Product →
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="px-1 pt-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B58A32]">
                      {product.category}
                    </p>

                    <h3 className="mt-2 line-clamp-1 font-[var(--font-heading)] text-xl text-[#4A2C1A] transition-colors duration-300 group-hover:text-[#B58A32]">
                      {product.name}
                    </h3>

                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-lg font-semibold text-[#6F4E37]">
                        ₹{product.price}
                      </p>

                      {product.stock > 0 && (
                        <span className="text-xs text-[#8A786A]">
                          In stock
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}