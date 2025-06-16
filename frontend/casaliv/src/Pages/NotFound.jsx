import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-6">
      <h1 className="text-6xl font-extrabold text-pink-600 mb-4">404</h1>
      <p className="text-xl md:text-2xl text-gray-700 mb-4">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="mt-4 inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-lg transition"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
