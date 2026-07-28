"use client";

import Link from "next/link";
import { FaWhatsapp, FaArrowRight } from "react-icons/fa";

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  stock?: number;
  category?: string;
};

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const whatsappNumber = "917000626375";

  const message = encodeURIComponent(
    `Hello CozyCorner Lifestyle,

I would like to order:

Product: ${product.name}
Price: ₹${product.price}

Please share more details.`
  );

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;
  const isLowStock =
    product.stock !== undefined &&
    product.stock > 0 &&
    product.stock <= 5;

  return (
    <div className="group relative overflow-hidden rounded-[1.75rem] border border-[#E9DED1] bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#6F4E37]/10">

      {/* IMAGE */}
      <Link
        href={`/product/${product.id}`}
        className="relative block overflow-hidden bg-[#F5EAD9]"
      >
        <div className="relative h-[330px] overflow-hidden">

          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />

          {/* Image overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

          {/* Category */}
          {product.category && (
            <span className="absolute left-4 top-4 rounded-full border border-white/40 bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#6F4E37] shadow-sm backdrop-blur">
              {product.category}
            </span>
          )}

          {/* Stock badge */}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-red-600 shadow-lg">
                Out of Stock
              </span>
            </div>
          )}

          {!isOutOfStock && isLowStock && (
            <span className="absolute right-4 top-4 rounded-full bg-[#FFF4DD] px-3 py-1.5 text-[10px] font-semibold text-[#A56B00] shadow-sm">
              Only {product.stock} left
            </span>
          )}

          {/* View button */}
          <div className="absolute bottom-4 left-4 right-4 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex items-center justify-center gap-2 rounded-full bg-white/95 py-3 text-sm font-semibold text-[#4A2C1A] shadow-lg backdrop-blur">
              View Product
              <FaArrowRight className="text-xs" />
            </div>
          </div>
        </div>
      </Link>

      {/* PRODUCT DETAILS */}
      <div className="p-5">

        <Link href={`/product/${product.id}`}>
          <h3 className="line-clamp-2 min-h-[3.5rem] font-[var(--font-heading)] text-xl leading-7 text-[#4A2C1A] transition-colors duration-300 group-hover:text-[#B58A32]">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xl font-semibold text-[#6F4E37]">
            ₹{product.price}
          </p>

          {!isOutOfStock && (
            <span className="text-xs text-[#8A786A]">
              {isLowStock ? "Limited stock" : "In stock"}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-5 flex gap-2.5">

          <Link
            href={`/product/${product.id}`}
            className="flex flex-1 items-center justify-center rounded-full border border-[#6F4E37] py-2.5 text-sm font-medium text-[#6F4E37] transition-all duration-300 hover:bg-[#6F4E37] hover:text-white"
          >
            View
          </Link>

          {!isOutOfStock ? (
            <a
              href={`https://wa.me/${whatsappNumber}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#20BD5A] hover:shadow-md"
            >
              <FaWhatsapp className="text-base" />
              WhatsApp
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="flex flex-1 cursor-not-allowed items-center justify-center rounded-full bg-gray-200 py-2.5 text-sm font-medium text-gray-400"
            >
              Unavailable
            </button>
          )}

        </div>
      </div>
    </div>
  );
}