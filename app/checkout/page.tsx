"use client";

import {
  getProductStock,
  updateProductStock,
} from "@/services/productService";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/services/orderService";
import BackButton from "@/components/common/BackButton";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // -----------------------------
  // VALIDATION
  // -----------------------------

  const isValidPhone = /^[6-9]\d{9}$/.test(phone);

  const isValidPincode = /^[1-9]\d{5}$/.test(pincode);

  const isValidName =
    /^[A-Za-z][A-Za-z .']{2,49}$/.test(name.trim());

  const isValidAddress = address.trim().length >= 10;

  const formIsValid =
    isValidName &&
    isValidPhone &&
    isValidPincode &&
    isValidAddress;

  // -----------------------------
  // SUBMIT ORDER
  // -----------------------------

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isValidName) {
      alert("Please enter a valid name using letters only.");
      return;
    }

    if (!isValidPhone) {
      alert(
        "Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9."
      );
      return;
    }

    if (!isValidPincode) {
      alert("Please enter a valid 6-digit Indian pincode.");
      return;
    }

    if (!isValidAddress) {
      alert("Please enter your complete delivery address.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      // -----------------------------
      // CHECK STOCK
      // -----------------------------

      for (const item of cart) {
        const currentStock = await getProductStock(item.id);

        if (currentStock === null) {
          alert(`Could not find product: ${item.name}`);
          setLoading(false);
          return;
        }

        if (currentStock < item.quantity) {
          alert(
            `Not enough stock for ${item.name}. Only ${currentStock} available.`
          );
          setLoading(false);
          return;
        }
      }

      // -----------------------------
      // CREATE ORDER
      // -----------------------------

      const result = await createOrder({
        customerName: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),

        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),

        total,
        status: "pending",
      });

      if (!result.success) {
        alert("Failed to place order. Please try again.");
        setLoading(false);
        return;
      }

      // -----------------------------
      // SEND ORDER EMAIL
      // -----------------------------

      try {
        await fetch("/api/send-order-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerName: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            address: address.trim(),
            items: cart,
            total,
          }),
        });
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
      }

      // -----------------------------
      // REDUCE STOCK
      // -----------------------------

      for (const item of cart) {
        const currentStock = await getProductStock(item.id);

        if (currentStock !== null) {
          await updateProductStock(
            item.id,
            currentStock - item.quantity
          );
        }
      }

      // -----------------------------
      // CREATE WHATSAPP MESSAGE
      // -----------------------------

      const whatsappNumber = "917000626375";

      const orderId = result.id;

      const productDetails = cart
        .map(
          (item) =>
            `• ${item.name} × ${item.quantity} — ₹${
              item.price * item.quantity
            }`
        )
        .join("\n");

      const whatsappMessage = `
Hello CozyCorner Lifestyle 👋

I would like to place an order.

*Order ID:* ${orderId}

*Customer Details*
Name: ${name.trim()}
Phone: +91 ${phone.trim()}
Email: ${email.trim() || "Not provided"}

*Delivery Address*
${address.trim()}
Pincode: ${pincode}

*Order Details*
${productDetails}

*Total Amount: ₹${total}*

Please confirm my order and share the payment details.

Thank you!
      `.trim();

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`;

      // -----------------------------
      // CLEAR CART
      // -----------------------------

      clearCart();

      // -----------------------------
      // OPEN WHATSAPP
      // -----------------------------

      window.location.href = whatsappUrl;

      // -----------------------------
      // ORDER SUCCESS PAGE
      // -----------------------------

      setTimeout(() => {
        router.push(`/order-success?id=${orderId}`);
      }, 1000);
    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // -----------------------------
  // EMPTY CART
  // -----------------------------

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#FAF7F2] px-4 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <BackButton />

          <div className="mt-8 rounded-3xl bg-white p-6 text-center shadow-sm sm:p-10">
            <h1 className="font-[var(--font-heading)] text-3xl text-[#4A2C1A] sm:text-4xl">
              Checkout
            </h1>

            <p className="mt-4 text-[#756457]">
              Your cart is empty.
            </p>

            <button
              onClick={() => router.push("/shop")}
              className="mt-7 rounded-full bg-[#6F4E37] px-7 py-3 font-semibold text-white transition hover:bg-[#4A2C1A]"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </main>
    );
  }

  // -----------------------------
  // CHECKOUT PAGE
  // -----------------------------

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-5 py-12 sm:px-6 md:py-16">
      <div className="mx-auto max-w-5xl">
        <BackButton />

        {/* HEADER */}
        <div className="mb-10 mt-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B58A32]">
            Almost there
          </p>

          <h1 className="mt-3 font-[var(--font-heading)] text-3xl text-[#4A2C1A] sm:text-5xl">
            Checkout
          </h1>

          <p className="mt-3 text-[#756457]">
            Enter your delivery details to place your order.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* CUSTOMER DETAILS */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-[#E7DCCF] bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="font-[var(--font-heading)] text-2xl text-[#4A2C1A]">
              Delivery Details
            </h2>

            <div className="mt-7 space-y-6">
              {/* NAME */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4A2C1A]">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  maxLength={50}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (/^[A-Za-z .']*$/.test(value)) {
                      setName(value);
                    }
                  }}
                  placeholder="Enter your full name"
                  className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                    name && !isValidName
                      ? "border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-[#E0D4C6] focus:border-[#B58A32] focus:ring-2 focus:ring-[#D4AF37]/10"
                  }`}
                  required
                />

                {name && !isValidName && (
                  <p className="mt-2 text-xs text-red-600">
                    Please enter a valid name.
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4A2C1A]">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-xl border border-[#E0D4C6] px-4 py-3 outline-none focus:border-[#B58A32] focus:ring-2 focus:ring-[#D4AF37]/10"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4A2C1A]">
                  Mobile Number
                </label>

                <div className="flex">
                  <span className="flex items-center rounded-l-xl border border-r-0 border-[#E0D4C6] bg-[#F5EAD9] px-4 text-sm font-medium text-[#6F4E37]">
                    +91
                  </span>

                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    value={phone}
                    maxLength={10}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setPhone(value.slice(0, 10));
                    }}
                    placeholder="9876543210"
                    className={`w-full rounded-r-xl border px-4 py-3 outline-none transition ${
                      phone && !isValidPhone
                        ? "border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-[#E0D4C6] focus:border-[#B58A32] focus:ring-2 focus:ring-[#D4AF37]/10"
                    }`}
                    required
                  />
                </div>

                {phone && !isValidPhone && (
                  <p className="mt-2 text-xs text-red-600">
                    Enter a valid 10-digit Indian mobile number
                    starting with 6, 7, 8 or 9.
                  </p>
                )}

                {isValidPhone && (
                  <p className="mt-2 text-xs text-green-600">
                    ✓ Valid mobile number
                  </p>
                )}
              </div>

              {/* ADDRESS */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4A2C1A]">
                  Delivery Address
                </label>

                <textarea
                  value={address}
                  maxLength={300}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House/Flat No., Street, Area, Landmark..."
                  rows={5}
                  className={`w-full resize-none rounded-xl border px-4 py-3 outline-none transition ${
                    address && !isValidAddress
                      ? "border-red-400"
                      : "border-[#E0D4C6] focus:border-[#B58A32] focus:ring-2 focus:ring-[#D4AF37]/10"
                  }`}
                  required
                />

                <div className="mt-1 flex justify-between text-xs text-[#8A786A]">
                  <span>Minimum 10 characters</span>
                  <span>{address.length}/300</span>
                </div>
              </div>

              {/* PINCODE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4A2C1A]">
                  Pincode
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  value={pincode}
                  maxLength={6}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setPincode(value.slice(0, 6));
                  }}
                  placeholder="Enter 6-digit pincode"
                  className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
                    pincode && !isValidPincode
                      ? "border-red-400"
                      : "border-[#E0D4C6] focus:border-[#B58A32] focus:ring-2 focus:ring-[#D4AF37]/10"
                  }`}
                  required
                />

                {pincode && !isValidPincode && (
                  <p className="mt-2 text-xs text-red-600">
                    Pincode must contain exactly 6 digits.
                  </p>
                )}

                {isValidPincode && (
                  <p className="mt-2 text-xs text-green-600">
                    ✓ Valid pincode
                  </p>
                )}
              </div>
            </div>

            {/* PLACE ORDER */}
            <button
              type="submit"
              disabled={!formIsValid || loading}
              className={`mt-8 flex w-full items-center justify-center gap-3 rounded-xl py-4 text-lg font-semibold transition ${
                !formIsValid || loading
                  ? "cursor-not-allowed bg-gray-300 text-gray-500"
                  : "bg-[#25D366] text-white shadow-md hover:-translate-y-0.5 hover:bg-[#20BD5A] hover:shadow-lg"
              }`}
            >
              {loading ? (
                "Processing Order..."
              ) : (
                <>
                  <span className="text-xl">💬</span>
                  Place Order via WhatsApp
                </>
              )}
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-[#8A786A]">
              Your order will be saved and WhatsApp will open with
              your order details. We will confirm the order and
              share payment details with you.
            </p>
          </form>

          {/* ORDER SUMMARY */}
          <div className="h-fit rounded-3xl border border-[#E7DCCF] bg-white p-6 shadow-sm sm:p-8 lg:sticky lg:top-28">
            <h2 className="font-[var(--font-heading)] text-2xl text-[#4A2C1A]">
              Order Summary
            </h2>

            <div className="mt-6 space-y-5">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-16 w-16 rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-[#4A2C1A]">
                      {item.name}
                    </p>

                    <p className="mt-1 text-sm text-[#756457]">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-[#6F4E37]">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-[#E7DCCF] pt-5">
              <div className="flex items-center justify-between">
                <span className="text-[#756457]">
                  Items
                </span>

                <span className="font-medium text-[#4A2C1A]">
                  {cart.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                  )}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-semibold text-[#4A2C1A]">
                  Total
                </span>

                <span className="text-2xl font-bold text-[#B58A32]">
                  ₹{total}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
