"use client";

import { useEffect, useState } from "react";
import {
  getOrders,
  updateOrderStatus,
  Order,
} from "@/services/orderService";
export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
const [loading, setLoading] = useState(true);
const [updatingId, setUpdatingId] = useState<string | null>(null);

const [search, setSearch] = useState("");
const [selectedStatus, setSelectedStatus] = useState("all");

async function handleStatusChange(
  orderId: string,
  status: string
) {
  setUpdatingId(orderId);

  const success = await updateOrderStatus(
    orderId,
    status
  );

  if (success) {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status }
          : order
      )
    );
  } else {
    alert("Failed to update order status.");
  }

  setUpdatingId(null);
}

  useEffect(() => {
    async function loadOrders() {
      const data = await getOrders();

      setOrders(data);
      setLoading(false);
    }

    loadOrders();
  }, []);

const filteredOrders = orders.filter((order) => {
  const searchTerm = search.toLowerCase().trim();

  const matchesSearch =
    order.customerName.toLowerCase().includes(searchTerm) ||
    order.phone.includes(searchTerm) ||
    order.id?.toLowerCase().includes(searchTerm);

  const matchesStatus =
    selectedStatus === "all" ||
    order.status === selectedStatus;

  return matchesSearch && matchesStatus;
});

const totalOrders = orders.length;

const pendingOrders = orders.filter(
  (order) => order.status === "pending"
).length;

const confirmedOrders = orders.filter(
  (order) => order.status === "confirmed"
).length;

const shippedOrders = orders.filter(
  (order) => order.status === "shipped"
).length;

const deliveredOrders = orders.filter(
  (order) => order.status === "delivered"
).length;

const cancelledOrders = orders.filter(
  (order) => order.status === "cancelled"
).length;

const totalRevenue = orders
  .filter((order) => order.status !== "cancelled")
  .reduce((sum, order) => sum + order.total, 0);

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <h1 className="text-3xl font-bold">
          Loading orders...
        </h1>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <h1 className="mb-6 text-3xl font-bold sm:mb-8 sm:text-4xl">
        Orders
      </h1>

      {/* ORDER STATISTICS */}
<div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">

  {/* Total Orders */}
  <div className="rounded-2xl border border-[#E7DCCF] bg-white p-5 shadow-sm">
    <p className="text-sm font-medium text-gray-500">
      Total Orders
    </p>

    <p className="mt-2 text-3xl font-bold text-[#4A2C1A]">
      {totalOrders}
    </p>
  </div>

  {/* Pending */}
  <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5 shadow-sm">
    <p className="text-sm font-medium text-yellow-700">
      Pending
    </p>

    <p className="mt-2 text-3xl font-bold text-yellow-800">
      {pendingOrders}
    </p>
  </div>

  {/* Shipped */}
  <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
    <p className="text-sm font-medium text-blue-700">
      Shipped
    </p>

    <p className="mt-2 text-3xl font-bold text-blue-800">
      {shippedOrders}
    </p>
  </div>

  {/* Delivered */}
  <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
    <p className="text-sm font-medium text-green-700">
      Delivered
    </p>

    <p className="mt-2 text-3xl font-bold text-green-800">
      {deliveredOrders}
    </p>
  </div>

</div>

<div className="mb-8 rounded-2xl border border-[#E7DCCF] bg-[#FAF7F2] p-5 shadow-sm sm:p-6">
  <p className="text-sm font-medium text-[#756457]">
    Total Revenue
  </p>

  <p className="mt-1 text-3xl font-bold text-[#6F4E37]">
    ₹{totalRevenue.toLocaleString("en-IN")}
  </p>

  <p className="mt-1 text-xs text-[#8A786A]">
    Excludes cancelled orders
  </p>
</div>

      {/* SEARCH + FILTERS */}
