"use client";

import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Calendar,
  User,
  Home,
  LogIn,
  Layout,
  ListChecks,
  Menu,
  X,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "../contex/ThemeContex"; // Import the theme context

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme(); // Use the theme context
  const isDark = theme === "dark";

  useEffect(() => {
    // Check if user is logged in on component mount
    const loggedIn = localStorage.getItem("isLoggedIn");
    const signupData = JSON.parse(localStorage.getItem("signupData"));
    if (loggedIn) {
      setIsLoggedIn(true);
      setUserData(signupData);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Clear login state and user data
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("signupData");
    setIsLoggedIn(false);
    setUserData(null);
    navigate("/login"); // Redirect to login
    if (isMenuOpen) {
      setIsMenuOpen(false); // Close mobile menu
    }
  };

  return (
    <nav className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-sm sticky top-0 z-50 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Calendar className={`h-8 w-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            <span className={`ml-2 text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              MediBooker
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `flex items-center ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} font-bold px-3 py-2 rounded-md text-sm`
                  : `flex items-center ${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} px-3 py-2 rounded-md text-sm`
              }
            >
              <Home className="h-4 w-4 mr-1" />
              Home
            </NavLink>

            <NavLink
              to="/doctor-profile"
              className={({ isActive }) =>
                isActive
                  ? `flex items-center ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} font-bold px-3 py-2 rounded-md text-sm`
                  : `flex items-center ${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} px-3 py-2 rounded-md text-sm`
              }
            >
              <User className="h-4 w-4 mr-1" />
              Doctor Profile
            </NavLink>

            <NavLink
              to="/appointments"
              className={({ isActive }) =>
                isActive
                  ? `flex items-center ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} font-bold px-3 py-2 rounded-md text-sm`
                  : `flex items-center ${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} px-3 py-2 rounded-md text-sm`
              }
            >
              <ListChecks className="h-4 w-4 mr-1" />
              Appointments
            </NavLink>

            {/* Theme toggle button */}
            <button
              onClick={toggleTheme}
              className={`flex items-center ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${isDark ? 'focus:ring-gray-600' : 'focus:ring-gray-300'}`}
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>

            <div className="flex items-center ml-4 space-x-3">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className={`flex items-center ${isDark ? 'bg-red-700 hover:bg-red-800' : 'bg-red-600 hover:bg-red-700'} text-white font-semibold py-2 px-4 border border-transparent rounded-md shadow-sm text-sm`}
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? `flex items-center ${isDark ? 'bg-gray-700 text-gray-200' : 'bg-blue-50 text-gray-800'} ${isDark ? 'hover:bg-gray-600' : 'hover:bg-blue-100'} font-semibold py-2 px-4 border ${isDark ? 'border-gray-600' : 'border-gray-300'} rounded-md shadow-sm text-sm`
                        : `flex items-center ${isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} font-semibold py-2 px-4 border ${isDark ? 'border-gray-700' : 'border-gray-300'} rounded-md shadow-sm text-sm`
                    }
                  >
                    <LogIn className="h-4 w-4 mr-1" />
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive
                        ? `${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-700 hover:bg-blue-800'} text-white font-semibold py-2 px-4 border border-transparent rounded-md shadow-sm text-sm`
                        : `${isDark ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold py-2 px-4 border border-transparent rounded-md shadow-sm text-sm`
                    }
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme toggle button for mobile */}
            <button
              onClick={toggleTheme}
              className={`flex items-center ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} p-2 rounded-full focus:outline-none`}
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>
            
            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'} focus:outline-none`}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `flex items-center ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} font-bold px-3 py-2 rounded-md text-base`
                  : `flex items-center ${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} px-3 py-2 rounded-md text-base`
              }
            >
              <Home className="h-5 w-5 mr-2" />
              Home
            </NavLink>
            <NavLink
              to="/doctor-profile"
              className={({ isActive }) =>
                isActive
                  ? `flex items-center ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} font-bold px-3 py-2 rounded-md text-base`
                  : `flex items-center ${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} px-3 py-2 rounded-md text-base`
              }
            >
              <User className="h-5 w-5 mr-2" />
              Doctor Profile
            </NavLink>
            <NavLink
              to="/appointments"
              className={({ isActive }) =>
                isActive
                  ? `flex items-center ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} font-bold px-3 py-2 rounded-md text-base`
                  : `flex items-center ${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} px-3 py-2 rounded-md text-base`
              }
            >
              <Layout className="h-5 w-5 mr-2" />
              Appointments
            </NavLink>
            <div className="flex flex-col space-y-2 pt-2">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className={`flex items-center justify-center ${isDark ? 'bg-red-700 hover:bg-red-800' : 'bg-red-600 hover:bg-red-700'} text-white font-semibold py-2 px-4 border border-transparent rounded-md shadow-sm text-base`}
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? `flex items-center justify-center ${isDark ? 'bg-gray-700 text-gray-200' : 'bg-blue-50 text-gray-800'} ${isDark ? 'hover:bg-gray-600' : 'hover:bg-blue-100'} font-semibold py-2 px-4 border ${isDark ? 'border-gray-600' : 'border-gray-300'} rounded-md shadow-sm text-base`
                        : `flex items-center justify-center ${isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} font-semibold py-2 px-4 border ${isDark ? 'border-gray-700' : 'border-gray-300'} rounded-md shadow-sm text-base`
                    }
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive
                        ? `flex items-center justify-center ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-700 hover:bg-blue-800'} text-white font-semibold py-2 px-4 border border-transparent rounded-md shadow-sm text-base`
                        : `flex items-center justify-center ${isDark ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold py-2 px-4 border border-transparent rounded-md shadow-sm text-base`
                    }
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;