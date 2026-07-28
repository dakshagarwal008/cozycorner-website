"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import BackButton from "@/components/common/BackButton";

export default function CartPage() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* EMPTY CART */
  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#FAF7F2] px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">

          <BackButton />

          <div className="flex min-h-[55vh] flex-col items-center justify-center text-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F5EAD9] text-3xl">
              🛍️
            </div>

            <h1 className="mt-6 font-[var(--font-heading)] text-4xl text-[#4A2C1A] sm:text-5xl">
              Your Cart is Empty
            </h1>

            <p className="mt-3 max-w-md text-[#756457]">
              Looks like you haven't added anything to your cart yet.
              Discover something beautiful from our collection.
            </p>

            <Link
              href="/shop"
              className="mt-8 rounded-full bg-[#6F4E37] px-8 py-3.5 font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#4A2C1A]"
            >
              Continue Shopping →
            </Link>

          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-5 pb-24 pt-10 sm:px-6 md:pt-14">

      <div className="mx-auto max-w-6xl">

        {/* BACK */}
        <div className="mb-8">
          <BackButton />
        </div>

        {/* HEADER */}
        <div className="mb-10">

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B58A32]">
            Your selected pieces
          </p>

          <h1 className="mt-2 font-[var(--font-heading)] text-4xl text-[#4A2C1A] sm:text-5xl">
            Shopping Cart
          </h1>

          <p className="mt-2 text-[#756457]">
            {cart.length}{" "}
            {cart.length === 1 ? "item" : "items"} in your cart
          </p>

        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

          {/* CART ITEMS */}
          <div className="space-y-5">

            {cart.map((item) => {
              const itemTotal = item.price * item.quantity;
              const remaining = Math.max(
                item.stock - item.quantity,
                0
              );

              return (
                <div
                  key={item.id}
                  className="rounded-[1.75rem] border border-[#E7DCCF] bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
                >

                  <div className="flex gap-4 sm:gap-6">

                    {/* IMAGE */}
                    <Link
                      href={`/product/${item.id}`}
                      className="shrink-0"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-28 w-28 rounded-2xl object-cover sm:h-36 sm:w-36"
                      />
                    </Link>

                    {/* DETAILS */}
                    <div className="min-w-0 flex-1">

                      <div className="flex items-start justify-between gap-3">

                        <div>
                          <Link
                            href={`/product/${item.id}`}
                            className="font-[var(--font-heading)] text-xl text-[#4A2C1A] transition hover:text-[#B58A32] sm:text-2xl"
                          >
                            {item.name}
                          </Link>

                          <p className="mt-1 text-sm text-[#756457]">
                            ₹{item.price} each
                          </p>
                        </div>

                        {/* REMOVE */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50 hover:text-red-700"
                        >
                          Remove
                        </button>

                      </div>

                      {/* BOTTOM */}
                      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">

                        {/* QUANTITY */}
                        <div>

                          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#8A786A]">
                            Quantity
                          </p>

                          <div className="flex h-10 items-center overflow-hidden rounded-full border border-[#DCCFC0]">

                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(item.id)
                              }
                              className="flex h-full w-10 items-center justify-center text-lg text-[#6F4E37] transition hover:bg-[#F5EAD9]"
                            >
                              −
                            </button>

                            <span className="flex w-10 justify-center text-sm font-semibold text-[#4A2C1A]">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(item.id)
                              }
                              disabled={
                                item.quantity >= item.stock
                              }
                              className="flex h-full w-10 items-center justify-center text-lg text-[#6F4E37] transition hover:bg-[#F5EAD9] disabled:cursor-not-allowed disabled:opacity-30"
                            >
                              +
                            </button>

                          </div>

                          <p className="mt-2 text-xs text-[#8A786A]">
                            {remaining === 0
                              ? "Maximum available quantity"
                              : `${remaining} remaining`}
                          </p>

                        </div>

                        {/* ITEM TOTAL */}
                        <div className="text-right">

                          <p className="text-xs uppercase tracking-wider text-[#8A786A]">
                            Item Total
                          </p>

                          <p className="mt-1 text-xl font-semibold text-[#6F4E37]">
                            ₹{itemTotal}
                          </p>

                        </div>

                      </div>

                    </div>
                  </div>
                </div>
              );
            })}

            {/* CONTINUE SHOPPING */}
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 pt-2 text-sm font-medium text-[#6F4E37] transition hover:text-[#B58A32]"
            >
              ← Continue Shopping
            </Link>

          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:sticky lg:top-28 lg:self-start">

            <div className="rounded-[2rem] border border-[#E7DCCF] bg-white p-6 shadow-sm sm:p-7">

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B58A32]">
                Summary
              </p>

              <h2 className="mt-2 font-[var(--font-heading)] text-3xl text-[#4A2C1A]">
                Order Summary
              </h2>

              <div className="my-6 h-px bg-[#E7DCCF]" />

              {/* SUBTOTAL */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#756457]">
                  Subtotal
                </span>

                <span className="font-medium text-[#4A2C1A]">
                  ₹{total}
                </span>
              </div>

              {/* DELIVERY */}
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-[#756457]">
                  Delivery
                </span>

                <span className="font-medium text-green-600">
                  Calculated at checkout
                </span>
              </div>

              <div className="my-6 h-px bg-[#E7DCCF]" />

              {/* TOTAL */}
              <div className="flex items-end justify-between">

                <span className="font-semibold text-[#4A2C1A]">
                  Total
                </span>

                <span className="font-[var(--font-heading)] text-3xl text-[#6F4E37]">
                  ₹{total}
                </span>

              </div>

              {/* CHECKOUT */}
              <Link
                href="/checkout"
                className="mt-7 flex w-full items-center justify-center rounded-full bg-[#6F4E37] px-6 py-4 font-semibold text-white shadow-lg shadow-[#6F4E37]/20 transition hover:-translate-y-0.5 hover:bg-[#4A2C1A]"
              >
                Proceed to Checkout →
              </Link>

              <p className="mt-4 text-center text-xs leading-5 text-[#8A786A]">
                Review your order before proceeding to checkout.
              </p>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}