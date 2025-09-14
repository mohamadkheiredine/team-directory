'use client';

import { Card } from "@/app/components/shared/card";
import { Skeleton } from "@/app/components/shared/skeleton";

export default function NewEmployeeLoading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-lg shadow-lg rounded-xl bg-white border border-gray-200 animate-pulse">
        {/* Header Skeleton */}
        <Card.Header className="p-6 border-b border-gray-100 flex flex-col gap-2">
          <Skeleton className="h-8 w-3/4 rounded-md bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-4 w-1/2 rounded-md" />
        </Card.Header>

        {/* Form fields Skeleton */}
        <Card.Content className="p-6 flex flex-col gap-4">
          <Skeleton className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
        </Card.Content>

        <Card.Footer className="p-6">
          <Skeleton className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
        </Card.Footer>
      </Card>
    </div>
  );
}
