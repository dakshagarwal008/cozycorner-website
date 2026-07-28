"use client";

import Link from "next/link";
import {
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#3F281B] text-white">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-block font-[var(--font-heading)] text-3xl"
            >
              CozyCorner
              <span className="text-[#D4AF37]"> Lifestyle</span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
              Beautiful things for beautiful spaces.
              Discover thoughtfully selected home décor,
              lifestyle products and gifts made to bring
              warmth into everyday moments.
            </p>

            {/* Socials */}
            <div className="mt-7 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 transition hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 transition hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                aria-label="Pinterest"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 transition hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white"
              >
                <FaPinterestP />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              Shop
            </h3>

            <div className="flex flex-col gap-3 text-sm text-white/65">
              <Link
                href="/shop"
                className="transition hover:text-white"
              >
                All Products
              </Link>

              <Link
                href="/shop?category=Home%20Decor"
                className="transition hover:text-white"
              >
                Home Decor
              </Link>

              <Link
                href="/shop?category=Gifts"
                className="transition hover:text-white"
              >
                Gifts
              </Link>

              <Link
                href="/shop?category=Lifestyle"
                className="transition hover:text-white"
              >
                Lifestyle
              </Link>

              <Link
                href="/rakhi"
                className="transition hover:text-white"
              >
                Rakhi Collection
              </Link>
            </div>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              Customer Care
            </h3>

            <div className="flex flex-col gap-3 text-sm text-white/65">
              <Link
                href="/contact"
                className="transition hover:text-white"
              >
                Contact Us
              </Link>

              <Link
                href="/about"
                className="transition hover:text-white"
              >
                About Us
              </Link>

              <Link
                href="/shipping"
                className="transition hover:text-white"
              >
                Shipping & Delivery
              </Link>

              <Link
                href="/returns"
                className="transition hover:text-white"
              >
                Returns & Refunds
              </Link>

              <Link
                href="/privacy"
                className="transition hover:text-white"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              Stay Connected
            </h3>

            <p className="text-sm leading-6 text-white/65">
              Get updates about new collections,
              special offers and seasonal favourites.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-5"
            >
              <div className="flex overflow-hidden rounded-full border border-white/15 bg-white/5">
                <input
                  type="email"
                  placeholder="Your email"
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
                />

                <button
                  type="submit"
                  className="bg-[#D4AF37] px-5 text-sm font-semibold text-[#3F281B] transition hover:bg-[#E4C45A]"
                >
                  Join
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-center text-xs text-white/45 md:flex-row md:items-center md:justify-between md:text-left">

          <p>
            © 2026 CozyCorner Lifestyle. All rights reserved.
          </p>

          <p>
            Made with <span className="text-[#D4AF37]">♥</span> for beautiful homes.
          </p>

        </div>
      </div>

    </footer>
  );
}