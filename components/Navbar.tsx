"use client";

import Link from "next/link";
import { FaShoppingBag } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Rakhi", href: "/rakhi" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <nav className="fixed left-0 top-0 z-50 w-full border-b border-[#D4AF37]/20 bg-[#FAF7F2]/95 shadow-sm backdrop-blur-xl">

        <div className="mx-auto flex h-[82px] max-w-7xl items-center justify-between px-5 sm:px-8">

          {/* LOGO */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="group flex shrink-0 items-center"
          >
            <div className="relative">
              <img
                src="/logo.png"
                alt="CozyCorner Lifestyle"
                className="h-[60px] w-[60px] rounded-full object-cover shadow-sm transition duration-500 group-hover:scale-105 group-hover:rotate-2"
              />

              <div className="absolute inset-0 rounded-full ring-1 ring-[#D4AF37]/20 transition group-hover:ring-[#D4AF37]/60" />
            </div>

            <div className="ml-3 hidden sm:block">
              <div className="font-[var(--font-heading)] text-xl leading-none tracking-wide text-[#4A2C1A] lg:text-2xl">
                CozyCorner
              </div>

              <div className="mt-1 text-[9px] font-medium tracking-[0.4em] text-[#B58A32]">
                LIFESTYLE
              </div>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden items-center gap-7 text-[14px] font-medium text-[#3C3028] md:flex lg:gap-9">

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative py-2 transition-colors duration-300 hover:text-[#B58A32]"
              >
                {item.name}

                <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2 sm:gap-4">

            {/* SHOP NOW */}
            <Link
              href="/shop"
              className="hidden items-center justify-center rounded-full bg-[#6F4E37] px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-[#6F4E37]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#583B29] hover:shadow-lg lg:flex"
            >
              Shop Now
            </Link>

            {/* CART */}
            <Link
              href="/cart"
              aria-label={`Shopping cart with ${cartCount} items`}
              className="group relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:bg-[#F1E7D8]"
            >
              <FaShoppingBag className="text-[18px] text-[#5A3925] transition-transform duration-300 group-hover:scale-110" />

              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-[19px] min-w-[19px] items-center justify-center rounded-full border-2 border-[#FAF7F2] bg-[#D4AF37] px-1 text-[9px] font-bold text-white shadow-sm">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* MOBILE MENU */}
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[#F1E7D8] md:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <HiX className="text-3xl text-[#5A3925]" />
              ) : (
                <HiMenu className="text-3xl text-[#5A3925]" />
              )}
            </button>

          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            menuOpen
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-[#D4AF37]/15 bg-[#FAF7F2] px-6 py-5 shadow-lg">

            <div className="flex flex-col">

              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`py-3.5 font-medium text-[#3C3028] transition-colors hover:text-[#B58A32] ${
                    index !== navItems.length - 1
                      ? "border-b border-[#6F4E37]/10"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <Link
                href="/shop"
                onClick={() => setMenuOpen(false)}
                className="mt-5 rounded-full bg-[#6F4E37] py-3.5 text-center font-medium text-white shadow-md transition-all hover:bg-[#583B29]"
              >
                Shop Now →
              </Link>

            </div>
          </div>
        </div>
      </nav>

      {/* Navbar spacing */}
      <div className="h-[82px]" />
    </>
  );
}