"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, loginWithGoogle } from "@/services/authService";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const success = await login(email, password);

    setLoading(false);

    if (success) {
      router.push("/admin");
    } else {
      alert("Invalid email or password.");
    }
  }

  async function handleGoogleLogin() {
    setLoading(true);
    const success = await loginWithGoogle();
    setLoading(false);

    if (success) {
      router.push("/admin");
    } else {
      alert("Google sign-in failed. Please try again.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F3EE] p-5">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-3xl border border-[#E7DCCF] bg-white p-6 shadow-xl shadow-[#4A2C1A]/10 sm:p-9"
      >
        <div className="mb-8 text-center"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#B58A32]">CozyCorner Lifestyle</p><h1 className="mt-3 font-[var(--font-heading)] text-3xl text-[#4A2C1A]">Admin sign in</h1><p className="mt-2 text-sm text-[#756457]">Use your administrator account to manage the store.</p></div>

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded-xl border border-[#E0D4C6] p-3 outline-none transition focus:border-[#B58A32] focus:ring-2 focus:ring-[#D4AF37]/15"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-6 w-full rounded-xl border border-[#E0D4C6] p-3 outline-none transition focus:border-[#B58A32] focus:ring-2 focus:ring-[#D4AF37]/15"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[#6F4E37] py-3 font-semibold text-white transition hover:bg-[#4A2C1A] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="my-6 flex items-center gap-3 text-xs text-[#8A786A]"><span className="h-px flex-1 bg-[#E7DCCF]" />OR<span className="h-px flex-1 bg-[#E7DCCF]" /></div>

        <button type="button" onClick={handleGoogleLogin} disabled={loading} className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#D9CABB] bg-white py-3 font-semibold text-[#4A2C1A] transition hover:bg-[#FDF8F2] disabled:cursor-not-allowed disabled:opacity-60">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-[#4285F4] text-xs font-bold text-white">G</span>
          Continue with Google
        </button>
      </form>
    </main>
  );
}
