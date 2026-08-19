"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProducts, deleteProduct } from "@/services/productService";
import { Product } from "@/types/product";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    await deleteProduct(id);
    loadProducts();
  }

  useEffect(() => {
    let isActive = true;

    void getProducts().then((data) => {
      if (isActive) {
        setProducts(data);
        setLoading(false);
      }
    });

    return () => {
      isActive = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="p-5 text-center text-xl sm:p-10">
        Loading Products...
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <h1 className="text-3xl font-bold text-[#6F4E37] sm:text-4xl">
          Products
        </h1>

        <Link
          href="/admin/products/new"
          className="w-full rounded-lg bg-[#6F4E37] px-5 py-3 text-center text-white sm:w-auto"
        >
          + Add Product
        </Link>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-[680px] w-full border">

          <thead className="bg-[#F6F1EB]">

            <tr>

              <th className="p-4">Image</th>

              <th>Name</th>

              <th>Category</th>

              <th>Price</th>

              <th>Stock</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr key={product.id} className="border-t text-center">

                <td className="p-3">

                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={70}
                    height={70}
                    className="rounded-lg object-cover mx-auto"
                  />

                </td>

                <td>{product.name}</td>

                <td>{product.category}</td>

                <td>₹{product.price}</td>

                <td>{product.stock}</td>

                <td>

                  <div className="flex justify-center gap-3">

                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="bg-blue-500 text-white px-3 py-2 rounded"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-3 py-2 rounded"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}
