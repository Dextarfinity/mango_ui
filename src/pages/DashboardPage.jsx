import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, TrendingUp, CheckCircle, AlertTriangle, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useScan } from '../context/ScanContext';
import { Button } from '../components/common/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/common/Card';
import { formatDate, getSeverityColor } from '../utils/helpers';
import { diseaseDatabase } from '../utils/mockAPI';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { scanHistory, getStats } = useScan();
  const stats = getStats();

  const recentScans = scanHistory.slice(0, 6);

  const statCards = [
    {
      title: 'Total Scans',
      value: stats.total,
      icon: Camera,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Diseases Found',
      value: stats.diseased,
      icon: AlertTriangle,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Healthy Scans',
      value: stats.healthy,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Health Rate',
      value: `${stats.accuracy}%`,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Monitor your mango trees and keep them healthy
        </p>
      </div>

      {/* Quick Action */}
      <div className="mb-8 animate-slide-up">
        <Card className="bg-gradient-to-r from-leaf-500 to-leaf-600 text-white">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to scan?</h2>
              <p className="text-leaf-50">
                Detect diseases early to protect your harvest
              </p>
            </div>
            <button
              onClick={() => navigate('/scan')}
              className="inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold bg-white text-leaf-600 rounded-lg shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-200 whitespace-nowrap"
            >
              <Camera size={20} />
              Start New Scan
            </button>
          </div>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-slide-up">
        {statCards.map((stat, index) => (
          <Card key={index} className={stat.bgColor}>
            <div className="flex flex-col items-center text-center">
              <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg mb-3`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {stat.title}
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stat.value}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Scans */}
      <div className="animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Recent Scans</h2>
          {scanHistory.length > 0 && (
            <Button
              variant="ghost"
              onClick={() => navigate('/history')}
            >
              View All
            </Button>
          )}
        </div>

        {scanHistory.length === 0 ? (
          <Card className="text-center py-12">
            <Camera className="mx-auto text-gray-300 dark:text-gray-600 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No scans yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start your first scan to monitor your mango trees
            </p>
            <Button
              icon={Camera}
              onClick={() => navigate('/scan')}
            >
              Start First Scan
            </Button>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentScans.map((scan) => {
              const disease = diseaseDatabase[scan.diseaseId];
              return (
                <Card 
                  key={scan.id} 
                  hover
                  onClick={() => navigate(`/results/${scan.id}`)}
                  className="cursor-pointer"
                >
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={scan.image}
                      alt={disease?.disease}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                    {disease?.disease}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className={`px-2 py-1 rounded-full font-medium ${getSeverityColor(disease?.severity)}`}>
                      {disease?.severity}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(scan.date)}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
