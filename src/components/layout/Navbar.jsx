import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Menu, User, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const isLanding = location.pathname === '/';

  const handleLogout = async () => {
    await logout();
  };

  const handleThemeToggle = () => {
    console.log('Theme button clicked in Navbar');
    toggleTheme();
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-leaf-500 to-leaf-600 p-2 rounded-lg">
              <Leaf className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-leaf-600 to-mango-600 bg-clip-text text-transparent">
              Scan2Save
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="text-yellow-500" size={20} />
              ) : (
                <Moon className="text-gray-700 dark:text-gray-300" size={20} />
              )}
            </button>

            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 dark:text-gray-200 hover:text-leaf-600 dark:hover:text-leaf-400 font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/scan" 
                  className="text-gray-700 dark:text-gray-300 hover:text-leaf-600 dark:hover:text-leaf-400 font-medium transition-colors"
                >
                  Scan
                </Link>
                <Link 
                  to="/history" 
                  className="text-gray-700 dark:text-gray-300 hover:text-leaf-600 dark:hover:text-leaf-400 font-medium transition-colors"
                >
                  History
                </Link>
                <Link 
                  to="/profile" 
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-leaf-600 dark:hover:text-leaf-400 font-medium transition-colors"
                >
                  <User size={18} />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                {!isLanding && (
                  <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-leaf-600 dark:hover:text-leaf-400 font-medium transition-colors">
                    Home
                  </Link>
                )}
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-leaf-600 dark:text-leaf-400 hover:bg-leaf-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/login?signup=true" 
                  className="px-4 py-2 bg-gradient-to-r from-leaf-600 to-leaf-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="text-yellow-500" size={20} />
              ) : (
                <Moon className="text-gray-700 dark:text-gray-300" size={20} />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={onMenuClick}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Menu size={24} className="dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
