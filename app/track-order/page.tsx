"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getOrder, Order } from "@/services/orderService";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      if (!orderId) {
        setLoading(false);
        return;
      }

      const data = await getOrder(orderId);

      setOrder(data);
      setLoading(false);
    }

    loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto py-20 px-6">
        Loading...
      </main>
    );
  }

  if (!order) {
    return (
      <main className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h1 className="text-3xl font-bold">
          Order not found
        </h1>

        <Link
          href="/"
          className="mt-6 inline-block bg-[#6F4E37] text-white px-6 py-3 rounded-xl"
        >
          Go Home
        </Link>
      </main>
    );
  }

  const steps = [
    "pending",
    "confirmed",
    "shipped",
    "delivered",
  ];

  const currentStep = steps.indexOf(order.status);

  return (
    <main className="max-w-4xl mx-auto py-20 px-6">

      <h1 className="text-4xl font-bold text-[#6F4E37] mb-10">
        Track Order
      </h1>

      <div className="bg-white shadow rounded-2xl p-8">

        <p className="text-gray-500">
          Order ID
        </p>

        <p className="font-bold break-all mb-6">
          {order.id}
        </p>

        <p>
          <strong>Name:</strong> {order.customerName}
        </p>

        <p>
          <strong>Phone:</strong> {order.phone}
        </p>

        <p className="mb-8">
          <strong>Total:</strong> ₹{order.total}
        </p>

        <div className="space-y-5">

          {steps.map((step, index) => {
            const completed = index <= currentStep;

            return (
              <div
                key={step}
                className="flex items-center gap-4"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    completed
                      ? "bg-green-600 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {completed ? "✓" : index + 1}
                </div>

                <span className="capitalize text-lg">
                  {step}
                </span>
              </div>
            );
          })}

        </div>

      </div>

    </main>
  );
}

function LoadingTrackOrder() {
  return (
    <main className="max-w-4xl mx-auto py-20 px-6">
      Loading order...
    </main>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<LoadingTrackOrder />}>
      <TrackOrderContent />
    </Suspense>
  );
}