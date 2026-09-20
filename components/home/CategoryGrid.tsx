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
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNvlVJJ-B0qwFkIBTdUrbl-o-tFEtEnQ2vWqmPl5honPWyB1Cchd7JZw8&s=10",
  },
];

export default function CategoryGrid() {
  return (
    <section className="w-full bg-[#FAF7F2] px-4 py-14 sm:px-6 sm:py-20 md:px-8 md:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center sm:mb-12"
        >
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B58A32] sm:text-xs sm:tracking-[0.3em]">
            Explore our collection
          </p>

          <h2 className="font-[var(--font-heading)] text-3xl leading-tight text-[#4A2C1A] sm:text-4xl md:text-5xl">
            Find Something You&apos;ll Love
          </h2>

          <p className="mx-auto mt-4 max-w-2xl px-2 text-sm leading-6 text-[#756457] sm:text-base sm:leading-7">
            From elegant home décor to thoughtful gifts,
            discover pieces selected to make everyday moments
            feel a little more special.
          </p>
        </motion.div>

        {/* Category cards */}
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
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
              className="min-w-0"
            >
              <Link
                href={category.href}
                className="group relative block w-full overflow-hidden rounded-2xl sm:rounded-3xl"
              >
                {/* Image */}
                <div className="relative h-[320px] w-full overflow-hidden sm:h-[360px] md:h-[400px] lg:h-[390px]">
                  <img
                    src={category.image}
                    alt={category.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Dark gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 w-full p-5 text-white sm:p-6">
                    <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#E6C66A] sm:text-xs">
                      Discover
                    </p>

                    <h3 className="font-[var(--font-heading)] text-2xl leading-tight sm:text-3xl">
                      {category.title}
                    </h3>

                    <p className="mt-2 max-w-[260px] text-xs leading-5 text-white/80 sm:text-sm sm:leading-6">
                      {category.description}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-xs font-medium sm:mt-4 sm:text-sm">
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