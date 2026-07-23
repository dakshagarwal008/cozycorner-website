"use client";

import { motion } from "framer-motion";
import Button from "../common/Button";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-[#FAF7F2] to-[#F5EAD9]">
      <div className="text-center px-6 max-w-4xl">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-[#6F4E37]"
        >
          CozyCorner Lifestyle
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-lg text-gray-700"
        >
          Home • Fashion • Gifts
          <br />
          Beautiful products delivered with love.
        </motion.p>

        <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">
          <Button text="Shop Now" href="/shop" />
          <Button
            text="Explore Rakhi"
            href="/rakhi"
            variant="secondary"
          />
        </div>
      </div>
    </section>
  );
}