import React from 'react';
import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex items-center">
              <Link to="/">
                <h1 className="text-white font-bold uppercase"><img src='./images/perago.png' alt='perago' className='w-44 h-12'/></h1>
              </Link>
            </div>
            <div className="hidden md:flex md:items-center md:space-x-6">
              <Link
                to="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-4 rounded-md text-sm font-medium transition duration-300"
              >
                Home
              </Link>
              <Link
                to="/role"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Role
              </Link>
              <Link
                to="/employee"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Employee
              </Link>
              <Link
                to="/about"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                About
              </Link>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="outline-none mobile-menu-button"
              >
                <svg
                  className="w-6 h-6 text-white"
                  x-show="!showMenu"
                  fill="none"
                  stroke="#ffffff"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={`md:hidden ${isOpen ? "flex" : "hidden"} mobile-menu`}>
          <ul className="flex flex-col pt-2 pb-4 space-y-1">
            <li>
              <Link
                to="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/role"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Role
              </Link>
            </li>
            <li>
              <Link
                to="/employee"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Employee
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <Outlet />
    </>
  );
};