// app/community/new/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewThreadPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/community", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (data?.id) router.push(`/community/${data.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">ตั้งกระทู้ใหม่</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="หัวข้อกระทู้"
          className="w-full border px-4 py-2 rounded"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="เนื้อหากระทู้"
          rows={6}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          โพสต์กระทู้
        </button>
      </form>
    </div>
  );
}
