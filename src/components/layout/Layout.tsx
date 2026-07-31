import { ReactNode } from "react";

import Footer from "./Footer/Footer";
import PremiumNavbar from "./Navbar/PremiumNavbar";
import ScrollProgress from "@/components/shared/ScrollProgress";
import FloatingActions from "@/components/shared/FloatingActions";
interface LayoutProps {
 children: ReactNode;
}

export default function Layout({
 children,
}: LayoutProps) {
 return (
 <>
 <ScrollProgress />
 <PremiumNavbar />
 <main className="min-h-screen">
 {children}
 </main>
 <FloatingActions />
 <Footer />
 </>
 );
}
