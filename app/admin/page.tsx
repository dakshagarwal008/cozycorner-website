"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getProducts,
  deleteProduct,
} from "@/services/productService";
import { Product } from "@/types/product";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    const data = await getProducts();

    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleDelete(id: string) {
    const confirmed = confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    const success = await deleteProduct(id);

    if (success) {
      setProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );
    } else {
      alert("Failed to delete product.");
    }
  }

  if (loading) {
    return (
      <main className="p-10">
        <h1 className="text-3xl font-bold">
          Loading products...
        </h1>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto p-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">
          Manage Products
        </h1>

        <Link
          href="/admin/products/new"
          className="bg-[#6F4E37] text-white px-5 py-3 rounded-lg"
        >
          + Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">
          No products found.
        </p>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-5"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h2 className="text-xl font-semibold">
                  {product.name}
                </h2>

                <p className="text-gray-600">
                  ₹{product.price}
                </p>
<div className="mt-2 flex items-center gap-2">
  <span className="text-sm font-medium">
    Stock: {product.stock}
  </span>

  {product.stock === 0 ? (
    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
      Out of Stock
    </span>
  ) : product.stock <= 5 ? (
    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
      Low Stock
    </span>
  ) : (
    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
      In Stock
    </span>
  )}
</div>

                <p className="text-sm text-gray-500">
                  Category: {product.category}
                </p>
              </div>

              <div className="flex gap-3">
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </Link>

                <button
                  onClick={() =>
                    product.id &&
                    handleDelete(product.id)
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}