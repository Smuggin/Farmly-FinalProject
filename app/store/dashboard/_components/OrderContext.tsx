'use client';

import { createContext, useContext, ReactNode } from 'react';

export type NormalizedOrder = {
  id: number;
  price?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  user?: {
    name: string;
  };
  address?: {
    id: number;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  orderItems: {
    id: number;
    quantity: number;
    product: {
      id: number;
      name: string;
      price: number;
      images: { id: number; url: string }[];
    };
  }[];
};

const OrderContext = createContext<NormalizedOrder[] | null>(null);

export function OrderProvider({
  orders,
  children,
}: {
  orders: NormalizedOrder[];
  children: ReactNode;
}) {
  return (
    <OrderContext.Provider value={orders}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useStoreOrders must be used within OrderProvider');
  return ctx;
}
