import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="max-w-6xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-[#6F4E37] mb-10">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <Link
          href="/admin/products"
          className="bg-white shadow-lg rounded-xl p-8 hover:shadow-xl"
        >
          <h2 className="text-2xl font-semibold">Products</h2>
          <p className="text-gray-600 mt-2">
            View and manage products
          </p>
        </Link>

        <Link
          href="/admin/products/add"
          className="bg-white shadow-lg rounded-xl p-8 hover:shadow-xl"
        >
          <h2 className="text-2xl font-semibold">Add Product</h2>
          <p className="text-gray-600 mt-2">
            Upload a new product
          </p>
        </Link>
      </div>
    </main>
  );
}