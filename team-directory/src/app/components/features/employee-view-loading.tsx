'use client';
import { Card } from "../shared/card";
import { Skeleton } from "../shared/skeleton";

const EmployeeViewLoading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 sm:p-8">
      <Card className="relative w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-gray-200 bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 p-6 sm:p-8 text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mx-auto mb-4 shadow-lg border-4 border-white">
            <Skeleton className="w-full h-full bg-gray-500/30 animate-pulse" /> 
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            <Skeleton className="w-1/2 h-6 bg-gray-500/30 animate-pulse" />
          </h1>
          <p className="mt-1 text-indigo-100 text-sm sm:text-base">
            <Skeleton className="w-1/3 h-4 bg-gray-500/30 animate-pulse" />
          </p>
        </div>

        {/* Card Content */}
        <Card.Content className="p-4 sm:p-8 space-y-6">
          {/* Email */}
          <div>
            <p className="mt-1 text-gray-800 text-sm sm:text-base break-all">
              <Skeleton className="w-full h-4 bg-gray-500/30 animate-pulse" />
            </p>
          </div>

          {/* Status */}
          <div>
            <Skeleton className="w-20 h-6 mt-1 bg-gray-500/30 animate-pulse" />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
            <Skeleton className="w-full sm:w-auto h-10 bg-gray-500/30 animate-pulse rounded-full" />
            <Skeleton className="w-full sm:w-auto h-10 bg-gray-500/30 animate-pulse rounded-full" />
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default EmployeeViewLoading;
