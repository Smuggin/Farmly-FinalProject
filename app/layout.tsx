import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./SessionWrapper"; // You'll create this
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "sonner";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interFont.variable} antialiased`}>
        <SessionWrapper>
          <CartProvider>
            {children}
            <Toaster richColors position="top-right" expand={false} duration={500} />
          </CartProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
