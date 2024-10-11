import React from 'react';
import { Link } from 'react-router-dom';
import travelImage from '../images/travel-image.jpeg'; // Ensure this image is high-quality and vibrant

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 text-white text-center p-5">
      {/* Hero Section */}
      <div className="mb-10">
        <h1 className="text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
          Welcome to <span className="text-yellow-300">Jet Set Go!</span>
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Your one-stop solution for all your travel needs. Discover the best flights, hotel bookings, and exclusive travel packages tailored just for you!
        </p>
        <Link to="/flights">
          <button className="px-8 py-3 bg-yellow-500 rounded-lg text-black font-semibold hover:bg-yellow-400 transition duration-300 shadow-lg transform hover:scale-105">
            Search Flights
          </button>
        </Link>
      </div>
      
      {/* Travel Image */}
      <div className="mt-10 mb-10">
        <img src={travelImage} alt="Travel" className="w-full max-w-xl rounded-lg shadow-2xl border-4 border-yellow-500" />
      </div>

      {/* Why Choose Us Section */}
      <h2 className="text-5xl font-semibold mt-10">Why Choose Us?</h2>
      <ul className="list-disc list-inside mt-4 mb-8 text-left mx-auto max-w-2xl text-xl">
        <li className="mt-2">✅ <span className="font-medium">Competitive Pricing</span></li>
        <li className="mt-2">✅ <span className="font-medium">24/7 Customer Support</span></li>
        <li className="mt-2">✅ <span className="font-medium">Easy Booking Process</span></li>
        <li className="mt-2">✅ <span className="font-medium">Exclusive Discounts</span></li>
      </ul>

      {/* Newsletter Section */}
      <h2 className="text-4xl font-semibold mt-10">Join our community of travelers!</h2>
      <p className="mt-4 text-lg">Sign up for our newsletter and receive the latest travel deals and tips directly in your inbox.</p>
      <Link to="/signup">
        <button className="mt-4 px-8 py-3 bg-green-500 rounded-lg text-white font-semibold hover:bg-green-400 transition duration-300 shadow-lg transform hover:scale-105">
          Sign Up
        </button>
      </Link>
    </div>
  );
}
