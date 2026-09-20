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
    setProducts(await getProducts());
    setLoading(false);
  }

  async function handleDelete(id: string | undefined) {
    if (!id || !window.confirm("Are you sure you want to delete this product?")) return;
    await deleteProduct(id);
    await loadProducts();
  }

  useEffect(() => {
    let active = true;
    void getProducts().then((data) => {
      if (active) { setProducts(data); setLoading(false); }
    });
    return () => { active = false; };
  }, []);

  if (loading) return <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8"><div className="rounded-2xl border border-[#E7DCCF] bg-white p-8 text-center text-[#756457] shadow-sm">Loading products…</div></main>;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B58A32]">Catalog</p>
          <h1 className="mt-2 font-[var(--font-heading)] text-3xl text-[#4A2C1A] sm:text-4xl">Products</h1>
          <p className="mt-2 text-sm text-[#756457]">{products.length} {products.length === 1 ? "product" : "products"} in your store catalog.</p>
        </div>
        <Link href="/admin/products/new" className="w-full rounded-xl bg-[#6F4E37] px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#4A2C1A] sm:w-auto">+ Add Product</Link>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#D9CABB] bg-white p-10 text-center shadow-sm"><h2 className="font-[var(--font-heading)] text-2xl">Your catalog is empty</h2><p className="mt-2 text-sm text-[#756457]">Add your first product to make it visible in the shop.</p></div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#E7DCCF] bg-white shadow-sm"><div className="overflow-x-auto">
          <table className="min-w-[720px] w-full text-left text-sm">
            <thead className="border-b border-[#E7DCCF] bg-[#FDF8F2] text-xs uppercase tracking-wider text-[#756457]"><tr><th className="p-4 font-semibold">Product</th><th className="p-4 font-semibold">Category</th><th className="p-4 font-semibold">Price</th><th className="p-4 font-semibold">Stock</th><th className="p-4 text-right font-semibold">Actions</th></tr></thead>
            <tbody>{products.map((product) => <tr key={product.id} className="border-t border-[#F0E8DE] transition hover:bg-[#FFFCF8]">
              <td className="p-4"><div className="flex items-center gap-3"><Image src={product.imageUrl} alt={product.name} width={48} height={48} className="h-12 w-12 rounded-xl object-cover"/><div><p className="font-semibold text-[#4A2C1A]">{product.name}</p><p className="mt-0.5 text-xs text-[#8A786A]">SKU: {product.id?.slice(0, 8) ?? "—"}</p></div></div></td>
              <td className="p-4"><span className="rounded-full bg-[#F5EAD9] px-2.5 py-1 text-xs font-medium text-[#6F4E37]">{product.category}</span></td><td className="p-4 font-semibold text-[#4A2C1A]">₹{product.price.toLocaleString("en-IN")}</td><td className="p-4"><span className={`font-semibold ${product.stock > 0 ? "text-emerald-700" : "text-red-600"}`}>{product.stock} {product.stock === 1 ? "unit" : "units"}</span></td>
              <td className="p-4"><div className="flex justify-end gap-2"><Link href={`/admin/products/${product.id}/edit`} className="rounded-lg border border-[#D9CABB] px-3 py-2 text-xs font-semibold text-[#6F4E37] transition hover:bg-[#F5EAD9]">Edit</Link><button onClick={() => handleDelete(product.id)} className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100">Delete</button></div></td>
            </tr>)}</tbody>
          </table>
        </div></div>
      )}
    </main>
  );
}
