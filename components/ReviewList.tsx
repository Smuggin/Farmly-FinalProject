"use client";

import { useEffect, useState } from "react";

interface Review {
  id: number;
  rating: number;
  comment: string;
  user: { name: string };
}

export default function ReviewList({ productId }: { productId: number }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(`/api/reviews?productId=${productId}`);
        const data: Review[] = await res.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [productId]);

  return (
    <div className="mt-6">
      <h3 className="font-semibold text-lg">รีวิวจากลูกค้า</h3>

      {loading ? (
        <div className="space-y-4 mt-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse border p-4 rounded-md space-y-2"
            >
              <div className="h-4 bg-gray-300 rounded w-1/3" />
              <div className="h-3 bg-gray-300 rounded w-24" />
              <div className="h-3 bg-gray-300 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500 mt-4">ยังไม่มีรีวิว</p>
      ) : (
        <div className="mt-4 space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border p-4 rounded-md">
              <p className="font-semibold">
                {review.user?.name || "ผู้ใช้ทั่วไป"}
              </p>
              <p className="text-yellow-500">{"⭐".repeat(review.rating)}</p>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
