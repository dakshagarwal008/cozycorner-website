"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { uploadImage } from "@/services/cloudinaryService";
import { addProduct } from "@/services/productService";
const CATEGORIES = [
  "Bedsheet",
  "Rakhi",
  "Towel",
  "Kits",
  "Pants & Leggings",
  "T-Shirts",
  "Toran (Bandarwall)",
];

interface FormState {
  name: string;
  price: string;
  stock: string;
  category: string;
  description: string;
}

const initialForm: FormState = {
  name: "",
  price: "",
  stock: "",
  category: "",
  description: "",
};

export default function AddProductPage() {
  const [form, setForm] = useState<FormState>(initialForm);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] =
    useState<string | null>(null);
  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Image must be smaller than 5MB.");
      return;
    }

    setErrorMessage(null);
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setImageFile(null);
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validate = (): string | null => {
    if (!form.name.trim()) {
      return "Product name is required.";
    }

    if (
      !form.price.trim() ||
      isNaN(Number(form.price)) ||
      Number(form.price) <= 0
    ) {
      return "Enter a valid price.";
    }

    if (
      !form.stock.trim() ||
      isNaN(Number(form.stock)) ||
      Number(form.stock) < 0 ||
      !Number.isInteger(Number(form.stock))
    ) {
      return "Enter a valid stock quantity.";
    }

    if (!form.category) {
      return "Please select a category.";
    }

    if (!imageFile) {
      return "Please upload a product image.";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSuccessMessage(null);
    setErrorMessage(null);

    const validationError = validate();

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const imageUrl = await uploadImage(imageFile as File);

      await addProduct({
        name: form.name.trim(),
        price: Number(form.price),
        stock: Number(form.stock),
        category: form.category,
        description: form.description.trim(),
        imageUrl,
        featured: false,
        rakhi: form.category.trim().toLowerCase() === "rakhi",
        createdAt: new Date().toISOString(),
      });

      setSuccessMessage("Product added successfully!");

      resetForm();
    } catch (err) {
      console.error(err);

      setErrorMessage(
        "Something went wrong while saving the product. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-start justify-center px-4 py-10 sm:py-16">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#6F4E37] transition hover:bg-[#F5EAD9]"
          >
            ← Back to dashboard
          </Link>

          <div className="mt-4 text-center">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Add New Product
          </h1>

          <p className="mt-2 text-slate-500">
            Fill in the details below to list a new product in your catalog.
          </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-8">

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700">
              <span className="text-sm font-medium">
                {successMessage}
              </span>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
              <span className="text-sm font-medium">
                {errorMessage}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Product Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Product Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Wooden Decorative Tray"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                disabled={isSubmitting}
              />
            </div>

            {/* Price + Stock */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Price (₹)
                </label>

                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="990"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  disabled={isSubmitting}
                />
              </div>

              {/* Stock */}
              <div>
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Stock Quantity
                </label>

                <input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  step="1"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="10"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  disabled={isSubmitting}
                />
              </div>

            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                disabled={isSubmitting}
              >
                <option value="">
                  Select a category
                </option>

                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                rows={4}
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the product's features, materials, and details."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                disabled={isSubmitting}
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Product Image
              </label>

              {!imagePreview ? (
                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/40 transition"
                >
                  <svg
                    className="h-8 w-8 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 7.5m0 0L7.5 12m4.5-4.5v13.5"
                    />
                  </svg>

                  <span className="text-sm text-slate-600">
                    <span className="font-medium text-indigo-600">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </span>

                  <span className="text-xs text-slate-400">
                    PNG, JPG or WEBP (max 5MB)
                  </span>

                  <input
                    ref={fileInputRef}
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={isSubmitting}
                  />
                </label>
              ) : (
                <div className="relative w-full overflow-hidden rounded-xl border border-slate-200">

                  <img
                    src={imagePreview}
                    alt="Selected product preview"
                    className="h-56 w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    disabled={isSubmitting}
                    className="absolute top-3 right-3 rounded-full bg-white/90 p-2 text-slate-600 shadow-sm hover:bg-white hover:text-red-600 transition disabled:opacity-50"
                    aria-label="Remove image"
                  >
                    ✕
                  </button>

                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition disabled:cursor-not-allowed disabled:bg-indigo-400"
            >
              {isSubmitting ? "Uploading & Saving..." : "Add Product"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
