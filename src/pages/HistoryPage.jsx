import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Calendar, Search, AlertTriangle } from 'lucide-react';
import { useScan } from '../context/ScanContext';
import { useTranslation } from '../hooks/useTranslation';
import { fetchDiseases } from '../utils/diseaseHelpers';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { formatDate, getSeverityColor } from '../utils/helpers';

export const HistoryPage = () => {
  const navigate = useNavigate();
  const { scanHistory, getFilteredScans } = useScan();
  const { ts } = useTranslation();
  const tx = ts('history');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [diseases, setDiseases] = useState({});
  const [loadingDiseases, setLoadingDiseases] = useState(true);

  // Fetch disease data from database
  useEffect(() => {
    const loadDiseases = async () => {
      try {
        setLoadingDiseases(true);
        const diseaseData = await fetchDiseases();
        if (diseaseData) {
          setDiseases(diseaseData);
        }
      } catch (error) {
        console.error('Error loading diseases:', error);
      } finally {
        setLoadingDiseases(false);
      }
    };

    loadDiseases();
  }, []);

  const filteredScans = getFilteredScans(filter);

  // Apply search filter
  const searchedScans = filteredScans.filter(scan => {
    const disease = diseases[scan.diseaseId];
    return disease?.disease.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filterOptions = [
    { value: 'all', label: tx.allScans, count: scanHistory.length },
    { value: 'diseased', label: tx.diseased, count: getFilteredScans('diseased').length },
    { value: 'healthy', label: tx.healthy, count: getFilteredScans('healthy').length }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          {tx.title}
        </h1>
        <p className="text-lg text-gray-600">
          {tx.subtitle}
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 space-y-4 animate-slide-up">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {filterOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`
                px-4 py-2 rounded-lg font-medium transition-all
                ${filter === option.value
                  ? 'bg-leaf-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }
              `}
            >
              {option.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-sm ${filter === option.value ? 'bg-white bg-opacity-20' : 'bg-gray-100'}`}>
                {option.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={tx.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Results */}
      {searchedScans.length === 0 ? (
        <Card className="text-center py-12 animate-slide-up">
          <AlertTriangle className="mx-auto text-gray-300 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            {scanHistory.length === 0 ? tx.noScansYet : tx.noScansFound}
          </h2>
          <p className="text-gray-600 mb-6">
            {scanHistory.length === 0
              ? tx.noScansDescription
              : tx.adjustFilters
            }
          </p>
          {scanHistory.length === 0 && (
            <Button onClick={() => navigate('/scan')}>
              {tx.startFirstScan}
            </Button>
          )}
        </Card>
      ) : (
        <>
          {/* Stats Summary */}
          <div className="mb-6 p-4 bg-leaf-50 rounded-lg border border-leaf-200 animate-slide-up">
            <p className="text-sm text-leaf-800">
              {tx.showing} <strong>{searchedScans.length}</strong> {tx.of} <strong>{scanHistory.length}</strong> {tx.totalScans}
            </p>
          </div>

          {/* Scan Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-up">
            {searchedScans.map((scan) => {
              const disease = diseases[scan.diseaseId];
              
              // Show loading state if diseases haven't loaded yet
              if (loadingDiseases || !disease) {
                return (
                  <Card key={scan.id} className="animate-pulse">
                    <div className="aspect-video bg-gray-300 rounded-lg mb-4"></div>
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </Card>
                );
              }

              return (
                <Card
                  key={scan.id}
                  hover
                  onClick={() => navigate(`/results/${scan.id}`)}
                  className="cursor-pointer"
                >
                  {/* Image */}
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={scan.image}
                      alt={disease.disease}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Disease Name */}
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {disease.disease}
                  </h3>

                  {/* Confidence */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>{tx.confidence}</span>
                      <span className="font-semibold">{scan.confidence}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-leaf-500"
                        style={{ width: `${scan.confidence}%` }}
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-sm">
                    <span className={`px-2 py-1 rounded-full font-medium ${getSeverityColor(disease.severity)}`}>
                      {disease.severity}
                    </span>
                    <span className="text-gray-500 flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(scan.date)}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
