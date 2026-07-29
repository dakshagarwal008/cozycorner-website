"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FAF7F2] px-6">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-lg p-10 text-center">

        <div className="text-6xl mb-5">🎉</div>

        <h1 className="text-4xl font-bold text-[#6F4E37]">
          Order Placed Successfully!
        </h1>

        <p className="mt-4 text-gray-600">
          Thank you for shopping with CozyCorner Lifestyle.
        </p>

        <div className="mt-8 rounded-xl bg-[#F5EAD9] p-5">
          <p className="text-gray-500 text-sm">
            Your Order ID
          </p>

          <p className="mt-2 text-xl font-bold text-[#4A2C1A] break-all">
            {orderId || "Order ID unavailable"}
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4">

          <Link
            href={orderId ? `/track-order?id=${orderId}` : "/track-order"}
            className="w-full rounded-xl bg-[#6F4E37] py-4 text-white font-semibold hover:opacity-90"
          >
            Track Your Order
          </Link>

          <Link
            href="/shop"
            className="w-full rounded-xl border border-[#6F4E37] py-4 text-[#6F4E37] font-semibold hover:bg-[#6F4E37] hover:text-white transition"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    </main>
  );
}

function LoadingOrderSuccess() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FAF7F2] px-6">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-lg p-10 text-center">
        <div className="text-4xl mb-4">🎉</div>

        <h1 className="text-2xl font-bold text-[#6F4E37]">
          Loading order details...
        </h1>
      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<LoadingOrderSuccess />}>
      <OrderSuccessContent />
    </Suspense>
  );
}