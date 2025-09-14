'use client';

import { AlertTriangle } from "lucide-react";

export default function NewEmployeesErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="w-full max-w-md rounded-2xl bg-gray-900/70 p-8 shadow-2xl backdrop-blur-lg border border-gray-700">
        <div className="flex flex-col items-center gap-4">
          <AlertTriangle className="h-16 w-16 text-red-500 animate-pulse" />
          <h1 className="text-2xl font-bold tracking-tight">Something went wrong</h1>
          <p className="text-gray-300 text-sm text-center">
            {error?.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={reset}
            className="mt-4 rounded-xl bg-red-600 px-6 py-2 font-medium text-white shadow-lg transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
