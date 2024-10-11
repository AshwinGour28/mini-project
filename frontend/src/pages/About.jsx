import React from 'react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-6">About Jet Set Go</h1>
      <p className="text-lg text-gray-700 mb-4">
        Welcome to Jet Set Go, your premier travel partner dedicated to making your travel dreams come true! Our mission is to provide a seamless and enjoyable experience for all travelers, whether you're flying for business or leisure.
      </p>
      <h2 className="text-3xl font-semibold mt-8 mb-4">Our Vision</h2>
      <p className="text-lg text-gray-700 mb-4">
        At Jet Set Go, we envision a world where travel is accessible, affordable, and enjoyable for everyone. We believe that travel enriches lives, fosters connections, and creates unforgettable memories. Our goal is to make every journey smooth and stress-free.
      </p>
      <h2 className="text-3xl font-semibold mt-8 mb-4">What We Offer</h2>
      <ul className="list-disc list-inside text-lg text-gray-700 mb-4">
        <li>Easy flight bookings at competitive prices</li>
        <li>A user-friendly platform for searching and comparing flights</li>
        <li>Personalized travel recommendations based on your preferences</li>
        <li>24/7 customer support to assist you at any time</li>
        <li>Exclusive deals and discounts for members</li>
      </ul>
      <h2 className="text-3xl font-semibold mt-8 mb-4">Meet Our Team</h2>
      <p className="text-lg text-gray-700 mb-4">
        Our team consists of passionate travel enthusiasts with extensive industry experience. We are committed to providing you with the best travel solutions and exceptional customer service.
      </p>
      <h2 className="text-3xl font-semibold mt-8 mb-4">Get in Touch</h2>
      <p className="text-lg text-gray-700 mb-4">
        Have questions or feedback? We’d love to hear from you! Feel free to reach out to our customer support team via the <a href="/contact" className="text-blue-500 underline">Contact Us</a> page.
      </p>
      <p className="text-lg text-gray-700 mb-4">
        Thank you for choosing Jet Set Go! We look forward to being a part of your next adventure.
      </p>
    </div>
  );
}
