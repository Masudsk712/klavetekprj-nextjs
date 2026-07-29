import { ReactNode } from "react";

import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({
  children,
}: LayoutProps) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-20">
        {children}
      </main>

      <Footer />
    </>
  );
}