import React from 'react';

export const LoadingSkeleton = ({ className = '', variant = 'text' }) => {
  const variants = {
    text: 'h-4 bg-gray-200 rounded',
    title: 'h-8 bg-gray-200 rounded',
    circle: 'h-12 w-12 bg-gray-200 rounded-full',
    card: 'h-48 bg-gray-200 rounded-xl',
    image: 'h-64 bg-gray-200 rounded-lg'
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
