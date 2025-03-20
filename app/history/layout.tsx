import { ReactNode } from "react";
import NavBar from "@/components/nav";
import { MiniNav } from "@/components/miniNav";


type LayoutProps = {
  children: ReactNode;
};

export default function HistoryLayout({ children }: LayoutProps) {
  return (
    <div className="mx-auto max-w-7xl">
      {/* Navbar */}
      <NavBar />
      <MiniNav />
      

      {/* Main Content */}
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
}
