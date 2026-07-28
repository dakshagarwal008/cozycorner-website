import Navbar from "@/components/Navbar";
import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import RakhiSection from "@/components/home/RakhiSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <CategoryGrid />

        <FeaturedProducts />

        <RakhiSection />
      </main>

      <Footer />
    </>
  );
}