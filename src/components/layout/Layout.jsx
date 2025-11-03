import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { BottomNav } from './BottomNav';
import { MobileMenu } from './MobileMenu';
import { useAuth } from '../../context/AuthContext';

export const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-leaf-50 via-white to-mango-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      <Navbar onMenuClick={() => setIsMobileMenuOpen(true)} />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      
      <main className={user ? 'pb-20 md:pb-8' : 'pb-8'}>
        {children}
      </main>
      
      {user && <BottomNav />}
    </div>
  );
};
