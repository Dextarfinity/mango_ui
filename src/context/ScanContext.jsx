import React, { createContext, useContext, useState, useEffect } from 'react';
import { getScanHistory, saveScan as saveScanToStorage } from '../utils/mockAPI';

const ScanContext = createContext(null);

export const useScan = () => {
  const context = useContext(ScanContext);
  if (!context) {
    throw new Error('useScan must be used within ScanProvider');
  }
  return context;
};

export const ScanProvider = ({ children }) => {
  const [scanHistory, setScanHistory] = useState([]);
  const [currentScan, setCurrentScan] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load scan history on mount
    loadHistory();
  }, []);

  const loadHistory = () => {
    const history = getScanHistory();
    setScanHistory(history);
  };

  const saveScan = (scanResult) => {
    const savedScan = saveScanToStorage(scanResult);
    setScanHistory(prev => [savedScan, ...prev]);
    setCurrentScan(savedScan);
    return savedScan;
  };

  const getScanById = (id) => {
    return scanHistory.find(scan => scan.id === id);
  };

  const getFilteredScans = (filter) => {
    if (filter === 'all') return scanHistory;
    if (filter === 'healthy') {
      return scanHistory.filter(scan => scan.diseaseId === 'healthy');
    }
    if (filter === 'diseased') {
      return scanHistory.filter(scan => scan.diseaseId !== 'healthy');
    }
    return scanHistory;
  };

  const getStats = () => {
    const total = scanHistory.length;
    const diseased = scanHistory.filter(scan => scan.diseaseId !== 'healthy').length;
    const healthy = scanHistory.filter(scan => scan.diseaseId === 'healthy').length;
    
    return {
      total,
      diseased,
      healthy,
      accuracy: total > 0 ? Math.round((healthy / total) * 100) : 0
    };
  };

  const value = {
    scanHistory,
    currentScan,
    loading,
    setLoading,
    setCurrentScan,
    saveScan,
    getScanById,
    getFilteredScans,
    getStats,
    loadHistory
  };

  return <ScanContext.Provider value={value}>{children}</ScanContext.Provider>;
};
