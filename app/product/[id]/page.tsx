"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProduct } from "@/services/productService";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import BackButton from "@/components/common/BackButton";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;

      try {
        const data = await getProduct(id as string);

        if (data) {
          setProduct(data as Product);
        }
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF7F2] px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="h-6 w-24 animate-pulse rounded bg-[#E8DCCB]" />

          <div className="mt-10 grid gap-12 md:grid-cols-2">
            <div className="h-[320px] animate-pulse rounded-[2rem] bg-[#E8DCCB] sm:h-[500px]" />

            <div className="space-y-5">
              <div className="h-10 w-3/4 animate-pulse rounded bg-[#E8DCCB]" />
              <div className="h-8 w-32 animate-pulse rounded bg-[#E8DCCB]" />
              <div className="h-24 w-full animate-pulse rounded bg-[#E8DCCB]" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[#FAF7F2] px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <BackButton />

          <div className="py-24 text-center">
            <h1 className="font-[var(--font-heading)] text-3xl text-[#4A2C1A] sm:text-4xl">
              Product Not Found
            </h1>

            <p className="mt-3 text-[#756457]">
              Sorry, we couldn&apos;t find the product you&apos;re looking for.
            </p>

            <button
              onClick={() => router.push("/shop")}
              className="mt-7 rounded-full bg-[#6F4E37] px-7 py-3 font-medium text-white transition hover:bg-[#4A2C1A]"
            >
              Back to Shop
            </button>
          </div>
        </div>
      </main>
    );
  }

  const stock = product.stock ?? 0;
  const totalPrice = product.price * quantity;

  function handleAddToCart() {
    if (!product || stock <= 0) return;

    addToCart({
      id: product.id!,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity,
      stock: product.stock,
    });

    setAddedToCart(true);
  }

  function handleBuyNow() {
    if (!product || stock <= 0) return;

    addToCart({
      id: product.id!,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity,
      stock: product.stock,
    });

    router.push("/cart");
  }

  function increaseQuantity() {
    if (quantity < stock) {
      setQuantity((prev) => prev + 1);
      setAddedToCart(false);
    }
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      setAddedToCart(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-5 pb-24 pt-10 sm:px-6 md:pt-14">

      <div className="mx-auto max-w-6xl">

        {/* BACK */}
        <div className="mb-8">
          <BackButton />
        </div>

        {/* PRODUCT */}
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">

          {/* IMAGE */}
          <div className="relative">

            <div className="overflow-hidden rounded-[2rem] bg-[#F5EAD9] shadow-xl shadow-[#6F4E37]/10">

              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-[450px] w-full object-cover transition duration-700 hover:scale-[1.03] sm:h-[550px]"
              />

            </div>

            {/* CATEGORY */}
            <div className="absolute left-5 top-5">
              <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#6F4E37] shadow-sm backdrop-blur">
                {product.category}
              </span>
            </div>

          </div>

          {/* DETAILS */}
          <div className="flex flex-col">

            {/* SMALL LABEL */}
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B58A32]">
              CozyCorner Lifestyle
            </p>

            {/* NAME */}
            <h1 className="mt-3 font-[var(--font-heading)] text-4xl leading-tight text-[#4A2C1A] sm:text-5xl">
              {product.name}
            </h1>

            {/* PRICE */}
            <div className="mt-5 flex items-center gap-4">
              <p className="text-3xl font-semibold text-[#6F4E37]">
                ₹{product.price}
              </p>

              {stock > 0 && stock <= 5 && (
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                  Only {stock} left
                </span>
              )}

              {stock === 0 && (
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                  Out of Stock
                </span>
              )}

              {stock > 5 && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  In Stock
                </span>
              )}
            </div>

            {/* DESCRIPTION */}
            {product.description && (
              <p className="mt-7 text-[15px] leading-7 text-[#756457]">
                {product.description}
              </p>
            )}

            {/* DIVIDER */}
            <div className="my-8 h-px bg-[#E4D8CA]" />

            {/* STOCK */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#4A2C1A]">
                Availability
              </span>

              <span
                className={`text-sm font-semibold ${
                  stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {stock > 0
                  ? `${stock} units available`
                  : "Currently unavailable"}
              </span>
            </div>

            {/* QUANTITY */}
            {stock > 0 && (
              <div className="mt-7">

                <p className="mb-3 text-sm font-medium text-[#4A2C1A]">
                  Quantity
                </p>

                <div className="flex items-center gap-4">

                  <div className="flex h-12 items-center overflow-hidden rounded-full border border-[#DCCFC0] bg-white">

                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="flex h-full w-12 items-center justify-center text-xl text-[#6F4E37] transition hover:bg-[#F5EAD9] disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      −
                    </button>

                    <span className="flex w-12 justify-center text-base font-semibold text-[#4A2C1A]">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={increaseQuantity}
                      disabled={quantity >= stock}
                      className="flex h-full w-12 items-center justify-center text-xl text-[#6F4E37] transition hover:bg-[#F5EAD9] disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      +
                    </button>

                  </div>

                  <p className="text-sm text-[#756457]">
                    Total:{" "}
                    <span className="font-semibold text-[#6F4E37]">
                      ₹{totalPrice}
                    </span>
                  </p>

                </div>

              </div>
            )}

            {/* BUTTONS */}
            <div className="mt-8 space-y-3">

              {/* ADD TO CART */}
              <button
                type="button"
                disabled={stock <= 0}
                onClick={handleAddToCart}
                className={`w-full rounded-full px-8 py-4 text-base font-semibold transition ${
                  stock <= 0
                    ? "cursor-not-allowed bg-gray-200 text-gray-400"
                    : addedToCart
                    ? "bg-green-600 text-white"
                    : "bg-[#6F4E37] text-white shadow-lg shadow-[#6F4E37]/20 hover:-translate-y-0.5 hover:bg-[#4A2C1A]"
                }`}
              >
                {stock <= 0
                  ? "Out of Stock"
                  : addedToCart
                  ? "Added to Cart ✓"
                  : "Add to Cart"}
              </button>

              {/* BUY NOW */}
              {stock > 0 && (
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full rounded-full border border-[#6F4E37] bg-white px-8 py-4 text-base font-semibold text-[#6F4E37] transition hover:bg-[#F5EAD9]"
                >
                  Buy Now
                </button>
              )}

            </div>

            {/* TRUST INFO */}
            <div className="mt-8 grid grid-cols-2 gap-3">

              <div className="rounded-2xl border border-[#E7DCCF] bg-white/70 p-4 text-center">
                <p className="text-lg">✦</p>
                <p className="mt-1 text-xs font-semibold text-[#4A2C1A]">
                  Quality Products
                </p>
              </div>

              <div className="rounded-2xl border border-[#E7DCCF] bg-white/70 p-4 text-center">
                <p className="text-lg">♡</p>
                <p className="mt-1 text-xs font-semibold text-[#4A2C1A]">
                  Chosen With Love
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
