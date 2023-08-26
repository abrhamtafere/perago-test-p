import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <a
        href="/"
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded"
      >
        Go back to home
      </a>
    </div>
  );
};

export default NotFoundPage;