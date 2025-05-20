'use client';

import { createContext, useContext, ReactNode } from "react";

type Store = {
  id: number;
  name: string;
  address?: string;
  images: { id: number; url: string; contentType: string }[];
    products: {
        id: number;
        name: string;
        price: number;
        images: { id: number; url: string }[];
        category: { name: string };
        store: { name: string };
        href?: string;
    }[];
};

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({
  store,
  children,
}: {
  store: Store;
  children: ReactNode;
}) {
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
