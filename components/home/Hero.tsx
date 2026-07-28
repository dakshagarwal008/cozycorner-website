"use client";

import { motion } from "framer-motion";
import Button from "../common/Button";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-82px)] overflow-hidden bg-[#FAF7F2]">

      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#D4AF37]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#6F4E37]/10 blur-3xl" />

      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#6F4E37 1px, transparent 1px), linear-gradient(90deg, #6F4E37 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-82px)] max-w-7xl grid-cols-1 items-center gap-14 px-6 py-14 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10">

        {/* LEFT */}
        <div className="text-center lg:text-left">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center justify-center gap-3 lg:justify-start"
          >
            <span className="h-px w-10 bg-[#D4AF37]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#B58A32] sm:text-xs">
              Curated for your home
            </span>

            <span className="h-px w-10 bg-[#D4AF37] lg:hidden" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-[var(--font-heading)] text-[3.4rem] leading-[0.98] tracking-tight text-[#4A2C1A] sm:text-6xl lg:text-7xl xl:text-[5.8rem]"
          >
            Make Your
            <br />

            <span className="relative inline-block text-[#B58A32]">
              Corner
              <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-[#D4AF37]/60" />
            </span>{" "}
            Cozy.
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="mx-auto mt-7 max-w-xl text-[15px] leading-7 text-[#6B5A4D] sm:text-lg lg:mx-0"
          >
            Discover beautiful home décor, thoughtful gifts,
            and lifestyle pieces designed to bring warmth and
            personality into every corner of your life.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <Button
              text="Shop Collection"
              href="/shop"
            />

            <Button
              text="Explore Rakhi"
              href="/rakhi"
              variant="secondary"
            />
          </motion.div>

          {/* Trust points */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-[#756457] sm:text-sm lg:justify-start"
          >
            <span className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[10px] text-[#B58A32]">
                ✓
              </span>
              Curated Products
            </span>

            <span className="hidden h-4 w-px bg-[#CDBFAF] sm:block" />

            <span className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[10px] text-[#B58A32]">
                ✓
              </span>
              Quality You Can Trust
            </span>
          </motion.div>
        </div>

        {/* RIGHT VISUAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="relative mx-auto w-full max-w-[560px] lg:max-w-none"
        >

          {/* Gold ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -right-7 -top-7 z-0 h-32 w-32 rounded-full border border-dashed border-[#D4AF37]/50 sm:h-40 sm:w-40"
          />

          {/* Decorative circle */}
          <div className="absolute -bottom-8 -left-8 z-0 h-32 w-32 rounded-full bg-[#D4AF37]/15 blur-sm" />

          {/* Main image */}
          <div className="relative z-10 overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-2xl shadow-[#6F4E37]/20">

            <img
              src="/hero.jpg"
              alt="Beautiful CozyCorner lifestyle collection"
              className="h-[420px] w-full object-cover transition duration-1000 hover:scale-105 sm:h-[520px] lg:h-[590px]"
            />

            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#3B2518]/40 via-transparent to-transparent" />

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
              className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/40 bg-white/85 p-5 shadow-xl backdrop-blur-md sm:bottom-7 sm:left-7 sm:right-auto sm:min-w-[245px]"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B58A32]">
                CozyCorner
              </p>

              <p className="mt-1 font-[var(--font-heading)] text-xl leading-tight text-[#4A2C1A] sm:text-2xl">
                Little things.
                <br />
                Beautiful spaces.
              </p>

              <div className="mt-3 h-px w-10 bg-[#D4AF37]" />
            </motion.div>
          </div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="absolute -bottom-5 -right-3 z-20 flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#FAF7F2] bg-[#6F4E37] text-center shadow-lg sm:-right-5 sm:h-24 sm:w-24"
          >
            <div>
              <p className="font-[var(--font-heading)] text-lg text-[#D4AF37]">
                Made
              </p>
              <p className="text-[9px] uppercase tracking-widest text-white">
                with love
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Bottom scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-[#8A786A] lg:flex"
      >
        <span className="h-5 w-px bg-[#D4AF37]" />
        Discover
      </motion.div>

    </section>
  );
}