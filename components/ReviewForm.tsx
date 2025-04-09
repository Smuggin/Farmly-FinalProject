"use client";

import { useState } from "react";

export default function ReviewForm({ productId }: { productId: number }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitReview() {
    setLoading(true);
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, comment, productId, userId: 1 }),
    });

    if (res.ok) {
      alert("รีวิวของคุณถูกบันทึกแล้ว!");
      setRating(5);
      setComment("");
    } else {
      alert("เกิดข้อผิดพลาด!");
    }
    setLoading(false);
  }

  return (
    <div className="border p-4 rounded-md mt-6">
      <h3 className="font-semibold text-lg">เพิ่มรีวิวสินค้า</h3>
      <div className="mt-3">
        <label className="block">คะแนน:</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border p-2 rounded-md w-full"
        >
          {[5, 4, 3, 2, 1].map((num) => (
            <option key={num} value={num}>
              {num} ดาว
            </option>
          ))}
        </select>
      </div>
      <div className="mt-3">
        <label className="block">ความคิดเห็น:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-2 rounded-md w-full"
        />
      </div>
      <button
        onClick={submitReview}
        className="bg-green-500 text-white p-2 rounded-md mt-3 w-full"
        disabled={loading}
      >
        {loading ? "กำลังบันทึก..." : "ส่งรีวิว"}
      </button>
    </div>
  );
}
