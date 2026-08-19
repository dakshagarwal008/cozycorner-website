import Link from "next/link";

const adminSections = [
  {
    number: "01",
    title: "Manage products",
    description: "View inventory, update product details, or remove products.",
    href: "/admin/products",
    action: "Open products",
  },
  {
    number: "02",
    title: "Add new product",
    description: "Create a product, upload its image, and set category, price, and stock.",
    href: "/admin/products/new",
    action: "Add product",
  },
  {
    number: "03",
    title: "Manage orders",
    description: "Review customer orders and update their fulfillment status.",
    href: "/admin/orders",
    action: "Open orders",
  },
];

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] px-5 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-3xl bg-[#4A2C1A] px-6 py-8 text-white shadow-lg sm:px-10 sm:py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#E4C686]">
            CozyCorner Lifestyle
          </p>
          <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-[var(--font-heading)] text-4xl sm:text-5xl">
                Admin Dashboard
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#F5EAD9] sm:text-base">
                Manage your store from one place. Start with products, add new
                items, or keep customer orders moving.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex w-fit rounded-full border border-white/30 px-5 py-3 text-sm font-medium transition hover:bg-white hover:text-[#4A2C1A]"
            >
              View storefront →
            </Link>
          </div>
        </header>

        <section className="mt-8" aria-labelledby="admin-actions-heading">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B58A32]">
              Store management
            </p>
            <h2
              id="admin-actions-heading"
              className="mt-2 font-[var(--font-heading)] text-3xl text-[#4A2C1A]"
            >
              Choose what to manage
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {adminSections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="group rounded-3xl border border-[#E7DCCF] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#B58A32] hover:shadow-lg"
              >
                <p className="text-sm font-bold tracking-[0.2em] text-[#B58A32]">
                  {section.number}
                </p>
                <h3 className="mt-6 font-[var(--font-heading)] text-2xl text-[#4A2C1A]">
                  {section.title}
                </h3>
                <p className="mt-3 min-h-12 text-sm leading-6 text-[#756457]">
                  {section.description}
                </p>
                <span className="mt-7 inline-flex text-sm font-semibold text-[#6F4E37] transition-transform group-hover:translate-x-1">
                  {section.action} →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
