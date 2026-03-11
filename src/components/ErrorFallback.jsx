import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorFallback = () => {
  const error = useRouteError();
  console.error("Route error:", error);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center bg-gray-50 rounded-lg m-4 shadow-sm">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        We encountered an error while trying to load this content. The server might be down or you might be experiencing network connectivity issues.
      </p>
      <p className="text-sm text-gray-400 font-mono bg-gray-100 p-2 rounded mb-6 truncate max-w-full">
        {error.message || "Unknown error"}
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => window.location.reload()}
          style={{ padding: "4px 8px ", borderRadius: "10px" }}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
