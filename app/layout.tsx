import type { Metadata } from "next";
import "./globals.css";

import { CartProvider } from "@/context/CartContext";
import SiteChrome from "@/components/layout/SiteChrome";

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
    <html lang="en" data-scroll-behavior="smooth">
      <body>

        <CartProvider>
          <SiteChrome>{children}</SiteChrome>

        </CartProvider>

      </body>
    </html>
  );
}
