"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CommentForm({ threadId }: { threadId: number }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, threadId }),
      credentials: "include",
    });

    setLoading(false);
    if (res.ok) {
      setContent("");
      router.refresh(); // โหลด comment ใหม่
    } else {
      alert("เกิดข้อผิดพลาดในการส่งคอมเมนต์");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="เขียนความคิดเห็น..."
        className="w-full border rounded-lg p-2"
        rows={3}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
      >
        {loading ? "กำลังส่ง..." : "ส่งความคิดเห็น"}
      </button>
    </form>
  );
}