<div className="mb-8 rounded-2xl border border-[#E7DCCF] bg-white p-5 shadow-sm">

  {/* Search */}
  <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search by customer name, phone or order ID..."
    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#B58A32] focus:ring-2 focus:ring-[#D4AF37]/20"
  />

  {/* Status filters */}
  <div className="mt-4 flex flex-wrap gap-2">
    {[
      { value: "all", label: "All Orders" },
      { value: "pending", label: "Pending" },
      { value: "confirmed", label: "Confirmed" },
      { value: "shipped", label: "Shipped" },
      { value: "delivered", label: "Delivered" },
      { value: "cancelled", label: "Cancelled" },
    ].map((filter) => (
      <button
        key={filter.value}
        type="button"
        onClick={() => setSelectedStatus(filter.value)}
        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
          selectedStatus === filter.value
            ? "bg-[#6F4E37] text-white shadow-sm"
            : "border border-gray-200 bg-white text-gray-700 hover:border-[#B58A32] hover:text-[#6F4E37]"
        }`}
      >
        {filter.label}
      </button>
    ))}
  </div>

</div>

<p className="mb-5 text-sm text-gray-500">
  Showing{" "}
  <span className="font-semibold text-[#4A2C1A]">
    {filteredOrders.length}
  </span>{" "}
  {filteredOrders.length === 1 ? "order" : "orders"}
</p>

     {filteredOrders.length === 0 ? (
        <p className="text-gray-500">
          No orders found.
        </p>
      ) : (
        <div className="space-y-6">
          
         {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="break-words rounded-xl border bg-white p-4 shadow-sm sm:p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>

<div className="flex items-center gap-2 mb-2">
  <span className="text-xs font-medium text-gray-500">
    Order #{order.id}
  </span>

  <button
    type="button"
    onClick={() => {
      if (order.id) {
        navigator.clipboard.writeText(order.id);
        alert("Order ID copied!");
      }
    }}
    className="text-xs text-[#B58A32] hover:text-[#6F4E37] font-medium"
  >
    Copy
  </button>
</div>

                  <h2 className="text-xl font-semibold">
                    {order.customerName}
                  </h2>

                  {order.createdAt && (
  <p className="text-sm text-gray-500 mt-1">
    {order.createdAt.toDate().toLocaleString()}
  </p>
)}

                  <p className="text-gray-600">
                    Phone: {order.phone}
                  </p>

                  <p className="text-gray-600">
                    Address: {order.address}
                  </p>
                </div>

                <div>
                  <p className="text-xl font-bold">
                    ₹{order.total}
                  </p>

                <select
  value={order.status}
  onChange={(e) =>
    handleStatusChange(order.id!, e.target.value)
  }
  disabled={updatingId === order.id}
  className={`mt-2 rounded-lg px-3 py-2 font-medium border ${
  order.status === "pending"
    ? "bg-yellow-50 text-yellow-700 border-yellow-200"
    : order.status === "confirmed"
    ? "bg-blue-50 text-blue-700 border-blue-200"
    : order.status === "shipped"
    ? "bg-purple-50 text-purple-700 border-purple-200"
    : order.status === "delivered"
    ? "bg-green-50 text-green-700 border-green-200"
    : order.status === "cancelled"
    ? "bg-red-50 text-red-700 border-red-200"
    : "bg-white text-gray-700 border-gray-300"
}`}
>
  <option value="pending">Pending</option>
  <option value="confirmed">Confirmed</option>
  <option value="shipped">Shipped</option>
  <option value="delivered">Delivered</option>
  <option value="cancelled">Cancelled</option>
</select>
                </div>
              </div>

              <div className="border-t mt-5 pt-5">
                <h3 className="font-semibold mb-3">
                  Products
                </h3>

                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                    className="flex min-w-0 items-start justify-between gap-4"
                    >
                      <span className="min-w-0 break-words">
                        {item.name} × {item.quantity}
                      </span>

                      <span className="shrink-0">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
