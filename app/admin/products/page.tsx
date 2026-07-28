"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProducts, deleteProduct } from "@/services/productService";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
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
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center text-xl">
        Loading Products...
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-[#6F4E37]">
          Products
        </h1>

        <Link
          href="/admin/products/add"
          className="bg-[#6F4E37] text-white px-5 py-3 rounded-lg"
        >
          + Add Product
        </Link>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full border">

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
                      href={`/admin/products/edit/${product.id}`}
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