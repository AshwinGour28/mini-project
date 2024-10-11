import React, { useState } from 'react';

export default function AddAdmin() {
  const [adminDetails, setAdminDetails] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Standard',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails({ ...adminDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation: Check if passwords match and fields are not empty
    if (adminDetails.password !== adminDetails.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (!adminDetails.name || !adminDetails.email || !adminDetails.password) {
      setErrorMessage('All fields are required');
      return;
    }

    // You can send the adminDetails object to the backend via an API call here
    console.log('Admin details submitted:', adminDetails);

    // Clear the form and error message upon successful submission
    setAdminDetails({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'Standard',
    });
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-pink-300 p-8">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Admin</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={adminDetails.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={adminDetails.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={adminDetails.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={adminDetails.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Role</label>
            <select
              name="role"
              value={adminDetails.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="Standard">Standard Admin</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300 ease-in-out"
          >
            Add Admin
          </button>
        </form>
      </div>
    </div>
  );
}
