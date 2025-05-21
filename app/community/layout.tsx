// app/(main)/layout.tsx
import { ReactNode } from "react";
import NavBar from "@/components/nav";
import { MiniNav } from "@/components/miniNav";
import SessionWrapper from "../SessionWrapper";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <SessionWrapper>
      <div className="mx-auto max-w-7xl">
        <NavBar />
        <MiniNav />
        <main className="container mx-auto">{children}</main>
      </div>
    </SessionWrapper>
  );
}
