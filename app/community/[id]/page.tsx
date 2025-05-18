import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CommentForm from "./CommentForm";

export default async function ThreadDetailPage({ params }: { params: { id: string } }) {
  const threadId = Number(params.id);
  if (isNaN(threadId)) return notFound();

  const thread = await prisma.thread.findUnique({
    where: { id: threadId },
    include: {
      author: true,
      comments: {
        include: { author: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!thread) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-green-700 mb-2">{thread.title}</h1>
      <p className="text-sm text-gray-500 mb-4">โดย {thread.author.name} · {new Date(thread.createdAt).toLocaleString()}</p>
      <p className="mb-6">{thread.content}</p>

      <h2 className="text-lg font-semibold mb-2">ความคิดเห็น ({thread.comments.length})</h2>
      <div className="space-y-4 mb-6">
        {thread.comments.map((comment) => (
          <div key={comment.id} className="border p-3 rounded-lg">
            <p className="text-sm text-gray-800">{comment.content}</p>
            <p className="text-xs text-gray-500">โดย {comment.author.name} · {new Date(comment.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>

      <CommentForm threadId={threadId} />
    </div>
  );
}
