import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AccessibilityPanel from "@/features/accessibility/AccessibilityPanel";
import VisualFilters from "@/features/accessibility/VisualFilters";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Urban Thread | Premium Fashion",
  description: "Modern fashion for the urban lifestyle.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AccessibilityProvider>
          <AuthProvider>
            <CartProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
                <AccessibilityPanel />
                <VisualFilters />
              </div>
            </CartProvider>
          </AuthProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
