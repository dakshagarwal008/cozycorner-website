"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/common/ProductCard";
import { getProducts } from "@/services/productService";
import BackButton from "@/components/common/BackButton";

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

const categories = [
  "All",
  "Bedsheet",
  "Rakhi",
  "Towel",
  "Kits",
  "Pants & Leggings",
  "T-Shirts",
  "Toran (Bandarwall)",
];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const productName = product.name?.toLowerCase() || "";
      const productDescription =
        product.description?.toLowerCase() || "";
      const searchTerm = search.toLowerCase();

      const matchesSearch =
        productName.includes(searchTerm) ||
        productDescription.includes(searchTerm);

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF7F2] px-6 pb-20 pt-32">
       
        <div className="mx-auto max-w-7xl">

          

          <div className="mx-auto mb-12 max-w-xl text-center">
            <div className="mx-auto h-3 w-32 animate-pulse rounded-full bg-[#E8DCCB]" />

            <div className="mx-auto mt-5 h-12 w-64 animate-pulse rounded-xl bg-[#E8DCCB]" />

            <div className="mx-auto mt-4 h-4 w-80 animate-pulse rounded-full bg-[#E8DCCB]" />
          </div>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-[1.75rem] bg-white shadow-sm"
              >
                <div className="h-[330px] animate-pulse bg-[#E8DCCB]" />

                <div className="space-y-3 p-5">
                  <div className="h-3 w-20 animate-pulse rounded bg-[#E8DCCB]" />
                  <div className="h-5 w-3/4 animate-pulse rounded bg-[#E8DCCB]" />
                  <div className="h-5 w-20 animate-pulse rounded bg-[#E8DCCB]" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-5 pb-24 pt-12 sm:px-6 md:pt-16">

      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
  <BackButton />
</div>

        {/* PAGE HEADER */}
        <div className="mb-12 text-center">

          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#D4AF37]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#B58A32] sm:text-xs">
              Discover something beautiful
            </p>

            <span className="h-px w-10 bg-[#D4AF37]" />
          </div>

          <h1 className="font-[var(--font-heading)] text-5xl text-[#4A2C1A] sm:text-6xl">
            Shop Our Collection
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#756457] sm:text-base">
            Thoughtfully selected pieces for your home,
            your lifestyle, and the people you love.
          </p>

        </div>

        {/* SEARCH + FILTER AREA */}
        <div className="mb-12 rounded-[2rem] border border-[#E7DCCF] bg-white/70 p-5 shadow-sm backdrop-blur-sm sm:p-6">

          {/* Search */}
          <div className="relative">

            <svg
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8A786A]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
              />
            </svg>

            <input
              type="text"
              placeholder="Search for products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-[#E0D4C6] bg-[#FAF7F2] py-3.5 pl-12 pr-12 text-sm text-[#4A2C1A] outline-none transition placeholder:text-[#9B8B7D] focus:border-[#B58A32] focus:ring-2 focus:ring-[#D4AF37]/10"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-[#8A786A] transition hover:text-[#4A2C1A]"
                aria-label="Clear search"
              >
                ×
              </button>
            )}

          </div>

          {/* Categories */}
          <div className="mt-5 flex gap-2.5 overflow-x-auto pb-1">
            {categories.map((category) => {
              const active = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                    active
                      ? "bg-[#6F4E37] text-white shadow-md shadow-[#6F4E37]/20"
                      : "border border-[#E2D6C8] bg-white text-[#66564A] hover:border-[#B58A32] hover:text-[#6F4E37]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

        </div>

        {/* RESULT INFO */}
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-sm text-[#756457]">
            Showing{" "}
            <span className="font-semibold text-[#4A2C1A]">
              {filteredProducts.length}
            </span>{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </p>

          {(search || selectedCategory !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="w-fit text-sm font-medium text-[#B58A32] transition hover:text-[#6F4E37]"
            >
              Clear all filters →
            </button>
          )}

        </div>

        {/* PRODUCTS */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-[2rem] border border-[#E7DCCF] bg-white px-6 py-20 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F5EAD9] text-2xl">
              ✦
            </div>

            <h2 className="mt-6 font-[var(--font-heading)] text-3xl text-[#4A2C1A]">
              No products found
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#756457]">
              We couldn't find anything matching your search.
              Try another keyword or browse our complete collection.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="mt-7 rounded-full bg-[#6F4E37] px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#4A2C1A]"
            >
              View All Products
            </button>

          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}