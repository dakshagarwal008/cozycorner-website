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

  const isOutOfStock =
    product.stock !== undefined && product.stock <= 0;

  const isLowStock =
    product.stock !== undefined &&
    product.stock > 0 &&
    product.stock <= 5;

  return (
    <div className="group w-full min-w-0 overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#6F4E37]/10 sm:rounded-[1.75rem]">

      {/* IMAGE */}
      <Link
        href={`/product/${product.id}`}
        className="relative block overflow-hidden bg-[#F5EAD9]"
      >
        <div className="relative aspect-[4/4.3] min-h-[260px] w-full overflow-hidden sm:aspect-[4/4.2] sm:min-h-[300px] lg:min-h-[320px]">

          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />

          {/* Image overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

          {/* Category */}
          {product.category && (
            <span className="absolute left-3 top-3 max-w-[55%] truncate rounded-full border border-white/40 bg-white/90 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-wider text-[#6F4E37] shadow-sm backdrop-blur sm:left-4 sm:top-4 sm:px-3 sm:text-[10px]">
              {product.category}
            </span>
          )}

          {/* Stock badge */}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 px-4">
              <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-red-600 shadow-lg sm:px-5 sm:py-2.5 sm:text-sm">
                Out of Stock
              </span>
            </div>
          )}

          {/* Low stock */}
          {!isOutOfStock && isLowStock && (
            <span className="absolute right-3 top-3 rounded-full bg-[#FFF4DD] px-2.5 py-1.5 text-[9px] font-semibold text-[#A56B00] shadow-sm sm:right-4 sm:top-4 sm:px-3 sm:text-[10px]">
              Only {product.stock} left
            </span>
          )}

          {/* View button - desktop/tablet hover */}
          <div className="absolute bottom-3 left-3 right-3 hidden translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:block sm:bottom-4 sm:left-4 sm:right-4">
            <div className="flex items-center justify-center gap-2 rounded-full bg-white/95 py-2.5 text-xs font-semibold text-[#4A2C1A] shadow-lg backdrop-blur sm:py-3 sm:text-sm">
              View Product
              <FaArrowRight className="text-[10px] sm:text-xs" />
            </div>
          </div>

        </div>
      </Link>

      {/* PRODUCT DETAILS */}
      <div className="p-4 sm:p-5">

        <Link href={`/product/${product.id}`}>
          <h3 className="line-clamp-2 min-h-[3.25rem] font-[var(--font-heading)] text-lg leading-6 text-[#4A2C1A] transition-colors duration-300 group-hover:text-[#B58A32] sm:min-h-[3.5rem] sm:text-xl sm:leading-7">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-2.5 flex items-center justify-between gap-2 sm:mt-3">

          <p className="text-lg font-semibold text-[#6F4E37] sm:text-xl">
            ₹{product.price}
          </p>

          {!isOutOfStock && (
            <span className="truncate text-[10px] text-[#8A786A] sm:text-xs">
              {isLowStock ? "Limited stock" : "In stock"}
            </span>
          )}

        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-2 sm:mt-5 sm:gap-2.5">

          <Link
            href={`/product/${product.id}`}
            className="flex min-w-0 flex-1 items-center justify-center rounded-full border border-[#6F4E37] px-2 py-2.5 text-xs font-medium text-[#6F4E37] transition-all duration-300 hover:bg-[#6F4E37] hover:text-white sm:px-3 sm:text-sm"
          >
            View
          </Link>

          {!isOutOfStock ? (
            <a
              href={`https://wa.me/${whatsappNumber}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-2 py-2.5 text-xs font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#20BD5A] hover:shadow-md sm:gap-2 sm:px-3 sm:text-sm"
            >
              <FaWhatsapp className="shrink-0 text-sm sm:text-base" />
              <span className="truncate">WhatsApp</span>
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="flex min-w-0 flex-1 cursor-not-allowed items-center justify-center rounded-full bg-gray-200 px-2 py-2.5 text-xs font-medium text-gray-400 sm:px-3 sm:text-sm"
            >
              Unavailable
            </button>
          )}

        </div>

      </div>
    </div>
  );
}