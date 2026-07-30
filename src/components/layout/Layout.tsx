import { ReactNode } from "react";

import Footer from "./Footer/Footer";
import PremiumNavbar from "./Navbar/PremiumNavbar";
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({
  children,
}: LayoutProps) {
  return (
    <>
      <PremiumNavbar />
      <main className="min-h-screen">
        {children}
      </main>

      <Footer />
    </>
  );
}
