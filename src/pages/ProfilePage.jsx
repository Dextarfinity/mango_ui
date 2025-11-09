import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, LogOut, Camera, Award, TrendingUp, Globe, Bell, Moon, Sun } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useScan } from '../context/ScanContext';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from '../hooks/useTranslation';
import { Button } from '../components/common/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/common/Card';
import { Modal } from '../components/common/Modal';
import { avatarOptions } from '../utils/mockAPI';
import { getAccountAge } from '../utils/helpers';
import { showToast } from '../components/common/Toast';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();
  const { getStats } = useScan();
  const { isDark, toggleTheme } = useTheme();
  const { ts } = useTranslation();
  const tx = ts('profile');
  const stats = getStats();

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [language, setLanguage] = useState(user?.language || 'en');
  const [notifications, setNotifications] = useState(user?.notifications ?? true);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleAvatarSelect = (avatar) => {
    updateProfile({ avatar: avatar.emoji });
    setIsAvatarModalOpen(false);
    showToast(tx.avatarUpdated, 'success');
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    updateProfile({ language: newLang });
    showToast(tx.languageUpdated, 'success');
    
    // Reload page after a short delay to apply language changes
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleNotificationsToggle = () => {
    const newValue = !notifications;
    setNotifications(newValue);
    updateProfile({ notifications: newValue });
    showToast(newValue ? tx.notificationsEnabled : tx.notificationsDisabled, 'success');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
    showToast(tx.loggedOut, 'success');
  };

  const userStats = [
    {
      icon: Camera,
      label: tx.totalScans,
      value: stats.total,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Award,
      label: tx.healthRate,
      value: `${stats.accuracy}%`,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: TrendingUp,
      label: tx.diseasesDetected,
      value: stats.diseased,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: Calendar,
      label: tx.accountAge,
      value: getAccountAge(user.joinDate),
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          {tx.title}
        </h1>
        <p className="text-lg text-gray-600">
          {tx.subtitle}
        </p>
      </div>

      <div className="space-y-6">
        {/* User Info Card */}
        <Card className="animate-slide-up">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <button
              onClick={() => setIsAvatarModalOpen(true)}
              className="group relative"
            >
              <div className="text-8xl mb-2 group-hover:scale-110 transition-transform">
                {user.avatar}
              </div>
              <span className="text-sm text-leaf-600 font-medium group-hover:underline">
                {tx.changeAvatar}
              </span>
            </button>

            {/* User Details */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {user.name}
              </h2>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <Mail size={18} />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <Calendar size={18} />
                  <span>
                    Joined {new Date(user.joinDate).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up">
          {userStats.map((stat, index) => (
            <Card key={index} className={stat.bgColor}>
              <div className="flex flex-col items-center text-center">
                <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg mb-3`}>
                  <stat.icon className="text-white" size={24} />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-gray-600">
                  {stat.label}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Settings */}
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle>{tx.settings}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Language Preference */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Globe size={18} />
                  {tx.languagePreference}
                </label>
                <select
                  value={language}
                  onChange={handleLanguageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-500 focus:border-transparent"
                >
                  <option value="en">{tx.english}</option>
                  <option value="fil">{tx.filipino}</option>
                </select>
              </div>

              {/* Notifications Toggle */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Bell size={18} />
                    {tx.notifications}
                  </label>
                  <button
                    onClick={handleNotificationsToggle}
                    className={`
                      relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                      ${notifications ? 'bg-leaf-600' : 'bg-gray-300 dark:bg-gray-600'}
                    `}
                  >
                    <span
                      className={`
                        inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${notifications ? 'translate-x-6' : 'translate-x-1'}
                      `}
                    />
                  </button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {tx.notificationsDesc}
                </p>
              </div>

              {/* Dark Mode Toggle */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {isDark ? <Moon size={18} /> : <Sun size={18} />}
                    {tx.darkMode}
                  </label>
                  <button
                    onClick={toggleTheme}
                    className={`
                      relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                      ${isDark ? 'bg-leaf-600' : 'bg-gray-300'}
                    `}
                  >
                    <span
                      className={`
                        inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${isDark ? 'translate-x-6' : 'translate-x-1'}
                      `}
                    />
                  </button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {tx.darkModeDesc}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="bg-red-50 border-red-200 animate-slide-up">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-red-900 mb-1">
                {tx.signOut}
              </h3>
              <p className="text-sm text-red-700">
                {tx.signOutDesc}
              </p>
            </div>
            <Button
              variant="danger"
              icon={LogOut}
              onClick={handleLogout}
            >
              {tx.logout}
            </Button>
          </div>
        </Card>
      </div>

      {/* Avatar Selection Modal */}
      <Modal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        title={tx.chooseAvatar}
        size="md"
      >
        <div className="grid grid-cols-4 gap-4">
          {avatarOptions.map(avatar => (
            <button
              key={avatar.id}
              onClick={() => handleAvatarSelect(avatar)}
              className={`
                p-4 rounded-lg border-2 transition-all hover:scale-110
                ${user.avatar === avatar.emoji
                  ? 'border-leaf-600 bg-leaf-50'
                  : 'border-gray-200 hover:border-leaf-300'
                }
              `}
            >
              <div className="text-4xl mb-1">{avatar.emoji}</div>
              <p className="text-xs text-gray-600">{avatar.label}</p>
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
};
