"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProduct, updateProduct } from "@/services/productService";
import { Product } from "@/types/product";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      if (!params.id) return;

      const data = await getProduct(params.id as string);

      if (data) {
        setProduct(data as Product);
      }

      setLoading(false);
    }

    loadProduct();
  }, [params.id]);

  if (loading) {
    return (
      <main className="max-w-5xl mx-auto py-10">
        Loading...
      </main>
    );
  }

  if (!product) {
    return (
      <main className="max-w-5xl mx-auto py-10">
        Product not found.
      </main>
    );
  }

async function handleSave() {
  if (!product || !params.id) return;

  const success = await updateProduct(
    params.id as string,
    product
  );

  if (success) {
    alert("Product updated successfully!");
    router.push("/admin/products");
  } else {
    alert("Failed to update product.");
  }
}

  return (
    <main className="max-w-5xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">
        Edit Product
      </h1>
<div className="space-y-5">

  <div>
    <label className="block mb-1 font-medium">Product Name</label>
    <input
      type="text"
      value={product.name}
      onChange={(e) =>
        setProduct({ ...product, name: e.target.value })
      }
      className="w-full border rounded-lg p-3"
    />
  </div>

  <div>
    <label className="block mb-1 font-medium">Price</label>
    <input
      type="number"
      value={product.price}
      onChange={(e) =>
        setProduct({
          ...product,
          price: Number(e.target.value),
        })
      }
      className="w-full border rounded-lg p-3"
    />
  </div>

  <div>
    <label className="block mb-1 font-medium">Category</label>
    <input
      type="text"
      value={product.category}
      onChange={(e) =>
        setProduct({
          ...product,
          category: e.target.value,
        })
      }
      className="w-full border rounded-lg p-3"
    />
  </div>

  <div>
    <label className="block mb-1 font-medium">Description</label>
    <textarea
      value={product.description}
      onChange={(e) =>
        setProduct({
          ...product,
          description: e.target.value,
        })
      }
      className="w-full border rounded-lg p-3"
      rows={5}
    />
  </div>

  <div>
    <label className="block mb-1 font-medium">Stock</label>
    <input
      type="number"
      value={product.stock}
      onChange={(e) =>
        setProduct({
          ...product,
          stock: Number(e.target.value),
        })
      }
      className="w-full border rounded-lg p-3"
    />
  </div>

  <div className="flex gap-8">

    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={product.featured}
        onChange={(e) =>
          setProduct({
            ...product,
            featured: e.target.checked,
          })
        }
      />
      Featured Product
    </label>

    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={product.rakhi}
        onChange={(e) =>
          setProduct({
            ...product,
            rakhi: e.target.checked,
          })
        }
      />
      Rakhi Product
    </label>

  </div>

</div>

<button
  onClick={handleSave}
  className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
>
  Save Changes
</button>

    </main>
  );
}

