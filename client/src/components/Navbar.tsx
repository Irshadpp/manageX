import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo or Brand Name */}
        <div className="text-xl font-bold">
          <Link to="/">Brand</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link to="/" className="text-gray-500 hover:text-gray-800">
            Home
          </Link>
          <Link to="/testimonies" className="text-gray-500 hover:text-gray-800">
            Testimonies
          </Link>
          <Link to="/contact" className="text-gray-500 hover:text-gray-800">
            Contact Us
          </Link>
          <Link to="/blog" className="text-gray-500 hover:text-gray-800">
            Blog
          </Link>
          <Link to="/about" className="text-gray-500 hover:text-gray-800">
            About Us
          </Link>
          <Link to="/login" className="text-gray-500 hover:text-gray-800">
            Login
          </Link>
        </div>

        {/* Sign Up Button */}
        <div>
          <Link
            to="/signup"
            className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
