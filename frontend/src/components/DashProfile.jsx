import React from 'react';
import { useSelector } from 'react-redux';

export default function DashProfile() {
  const { currentUser } = useSelector(state => state.user);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 p-8">
      <div className="w-full max-w-lg bg-white p-10 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Profile Details</h2>
        
        <div className="space-y-6">
          {/* First Name */}
          <div>
            <label className="block text-lg font-medium text-gray-700">First Name</label>
            <div className="mt-2 block w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700">
              {currentUser.f_name}
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Last Name</label>
            <div className="mt-2 block w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700">
              {currentUser.l_name}
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Email Address</label>
            <div className="mt-2 block w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700">
              {currentUser.email}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Password</label>
            <div className="mt-2 block w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700">
              {'*'.repeat(8)} {/* Displaying asterisks for the password */}
            </div>
          </div>
        </div>

        {/* Profile Picture */}
        
      </div>
    </div>
  );
}
