import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Managex from './Managex';
import { Link } from 'react-router-dom';
import { ModeToggle } from './ModeToggle';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b dark:bg-gray-900 drop-shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
        <a href="#">
          <img
            src="/logo.png"
            className="h-10 mr-"
            alt="manageX"
          />
        </a>
        <h1 className='font-bold text-[28px]'><Managex/></h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6">
          <NavLink href="/" label="Home" />
          <NavLink href="#" label="Blog" />
          <NavLink href="#" label="About Us" />
          <NavLink href="#" label="Testimonials" />
          <NavLink href="#" label="Contact Us" />
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <Button variant="outline" asChild><Link to={"/login"}>Login</Link></Button>
          <Button variant="default" asChild><Link to={"/signup"}>Sign Up</Link></Button>
          <ModeToggle/>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-gray-500 rounded-lg dark:text-gray-400"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t mt-2 py-2">
          <NavLink href="#" label="Home" />
          <NavLink href="#" label="Blog" />
          <NavLink href="#" label="About Us" />
          <NavLink href="#" label="Testimonials" />
          <NavLink href="#" label="Contact Us" />
          <div className="mt-4 flex flex-col space-y-2">
            <Button variant="outline">Login</Button>
            <Button variant="default">Signup</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

// Reusable NavLink Component
const NavLink: React.FC<{ href: string; label?: string }> = ({ href, label }) => {
  return (
    <a
      href={href}
      className="block font-medium text-[#787575] hover:text-foreground dark:text-gray-400 dark:hover:text-white transition-colors px-4 py-2"
    >
      {label}
    </a>
  );
};

export default Navbar;
