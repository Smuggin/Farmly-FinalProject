import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingProfile() {
  return (
    <div className="min-h-screen bg-gray-50 space-y-6">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r from-green-500 to-green-400 p-6 text-white shadow-md rounded-b-2xl">
        <div className="flex items-center space-x-4">
          <Skeleton className="w-16 h-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      </div>

      {/* User Info Skeleton */}
      <div>
        <Skeleton className="h-6 w-32 mb-2" />
        <div className="bg-white shadow rounded-lg p-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>

      {/* Orders Skeleton */}
      <div>
        <Skeleton className="h-6 w-48 mb-2" />
        <div className="bg-white shadow rounded-lg p-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-8 w-40 mt-4" />
        </div>
      </div>

      {/* Preferences Skeleton */}
      <div>
        <Skeleton className="h-6 w-32 mb-2" />
        <div className="bg-white shadow rounded-lg p-4 space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
}
