"use client";

import Link from "next/link";
import {
  FaInstagram,
  FaPhoneAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="contact" className="w-full scroll-mt-24 overflow-hidden bg-[#3F281B] text-white">

      {/* Main Footer */}
      <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3 lg:gap-10">

          {/* Brand */}
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">

            <Link
              href="/"
              className="inline-block font-[var(--font-heading)] text-2xl sm:text-3xl"
            >
              CozyCorner
              <span className="text-[#D4AF37]"> Lifestyle</span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-white/65 sm:mt-5 sm:leading-7">
              Beautiful things for beautiful spaces.
              Discover thoughtfully selected home décor,
              lifestyle products and gifts made to bring
              warmth into everyday moments.
            </p>

            {/* Socials */}
            <div className="mt-6 flex gap-3 sm:mt-7">

              <a
                href="https://www.instagram.com/cozycorner_4u?stkn=ZDgzZ2J5NDM0OWNt&utm_source=qr"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 transition hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white"
              >
                <FaInstagram />
              </a>

            </div>

            <a
              href="tel:+917000626375"
              className="mt-6 inline-flex items-center gap-3 text-sm text-white/75 transition hover:text-[#D4AF37]"
            >
              <FaPhoneAlt className="text-[#D4AF37]" />
              +91 70006 26375
            </a>
          </div>

          {/* Shop */}
          <div className="min-w-0">

            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] sm:mb-5 sm:text-sm">
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

          {/* Newsletter */}
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">

            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] sm:mb-5 sm:text-sm">
              Stay Connected
            </h3>

            <p className="max-w-sm text-sm leading-6 text-white/65">
              Get updates about new collections,
              special offers and seasonal favourites.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-5 w-full"
            >
              <div className="flex w-full overflow-hidden rounded-full border border-white/15 bg-white/5">

                <input
                  type="email"
                  placeholder="Your email"
                  aria-label="Email address"
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
                />

                <button
                  type="submit"
                  className="shrink-0 bg-[#D4AF37] px-4 text-sm font-semibold text-[#3F281B] transition hover:bg-[#E4C45A] sm:px-5"
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

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-5 py-5 text-center text-[11px] leading-5 text-white/45 sm:px-6 sm:py-6 sm:text-xs md:flex-row md:items-center md:justify-between md:text-left">

          <p>
            © 2026 CozyCorner Lifestyle. All rights reserved.
          </p>

          <p>
            Made with{" "}
            <span className="text-[#D4AF37]">♥</span>{" "}
            for beautiful homes.
          </p>

        </div>
      </div>

    </footer>
  );
}
