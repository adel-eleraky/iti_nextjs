"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Our Website</h1>
          <p className="text-xl mb-8">
            Discover the best products and services tailored just for you.
          </p>
          <Link
            href="/about"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Image */}
          <div className="flex justify-center items-center">
            <img
              src="https://via.placeholder.com/500"
              alt="Placeholder"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Right Column - Text */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="text-gray-600 mb-4">
              We are a team of passionate individuals dedicated to providing the best
              solutions for your needs. Our mission is to make your life easier and
              more enjoyable with our high-quality products and services.
            </p>
            <Link
              href="/about"
              className="text-blue-600 font-semibold hover:text-blue-700 transition-all duration-300"
            >
              Read More →
            </Link>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gray-800 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied customers and experience the difference today.
          </p>
          <Link
            href="/contact"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Footer
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 My Website. All rights reserved.</p>
          <p className="mt-2">
            Made with ❤️ by{" "}
            <a
              href="https://yourwebsite.com"
              className="text-blue-400 hover:text-blue-300"
            >
              Your Name
            </a>
          </p>
        </div>
      </footer> */}
    </div>
  );
}