import React from 'react';

export const LoadingSkeleton = ({ className = '', variant = 'text' }) => {
  const variants = {
    text: 'h-4 bg-gray-200 dark:bg-gray-700 rounded',
    title: 'h-8 bg-gray-200 dark:bg-gray-700 rounded',
    circle: 'h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full',
    card: 'h-48 bg-gray-200 dark:bg-gray-700 rounded-xl',
    image: 'h-64 bg-gray-200 dark:bg-gray-700 rounded-lg'
  };

  return (
    <div className={`animate-pulse ${variants[variant]} ${className}`} />
  );
};

export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4'
  };

  return (
    <div className={`animate-spin rounded-full border-leaf-600 border-t-transparent ${sizes[size]} ${className}`} />
  );
};

// Mango Leaf Themed Loader
export const MangoLeafLoader = ({ size = 'md', message = 'Loading...' }) => {
  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`relative ${sizes[size]}`}>
        {/* Rotating leaves */}
        <div className="absolute inset-0 animate-spin">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-leaf-500 rounded-full opacity-80 blur-sm"></div>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-6 h-6 bg-leaf-400 rounded-full opacity-60 blur-sm"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-leaf-600 rounded-full opacity-80 blur-sm"></div>
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-6 h-6 bg-leaf-300 rounded-full opacity-60 blur-sm"></div>
        </div>
        
        {/* Center mango icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-gradient-to-br from-mango-400 to-mango-600 rounded-full animate-pulse-slow shadow-lg"></div>
        </div>
      </div>
      
      {message && (
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

// Full Page Loader - takes up entire viewport
export const FullPageLoader = ({ message = 'Loading...', fadeOut = false }) => {
  return (
    <div className={`fixed inset-0 min-h-screen w-full bg-gradient-to-br from-leaf-50 via-white to-mango-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center z-50 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center">
        {/* Main loader animation */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 animate-spin">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4">
              <div className="w-full h-full bg-leaf-500 rounded-full shadow-lg"></div>
            </div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-3 h-3">
              <div className="w-full h-full bg-leaf-400 rounded-full shadow-md"></div>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4">
              <div className="w-full h-full bg-leaf-600 rounded-full shadow-lg"></div>
            </div>
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-3 h-3">
              <div className="w-full h-full bg-leaf-300 rounded-full shadow-md"></div>
            </div>
          </div>
          
          {/* Inner counter-rotating ring */}
          <div className="absolute inset-4 animate-spin-reverse">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3">
              <div className="w-full h-full bg-mango-400 rounded-full shadow-md"></div>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3">
              <div className="w-full h-full bg-mango-500 rounded-full shadow-md"></div>
            </div>
          </div>
          
          {/* Center mango */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-mango-400 via-mango-500 to-mango-600 rounded-full animate-pulse-slow shadow-2xl"></div>
              {/* Inner glow */}
              <div className="absolute inset-2 bg-gradient-to-br from-mango-300 to-mango-500 rounded-full opacity-50"></div>
            </div>
          </div>
        </div>
        
        {/* Loading message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 animate-pulse">
            {message}
          </h2>
          <div className="flex justify-center gap-1">
            <span className="w-2 h-2 bg-leaf-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2 h-2 bg-leaf-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2 h-2 bg-leaf-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline loader for sections
export const InlineLoader = ({ message = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center py-8">
      <MangoLeafLoader size="md" message={message} />
    </div>
  );
};
