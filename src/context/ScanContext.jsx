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
        // Group scans by image_url and analyzed_at (scans from the same analysis session)
        const groupedScans = {};
        
        result.data.forEach(scan => {
          // Create a unique key for scans that belong together
          // Group by image URL and timestamp (within 1 second)
          const timestamp = new Date(scan.analyzed_at).getTime();
          const groupKey = `${scan.image_url}_${Math.floor(timestamp / 1000)}`;
          
          if (!groupedScans[groupKey]) {
            groupedScans[groupKey] = [];
          }
          groupedScans[groupKey].push(scan);
        });
        
        // Transform grouped scans into app format
        const formattedScans = Object.values(groupedScans).map(scanGroup => {
          // Sort by confidence (highest first)
          scanGroup.sort((a, b) => b.confidence - a.confidence);
          const primaryScan = scanGroup[0];
          
          return {
            id: primaryScan.id,
            diseaseId: primaryScan.disease_id,
            disease: primaryScan.disease_name,
            confidence: primaryScan.confidence,
            severity: primaryScan.severity,
            image: primaryScan.image_url,
            date: new Date(primaryScan.analyzed_at),
            location: primaryScan.location,
            model: {
              name: primaryScan.model_name,
              version: primaryScan.model_version,
              dataset: primaryScan.model_dataset
            },
            allDetections: scanGroup.map(scan => ({
              id: scan.disease_id,
              disease: scan.disease_name,
              confidence: scan.confidence,
              severity: scan.severity,
              description: scan.description || ''
            })),
            scanIds: scanGroup.map(scan => scan.id)
          };
        });
        
        // Sort by date (most recent first)
        formattedScans.sort((a, b) => b.date - a.date);
        
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
        dataset: scanResult.model?.dataset || 'Mango-Leaf-Diseases-v2',
        allDetections: scanResult.allDetections // Pass all detections to be saved
      };

      const result = await saveScanToDb(user.id, scanData);
      
      if (result.success && result.data && result.data.length > 0) {
        // Use the first (primary) detection as the main scan record
        const primaryData = result.data[0];
        
        // Map all saved detections
        const allDetections = result.data.map(detection => ({
          id: detection.disease_id,
          disease: detection.disease_name,
          confidence: detection.confidence,
          severity: detection.severity,
          description: scanResult.allDetections?.find(d => d.id === detection.disease_id)?.description || ''
        }));
        
        const savedScan = {
          id: primaryData.id,
          diseaseId: primaryData.disease_id,
          disease: primaryData.disease_name,
          confidence: primaryData.confidence,
          severity: primaryData.severity,
          image: primaryData.image_url,
          date: new Date(primaryData.analyzed_at),
          location: primaryData.location,
          model: {
            name: primaryData.model_name,
            version: primaryData.model_version,
            dataset: primaryData.model_dataset
          },
          allDetections: allDetections,
          scanIds: result.data.map(d => d.id) // Store all related scan IDs
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
      
      // Get the scan to find all related scan IDs
      const scanToDelete = scanHistory.find(scan => scan.id === scanId);
      
      if (scanToDelete?.scanIds && scanToDelete.scanIds.length > 0) {
        // Delete all related scan records
        console.log(`🗑️ Deleting ${scanToDelete.scanIds.length} related scan record(s)`);
        
        for (const id of scanToDelete.scanIds) {
          await deleteScanFromDb(id);
        }
      } else {
        // If no scanIds array, just delete the primary one
        await deleteScanFromDb(scanId);
      }
      
      setScanHistory(prev => prev.filter(scan => scan.id !== scanId));
      if (currentScan?.id === scanId) {
        setCurrentScan(null);
      }
      
      return { success: true };
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
