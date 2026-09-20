"use client";

import { useEffect, useState } from "react";
import BackButton from "@/components/common/BackButton";
import ProductCard from "@/components/common/ProductCard";
import { getProducts } from "@/services/productService";
import { Product } from "@/types/product";

export default function RakhiPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRakhiProducts() {
      try {
        const allProducts = await getProducts();

        setProducts(
          allProducts.filter(
            (product) => product.category.trim().toLowerCase() === "rakhi"
          )
        );
      } catch (error) {
        console.error("Failed to load Rakhi products:", error);
      } finally {
        setLoading(false);
      }
    }

    void loadRakhiProducts();
  }, []);

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6">
          <BackButton />
        </div>

        <header className="mb-10 text-center sm:mb-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B58A32] sm:text-xs">
            Celebrate the bond
          </p>
          <h1 className="mt-3 font-[var(--font-heading)] text-3xl leading-tight text-[#4A2C1A] sm:text-5xl md:text-6xl">
            Rakhi Collection
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#756457] sm:text-base">
            Explore all our Rakhi products, chosen to make the celebration
            special.
          </p>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl bg-white shadow-sm sm:rounded-[1.75rem]"
              >
                <div className="h-[300px] animate-pulse bg-[#E8DCCB] sm:h-[340px]" />
                <div className="space-y-3 p-4 sm:p-5">
                  <div className="h-3 w-20 animate-pulse rounded bg-[#E8DCCB]" />
                  <div className="h-5 w-3/4 animate-pulse rounded bg-[#E8DCCB]" />
                  <div className="h-5 w-20 animate-pulse rounded bg-[#E8DCCB]" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-[#E7DCCF] bg-white px-5 py-14 text-center shadow-sm sm:rounded-[2rem] sm:px-6 sm:py-20">
            <h2 className="font-[var(--font-heading)] text-2xl text-[#4A2C1A] sm:text-3xl">
              Rakhi collection coming soon
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#756457]">
              Add a product with the Rakhi category from the admin dashboard to
              show it here.
            </p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-[#756457] sm:mb-7">
              Showing{" "}
              <span className="font-semibold text-[#4A2C1A]">
                {products.length}
              </span>{" "}
              {products.length === 1 ? "product" : "products"}
            </p>

            <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-7">
              {products.map((product) => (
                <div key={product.id} className="min-w-0">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
