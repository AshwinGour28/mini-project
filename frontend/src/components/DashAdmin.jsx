import { Button } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaPlane, FaEdit, FaTrash } from 'react-icons/fa';

export default function DashAdmin() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-400 to-blue-500 p-8">
      {/* Main Content Area */}
      <div className="w-full max-w-7xl bg-white p-10 rounded-lg shadow-lg border border-gray-200" 
           style={{ 
             animation: 'slide-in 0.5s ease-out forwards', 
             opacity: 0 
           }}>
        {/* Admin Panel Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500">Manage admin and flight information</p>
        </div>

        {/* Button Container */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {/* Add Admin Button */}
          <Link to={'/add-admin'}>
            <Button type="button" gradientMonochrome="teal" size="lg" className="w-full">
              <FaUserPlus className="mr-2 text-2xl" /> Add Admin
            </Button>
          </Link>

          {/* Add Flight Button */}
          <Link to={'/add-flight'}>
            <Button type="button" gradientMonochrome="teal" size="lg" className="w-full">
              <FaPlane className="mr-2 text-2xl" /> Add Flight
            </Button>
          </Link>

          {/* Update Flight Button */}
          <Link to={'/update-flight'}>
            <Button type="button" gradientMonochrome="teal" size="lg" className="w-full">
              <FaEdit className="mr-2 text-2xl" /> Update Flight
            </Button>
          </Link>

          {/* Delete Flight Button */}
          <Link to={'/delete-flight'}>
            <Button type="button" gradientMonochrome="teal" size="lg" className="w-full">
              <FaTrash className="mr-2 text-2xl" /> Delete Flight
            </Button>
          </Link>
        </div>
      </div>

      {/* CSS for Slide-in Animation */}
      <style>{`
        @keyframes slide-in {
          0% {
            transform: translateY(-30px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
