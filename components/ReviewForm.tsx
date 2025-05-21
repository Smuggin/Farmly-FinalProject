"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ReviewForm({ productId }: { productId: number }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const session = useSession();

  async function submitReview(e: React.FormEvent) {
    e.preventDefault(); // ✅ Prevent page reload
    setLoading(true);

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rating,
        comment,
        productId,
        userId: session.data?.user.user_id,
      }),
    });

    if (res.ok) {
      alert("รีวิวของคุณถูกบันทึกแล้ว!");
      setRating(5);
      setComment("");
      location.reload(); // ✅ Reload the page after alert is confirmed
    } else {
      alert("เกิดข้อผิดพลาด!");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={submitReview} className="border p-4 rounded-md mt-6">
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
        type="submit"
        className="bg-green-500 text-white p-2 rounded-md mt-3 w-full"
        disabled={loading}
      >
        {loading ? "กำลังบันทึก..." : "ส่งรีวิว"}
      </button>
    </form>
  );
}
