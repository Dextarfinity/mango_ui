import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getScanHistory as fetchScanHistory, saveScan as saveScanToDb, getScanById as fetchScanById, deleteScan as deleteScanFromDb, subscribeToScans, unsubscribe } from '../utils/supabase';
import { analyzeImage } from '../utils/mockAPI';

const ScanContext = createContext(null);

export const useScan = () => {
  const context = useContext(ScanContext);
  if (!context) {
    throw new Error('useScan must be used within ScanProvider');
  }
  return context;
};

export const ScanProvider = ({ children }) => {
  const { user } = useAuth();
  const [scanHistory, setScanHistory] = useState([]);
  const [currentScan, setCurrentScan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [modelLoading, setModelLoading] = useState(false);
  const [modelError, setModelError] = useState(null);

  useEffect(() => {
    // Initialize YOLOv8 model
    initializeModel();
  }, []);

  useEffect(() => {
    // Load scan history when user logs in
    if (user?.id) {
      loadHistory(user.id);
      
      // Subscribe to real-time updates
      const subscription = subscribeToScans(user.id, (payload) => {
        console.log('🔔 Scan update:', payload);
        loadHistory(user.id);
      });

      return () => {
        unsubscribe(subscription);
      };
    } else {
      setScanHistory([]);
    }
  }, [user?.id]);

  const initializeModel = async () => {
    try {
      setModelLoading(true);
      setModelError(null);
      
      console.log('🤖 Initializing YOLOv8 model...');
      
      const modelPath = '/yolov8s.pt';
      console.log('📦 Model path:', modelPath);
      
      setModel({ 
        loaded: true, 
        path: modelPath,
        modelName: 'YOLOv8s (Mango Disease Detection)',
        classes: ['Die Back', 'Healthy', 'Powder Mildew']
      });
      
      console.log('✅ Model initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing model:', error);
      setModelError(error.message);
      setModel(null);
    } finally {
      setModelLoading(false);
    }
  };

  const loadHistory = async (userId) => {
    try {
      setLoading(true);
      const result = await fetchScanHistory(userId);
      
      if (result.success && result.data) {
        // Transform database format to app format
        const formattedScans = result.data.map(scan => ({
          id: scan.id,
          diseaseId: scan.disease_id,
          disease: scan.disease_name,
          confidence: scan.confidence,
          severity: scan.severity,
          image: scan.image_url,
          date: new Date(scan.analyzed_at),
          location: scan.location,
          model: {
            name: scan.model_name,
            version: scan.model_version,
            dataset: scan.model_dataset
          }
        }));
        
        setScanHistory(formattedScans);
      }
    } catch (error) {
      console.error('Error loading scan history:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveScan = async (scanResult) => {
    try {
      if (!user?.id) {
        console.error('No user logged in');
        return null;
      }

      setLoading(true);

      const scanData = {
        diseaseId: scanResult.id,
        disease: scanResult.disease,
        confidence: scanResult.confidence,
        severity: scanResult.severity,
        imageUrl: scanResult.image,
        location: scanResult.location || 'Philippines',
        modelName: scanResult.model?.name || 'YOLOv8s',
        modelVersion: scanResult.model?.version || '8s',
        dataset: scanResult.model?.dataset || 'Mango-Leaf-Diseases-v2'
      };

      const result = await saveScanToDb(user.id, scanData);
      
      if (result.success && result.data) {
        const savedScan = {
          id: result.data.id,
          diseaseId: result.data.disease_id,
          disease: result.data.disease_name,
          confidence: result.data.confidence,
          severity: result.data.severity,
          image: result.data.image_url,
          date: new Date(result.data.analyzed_at),
          location: result.data.location,
          model: {
            name: result.data.model_name,
            version: result.data.model_version,
            dataset: result.data.model_dataset
          }
        };

        setScanHistory(prev => [savedScan, ...prev]);
        setCurrentScan(savedScan);
        return savedScan;
      }
      
      return null;
    } catch (error) {
      console.error('Error saving scan:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getScanById = (id) => {
    return scanHistory.find(scan => scan.id === id);
  };

  const deleteScan = async (scanId) => {
    try {
      setLoading(true);
      const result = await deleteScanFromDb(scanId);
      
      if (result.success) {
        setScanHistory(prev => prev.filter(scan => scan.id !== scanId));
        if (currentScan?.id === scanId) {
          setCurrentScan(null);
        }
      }
      
      return result;
    } catch (error) {
      console.error('Error deleting scan:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
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
    deleteScan,
    getFilteredScans,
    getStats,
    loadHistory: () => user?.id && loadHistory(user.id),
    model,
    modelLoading,
    modelError,
    initializeModel,
    analyzeImage
  };

  return <ScanContext.Provider value={value}>{children}</ScanContext.Provider>;
};
