import { ReactNode } from "react";
import NavBar from "@/components/nav";
import { MiniNav } from "@/components/miniNav";
import SessionWrapper from "../SessionWrapper";


type LayoutProps = {
  children: ReactNode;
};

export default function HistoryLayout({ children }: LayoutProps) {
  return (
    <SessionWrapper>
    <div className="mx-auto max-w-7xl">
      {/* Navbar */}
      <NavBar />
      <MiniNav />
      
      {/* Main Content */}
      <main className="container mx-auto">{children}</main>
    </div>
    </SessionWrapper>
  );
}
