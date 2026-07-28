import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "CozyCorner Lifestyle",
  description: "Luxury Home Decor & Gift Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${poppins.variable}`}>

        <CartProvider>

          {/* Navbar appears on every page */}
          <Navbar />

          {/* Page content */}
          {children}

          {/* Footer appears on every page */}
          <Footer />

        </CartProvider>

      </body>
    </html>
  );
}