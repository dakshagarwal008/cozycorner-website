"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 rounded-full border border-[#D8C9B8] bg-white px-5 py-2.5 text-sm font-medium text-[#6F4E37] shadow-sm transition-all duration-300 hover:-translate-x-1 hover:border-[#B58A32] hover:bg-[#FAF7F2] hover:shadow-md"
    >
      <span className="text-lg leading-none">←</span>
      Back
    </button>
  );
}