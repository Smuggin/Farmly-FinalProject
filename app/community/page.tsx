"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Thread = {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  replies: number;
};

function FormattedDate({ date }: { date: string }) {
  const [formatted, setFormatted] = useState("");

  useEffect(() => {
    setFormatted(new Date(date).toLocaleDateString());
  }, [date]);

  return <>{formatted}</>;
}

export default function CommunityPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchThreads() {
      try {
        const res = await fetch("/api/community/threads");
        if (!res.ok) throw new Error("Failed to fetch threads");
        const data: Thread[] = await res.json();
        setThreads(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchThreads();
  }, []);

  if (loading) return <div className="text-center py-8">กำลังโหลดข้อมูล...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">ชุมชนเกษตร</h1>
        <Link href="/community/new">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
            + ตั้งกระทู้ใหม่
          </button>
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg divide-y">
        {threads.length === 0 && (
          <p className="text-center py-4 text-gray-500">ยังไม่มีกระทู้ในขณะนี้</p>
        )}
        {threads.map((thread) => (
          <Link
            key={thread.id}
            href={`/community/${thread.id}`}
            className="block hover:bg-gray-50 px-4 py-4"
          >
            <div className="flex justify-between">
              <div>
                <h2 className="text-lg font-semibold text-green-700">{thread.title}</h2>
                <p className="text-sm text-gray-500">
                  โดย {thread.author} · <FormattedDate date={thread.createdAt} />
                </p>
              </div>
              <div className="text-sm text-gray-600 self-center">
                {thread.replies} ความเห็น
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
