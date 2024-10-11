import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="flex flex-col items-start p-4 bg-gradient-to-b from-yellow-400 to-orange-300 text-gray-800 rounded-lg shadow-lg w-64">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
      <div className="flex flex-col space-y-2 w-full">
        <Link
          to="/add-admin"
          className="block p-3 rounded-lg text-lg font-semibold text-gray-800 hover:bg-white hover:text-gray-900 transition duration-200"
        >
          Add Admin
        </Link>
        <Link
          to="/add-flight"
          className="block p-3 rounded-lg text-lg font-semibold text-gray-800 hover:bg-white hover:text-gray-900 transition duration-200"
        >
          Add Flight
        </Link>
        <Link
          to="/update-flight"
          className="block p-3 rounded-lg text-lg font-semibold text-gray-800 hover:bg-white hover:text-gray-900 transition duration-200"
        >
          Update Flight
        </Link>
        <Link
          to="/delete-flight"
          className="block p-3 rounded-lg text-lg font-semibold text-gray-800 hover:bg-white hover:text-gray-900 transition duration-200"
        >
          Delete Flight
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
