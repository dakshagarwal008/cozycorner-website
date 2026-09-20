"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) return;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.replace("/admin/login");
      setLoading(false);
    });
    return () => unsubscribe();
  }, [isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/admin/login");
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-[#F7F3EE] p-6 text-[#4A2C1A]"><div className="rounded-2xl border border-[#E7DCCF] bg-white px-6 py-5 text-sm font-medium shadow-sm">Checking administrator access…</div></div>;
  }

  return (
    <div className="min-h-screen bg-[#F7F3EE] text-[#4A2C1A]">
      <header className="sticky top-0 z-20 border-b border-[#E7DCCF] bg-[#FDFBF8]/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link href="/admin"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B58A32]">CozyCorner</p><p className="font-[var(--font-heading)] text-xl">Store management</p></Link>
          <div className="flex items-center gap-2"><Link href="/admin" className="rounded-lg px-3 py-2 text-sm font-medium text-[#6F4E37] transition hover:bg-[#F5EAD9]">Dashboard</Link><Link href="/" className="hidden rounded-lg px-3 py-2 text-sm font-medium text-[#6F4E37] transition hover:bg-[#F5EAD9] sm:block">View storefront</Link><button type="button" onClick={handleLogout} className="rounded-lg border border-[#E7DCCF] px-3 py-2 text-sm font-medium text-[#6F4E37] transition hover:bg-[#F5EAD9]">Sign out</button></div>
        </div>
      </header>
      {children}
    </div>
  );
}
