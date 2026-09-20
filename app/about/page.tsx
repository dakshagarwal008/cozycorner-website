import Link from "next/link";

const values = [
  ["Thoughtfully chosen", "We look for products with quality, usefulness, and a story worth sharing."],
  ["Rooted in place", "Every collection celebrates the craft, colour, and character of the places it comes from."],
  ["Made to travel", "We make it easier for special local finds to reach homes far beyond their origin."],
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-[#FAF7F2] pt-[82px] text-[#4A2C1A]">
      <section className="relative px-5 py-16 sm:px-8 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#F2DFC0_0,_transparent_36%),radial-gradient(circle_at_bottom_left,_#EAD7C5_0,_transparent_34%)]" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B58A32]">Our story</p>
          <h1 className="mx-auto mt-5 max-w-4xl font-[var(--font-heading)] text-4xl leading-tight sm:text-6xl">Beautiful finds from special places, shared with the world.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#756457] sm:text-lg">CozyCorner Lifestyle began with a simple belief: the best products should not be limited by where they are made.</p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <div className="rounded-[2rem] bg-[#4A2C1A] p-8 text-[#FDF8F2] shadow-xl sm:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E4C686]">Made with heart</p>
            <p className="mt-6 font-[var(--font-heading)] text-3xl leading-snug sm:text-4xl">“A good product carries the care of the people and place behind it.”</p>
            <div className="mt-10 h-px w-16 bg-[#D4AF37]" />
            <p className="mt-5 text-sm leading-7 text-[#F5EAD9]">The inspiration behind CozyCorner Lifestyle</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B58A32]">A mother&apos;s vision</p>
            <h2 className="mt-4 font-[var(--font-heading)] text-3xl leading-tight sm:text-4xl">Started with a wish to share what local places do best.</h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-[#756457]">
              <p>CozyCorner Lifestyle was started by a mother who saw the beauty and quality in products made in particular places—things that deserved to be discovered by more people.</p>
              <p>Her vision is to bring these carefully selected finds to homes everywhere, so that the warmth of local craft, everyday comfort, and meaningful gifting can travel across cities and around the world.</p>
              <p>Every item we choose is part of that journey: from the hands and communities that make it, to the space where it becomes yours.</p>
            </div>
            <Link href="/shop" className="mt-8 inline-flex rounded-full bg-[#6F4E37] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4A2C1A]">Explore our collection</Link>
          </div>
        </div>
      </section>

      <section className="border-y border-[#E7DCCF] bg-white px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl"><div className="max-w-xl"><p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B58A32]">What guides us</p><h2 className="mt-4 font-[var(--font-heading)] text-3xl sm:text-4xl">Small details. Meaningful connections.</h2></div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">{values.map(([title, text], index) => <article key={title} className="rounded-2xl border border-[#E7DCCF] bg-[#FFFCF8] p-6 sm:p-7"><p className="text-sm font-bold tracking-[0.2em] text-[#B58A32]">0{index + 1}</p><h3 className="mt-6 font-[var(--font-heading)] text-2xl">{title}</h3><p className="mt-3 text-sm leading-6 text-[#756457]">{text}</p></article>)}</div>
        </div>
      </section>

      <section className="px-5 py-16 text-center sm:px-8 sm:py-24"><div className="mx-auto max-w-2xl"><p className="font-[var(--font-heading)] text-3xl sm:text-4xl">Thank you for being part of our journey.</p><p className="mt-4 leading-7 text-[#756457]">Every order helps a special local product find a new home.</p><Link href="/shop" className="mt-7 inline-flex border-b-2 border-[#B58A32] pb-1 text-sm font-semibold text-[#6F4E37] transition hover:text-[#B58A32]">Shop CozyCorner Lifestyle →</Link></div></section>
    </main>
  );
}
