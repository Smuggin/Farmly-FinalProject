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

  useEffect(() => {
    async function fetchReviews() {
      const res = await fetch(`/api/reviews?productId=${productId}`);
      const data: Review[] = await res.json();
      setReviews(data);
    }
    fetchReviews();
  }, [productId]);

  return (
    <div className="mt-6">
      <h3 className="font-semibold text-lg">รีวิวจากลูกค้า</h3>
      {reviews.length === 0 ? (
        <p className="text-gray-500">ยังไม่มีรีวิว</p>
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
