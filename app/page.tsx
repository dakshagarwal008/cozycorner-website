import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import RakhiSection from "@/components/home/RakhiSection";

export default function Home() {
  return (
    <main>
        <Hero />

        <CategoryGrid />

        <FeaturedProducts />

        <RakhiSection />
    </main>
  );
}
