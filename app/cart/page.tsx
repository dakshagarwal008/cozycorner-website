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
      <main className="min-h-screen bg-[#FAF7F2] px-4 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto w-full max-w-5xl">

          <BackButton />

          <div className="flex min-h-[55vh] flex-col items-center justify-center px-2 text-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F5EAD9] text-3xl">
              🛍️
            </div>

            <h1 className="mt-6 font-[var(--font-heading)] text-3xl leading-tight text-[#4A2C1A] sm:text-5xl">
              Your Cart is Empty
            </h1>

            <p className="mt-3 max-w-md text-sm leading-6 text-[#756457] sm:text-base">
              Looks like you haven't added anything to your cart yet.
              Discover something beautiful from our collection.
            </p>

            <Link
              href="/shop"
              className="mt-8 rounded-full bg-[#6F4E37] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#4A2C1A] sm:px-8"
            >
              Continue Shopping →
            </Link>

          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-4 pb-20 pt-8 sm:px-6 sm:pb-24 sm:pt-10 md:pt-14">

      <div className="mx-auto w-full max-w-6xl">

        {/* BACK */}
        <div className="mb-7 sm:mb-8">
          <BackButton />
        </div>

        {/* HEADER */}
        <div className="mb-8 sm:mb-10">

          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B58A32] sm:text-xs">
            Your selected pieces
          </p>

          <h1 className="mt-2 font-[var(--font-heading)] text-3xl leading-tight text-[#4A2C1A] sm:text-5xl">
            Shopping Cart
          </h1>

          <p className="mt-2 text-sm text-[#756457] sm:text-base">
            {cart.length}{" "}
            {cart.length === 1 ? "item" : "items"} in your cart
          </p>

        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:gap-8">

          {/* CART ITEMS */}
          <div className="min-w-0 space-y-4 sm:space-y-5">

            {cart.map((item) => {
              const itemTotal = item.price * item.quantity;

              const remaining = Math.max(
                item.stock - item.quantity,
                0
              );

              return (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-[#E7DCCF] bg-white p-3.5 shadow-sm transition hover:shadow-md sm:rounded-[1.75rem] sm:p-5"
                >

                  {/* TOP PRODUCT AREA */}
                  <div className="flex min-w-0 gap-3 sm:gap-6">

                    {/* IMAGE */}
                    <Link
                      href={`/product/${item.id}`}
                      className="shrink-0"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-24 w-24 rounded-xl object-cover sm:h-36 sm:w-36 sm:rounded-2xl"
                      />
                    </Link>

                    {/* DETAILS */}
                    <div className="min-w-0 flex-1">

                      <div className="flex min-w-0 items-start justify-between gap-2 sm:gap-3">

                        <div className="min-w-0">

                          <Link
                            href={`/product/${item.id}`}
                            className="block line-clamp-2 font-[var(--font-heading)] text-base leading-6 text-[#4A2C1A] transition hover:text-[#B58A32] sm:text-2xl sm:leading-7"
                          >
                            {item.name}
                          </Link>

                          <p className="mt-1 text-xs text-[#756457] sm:text-sm">
                            ₹{item.price} each
                          </p>

                        </div>

                        {/* REMOVE */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="shrink-0 rounded-full px-2 py-1 text-[10px] font-medium text-red-500 transition hover:bg-red-50 hover:text-red-700 sm:px-3 sm:py-1.5 sm:text-xs"
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                  </div>

                  {/* BOTTOM CONTROLS */}
                  <div className="mt-4 flex flex-col gap-4 border-t border-[#EEE4D8] pt-4 sm:mt-6 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:border-t-0 sm:pt-0">

                    {/* QUANTITY */}
                    <div>

                      <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-[#8A786A] sm:text-xs">
                        Quantity
                      </p>

                      <div className="flex h-9 w-fit items-center overflow-hidden rounded-full border border-[#DCCFC0] sm:h-10">

                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          className="flex h-full w-9 items-center justify-center text-lg text-[#6F4E37] transition hover:bg-[#F5EAD9] sm:w-10"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>

                        <span className="flex w-9 justify-center text-sm font-semibold text-[#4A2C1A] sm:w-10">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          disabled={item.quantity >= item.stock}
                          className="flex h-full w-9 items-center justify-center text-lg text-[#6F4E37] transition hover:bg-[#F5EAD9] disabled:cursor-not-allowed disabled:opacity-30 sm:w-10"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>

                      </div>

                      <p className="mt-2 text-[10px] text-[#8A786A] sm:text-xs">
                        {remaining === 0
                          ? "Maximum available quantity"
                          : `${remaining} remaining`}
                      </p>

                    </div>

                    {/* ITEM TOTAL */}
                    <div className="flex items-center justify-between gap-4 sm:block sm:text-right">

                      <p className="text-[10px] uppercase tracking-wider text-[#8A786A] sm:text-xs">
                        Item Total
                      </p>

                      <p className="mt-0.5 text-lg font-semibold text-[#6F4E37] sm:mt-1 sm:text-xl">
                        ₹{itemTotal}
                      </p>

                    </div>

                  </div>

                </div>
              );
            })}

            {/* CONTINUE SHOPPING */}
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 pt-1 text-sm font-medium text-[#6F4E37] transition hover:text-[#B58A32]"
            >
              ← Continue Shopping
            </Link>

          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:sticky lg:top-28 lg:self-start">

            <div className="rounded-2xl border border-[#E7DCCF] bg-white p-5 shadow-sm sm:rounded-[2rem] sm:p-7">

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B58A32] sm:text-xs">
                Summary
              </p>

              <h2 className="mt-2 font-[var(--font-heading)] text-2xl text-[#4A2C1A] sm:text-3xl">
                Order Summary
              </h2>

              <div className="my-5 h-px bg-[#E7DCCF] sm:my-6" />

              {/* SUBTOTAL */}
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-[#756457]">
                  Subtotal
                </span>

                <span className="font-medium text-[#4A2C1A]">
                  ₹{total}
                </span>
              </div>

              {/* DELIVERY */}
              <div className="mt-4 flex items-start justify-between gap-4 text-sm">
                <span className="text-[#756457]">
                  Delivery
                </span>

                <span className="text-right font-medium text-green-600">
                  Calculated at checkout
                </span>
              </div>

              <div className="my-5 h-px bg-[#E7DCCF] sm:my-6" />

              {/* TOTAL */}
              <div className="flex items-end justify-between gap-4">

                <span className="font-semibold text-[#4A2C1A]">
                  Total
                </span>

                <span className="font-[var(--font-heading)] text-2xl text-[#6F4E37] sm:text-3xl">
                  ₹{total}
                </span>

              </div>

              {/* CHECKOUT */}
              <Link
                href="/checkout"
                className="mt-6 flex w-full items-center justify-center rounded-full bg-[#6F4E37] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#6F4E37]/20 transition hover:-translate-y-0.5 hover:bg-[#4A2C1A] sm:mt-7 sm:px-6 sm:py-4"
              >
                Proceed to Checkout →
              </Link>

              <p className="mt-4 text-center text-[11px] leading-5 text-[#8A786A] sm:text-xs">
                Review your order before proceeding to checkout.
              </p>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}