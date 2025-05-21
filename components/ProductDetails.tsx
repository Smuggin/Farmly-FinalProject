"use client";

import { useState } from "react";

import ReviewList from "@/components/ReviewList";
import ReviewForm from "./ReviewForm";

export default function ProductDetails({
  description,
  store,
  productId,
}: {
  description: string;
  store: { name: string, description: string };
  productId: number;
}) {
  const [activeTab, setActiveTab] = useState<
    "description" | "reviews" | "farmer"
  >("description");

  return (
    <div className="w-full mt-8 pl-8">
      
      <div className="flex space-x-6 border-b pb-2">
        <div
          className={`cursor-pointer ${
            activeTab === "description"
              ? "font-bold text-green-600 border-b-2 border-green-600"
              : ""
          }`}
          onClick={() => setActiveTab("description")}
        >
          รายละเอียดสินค้า
        </div>
        <div
          className={`cursor-pointer ${
            activeTab === "reviews"
              ? "font-bold text-green-600 border-b-2 border-green-600"
              : ""
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          รีวิวสินค้า
        </div>
        <div
          className={`cursor-pointer ${
            activeTab === "farmer"
              ? "font-bold text-green-600 border-b-2 border-green-600"
              : ""
          }`}
          onClick={() => setActiveTab("farmer")}
        >
          รายละเอียดของเกษตรกร
        </div>
      </div>

      
      <div className="mt-4">
        {activeTab === "description" && (
          <p className="text-lg">{description || "ไม่มีรายละเอียดสินค้า"}</p>
        )}
        {activeTab === "reviews" && (
          <div>
            <ReviewList productId={productId} />
            <ReviewForm productId={productId} />
          </div>
        )}
        {activeTab === "farmer" && (
          <div className="grid grid-cols-[0.6fr_1.5fr] mt-4 gap-12">
            <div className="w-full border border-gray-400 rounded-md shadow-xl px-6">
              <div className="h-48 w-48 rounded-full border items-center mx-auto mt-4"></div>
              <div className="text-3xl">{store.name}</div>
            </div>
            <div className="w-full border border-gray-400 rounded-md shadow-xl p-4">
              <p className="text-xl font-light">{store.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
