"use client";

import Link from "next/link";
import { FaShoppingBag } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#FAF7F2]/90 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="text-3xl font-bold text-[#6F4E37]">
          CozyCorner
          <span className="text-[#D4AF37]"> Lifestyle</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-[#2B2B2B] font-medium">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/rakhi">Rakhi</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          <button className="hidden md:block bg-[#D4AF37] text-white px-5 py-2 rounded-full hover:scale-105 transition">
            Shop Now
          </button>

          <FaShoppingBag
            className="text-[#6F4E37] text-xl cursor-pointer"
          />

          <HiMenu
            className="md:hidden text-3xl text-[#6F4E37]"
          />

        </div>

      </div>
    </nav>
  );
}