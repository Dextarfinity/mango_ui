import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Home, Camera, History, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const MobileMenu = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="absolute top-0 right-0 w-64 h-full bg-white dark:bg-gray-800 shadow-2xl animate-slide-left transition-colors duration-200">
        <div className="p-4">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X size={24} className="dark:text-gray-300" />
          </button>

          {/* User Info */}
          {user && (
            <div className="mt-12 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-2">{user.avatar}</div>
              <p className="font-semibold text-gray-800 dark:text-gray-100">{user.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-2">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-leaf-50 dark:hover:bg-gray-700 hover:text-leaf-600 dark:hover:text-leaf-400 rounded-lg transition-colors"
                >
                  <Home size={20} />
                  <span className="font-medium">Dashboard</span>
                </Link>
                <Link
                  to="/scan"
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-leaf-50 dark:hover:bg-gray-700 hover:text-leaf-600 dark:hover:text-leaf-400 rounded-lg transition-colors"
                >
                  <Camera size={20} />
                  <span className="font-medium">Scan</span>
                </Link>
                <Link
                  to="/history"
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-leaf-50 dark:hover:bg-gray-700 hover:text-leaf-600 dark:hover:text-leaf-400 rounded-lg transition-colors"
                >
                  <History size={20} />
                  <span className="font-medium">History</span>
                </Link>
                <Link
                  to="/profile"
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-leaf-50 dark:hover:bg-gray-700 hover:text-leaf-600 dark:hover:text-leaf-400 rounded-lg transition-colors"
                >
                  <UserIcon size={20} />
                  <span className="font-medium">Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-leaf-50 dark:hover:bg-gray-700 hover:text-leaf-600 dark:hover:text-leaf-400 rounded-lg transition-colors"
                >
                  <Home size={20} />
                  <span className="font-medium">Home</span>
                </Link>
                <Link
                  to="/login"
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-leaf-50 dark:hover:bg-gray-700 hover:text-leaf-600 dark:hover:text-leaf-400 rounded-lg transition-colors"
                >
                  <UserIcon size={20} />
                  <span className="font-medium">Login</span>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};
