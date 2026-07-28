"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Home Decor",
    description: "Beautiful pieces for beautiful spaces",
    href: "/shop?category=Home%20Decor",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Gifts",
    description: "Thoughtful gifts for every occasion",
    href: "/shop?category=Gifts",
    image:
      "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Lifestyle",
    description: "Little things that make life better",
    href: "/shop?category=Lifestyle",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Rakhi",
    description: "Celebrate the bond of love",
    href: "/rakhi",
    image:
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=900&q=80",
  },
];

export default function CategoryGrid() {
  return (
    <section className="bg-[#FAF7F2] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#B58A32]">
            Explore our collection
          </p>

          <h2 className="font-[var(--font-heading)] text-4xl text-[#4A2C1A] md:text-5xl">
            Find Something You’ll Love
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[#756457]">
            From elegant home décor to thoughtful gifts,
            discover pieces selected to make everyday moments
            feel a little more special.
          </p>
        </motion.div>

        {/* Category cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
            >
              <Link
                href={category.href}
                className="group relative block overflow-hidden rounded-3xl"
              >
                {/* Image */}
                <div className="relative h-[390px] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Dark gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#E6C66A]">
                      Discover
                    </p>

                    <h3 className="font-[var(--font-heading)] text-3xl">
                      {category.title}
                    </h3>

                    <p className="mt-2 text-sm text-white/80">
                      {category.description}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-sm font-medium">
                      Explore
                      <span className="transition-transform duration-300 group-hover:translate-x-2">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}