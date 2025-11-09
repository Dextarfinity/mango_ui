/**
 * Usage Examples - YOLOv8 Model Integration
 * 
 * This file demonstrates how to use the integrated YOLOv8 model
 * in various components throughout the application.
 */

// ============================================
// Example 1: Display Model Status
// ============================================

import { useScan } from '../context/ScanContext';

export const ModelStatus = () => {
  const { model, modelLoading, modelError } = useScan();

  if (modelLoading) {
    return <div className="text-blue-600">🤖 Loading YOLOv8 model...</div>;
  }

  if (modelError) {
    return <div className="text-red-600">❌ Model Error: {modelError}</div>;
  }

  if (model) {
    return (
      <div className="text-green-600">
        <p>✅ Model Ready: {model.modelName}</p>
        <p>📦 Path: {model.path}</p>
      </div>
    );
  }

  return null;
};


// ============================================
// Example 2: Use Model Info in Results Display
// ============================================

import { useParams } from 'react-router-dom';
import { useScan } from '../context/ScanContext';

export const ResultsDisplay = () => {
  const { id } = useParams();
  const { getScanById } = useScan();
  
  const scan = getScanById(id);

  if (!scan) return <div>Loading...</div>;

  return (
    <div>
      <h2>Disease Analysis Results</h2>
      
      {/* Disease Information */}
      <div className="disease-info">
        <h3>{scan.disease}</h3>
        <p>Confidence: {scan.confidence}%</p>
      </div>

      {/* Model Information */}
      {scan.model && (
        <div className="model-info bg-gray-100 p-4 rounded">
          <h4>Analysis Model Information</h4>
          <p><strong>Model:</strong> {scan.model.name}</p>
          <p><strong>Version:</strong> {scan.model.version}</p>
          <p><strong>Dataset:</strong> {scan.model.dataset}</p>
          <p><strong>Classes:</strong> {scan.model.classes.join(', ')}</p>
        </div>
      )}

      {/* Analysis Timestamp */}
      {scan.analyzedAt && (
        <p className="text-gray-600">
          Analyzed: {new Date(scan.analyzedAt).toLocaleString()}
        </p>
      )}
    </div>
  );
};


// ============================================
// Example 3: Monitor Model Loading During Scan
// ============================================

import { useState } from 'react';
import { useScan } from '../context/ScanContext';
import { analyzeImage } from '../utils/mockAPI';

export const ScanWithModelMonitoring = () => {
  const { model, modelLoading, modelError, saveScan, setLoading } = useScan();
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = async (imageData) => {
    if (!model && !modelLoading) {
      alert('Model not ready. Please wait...');
      return;
    }

    setAnalyzing(true);
    setLoading(true);

    try {
      console.log('📊 Using Model:', model.modelName);
      const result = await analyzeImage(imageData);
      
      console.log('🎯 Model Metadata:', result.model);
      console.log('📈 Confidence:', result.confidence);
      console.log('🏷️  Disease:', result.disease);
      
      saveScan(result);
      
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setAnalyzing(false);
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Scan Analysis</h3>
      
      {modelError && (
        <div className="error-banner">
          Warning: {modelError}
        </div>
      )}

      {modelLoading && (
        <div className="loading-banner">
          🤖 Initializing AI Model...
        </div>
      )}

      {model && !modelLoading && (
        <div className="success-banner">
          ✅ Using {model.modelName}
        </div>
      )}

      <button 
        onClick={() => handleAnalyze(imageData)}
        disabled={!model || analyzing}
      >
        {analyzing ? 'Analyzing...' : 'Analyze with AI'}
      </button>
    </div>
  );
};


// ============================================
// Example 4: Display Model Statistics
// ============================================

import { useScan } from '../context/ScanContext';

export const ModelStatistics = () => {
  const { model, scanHistory } = useScan();

  if (!model) return <div>Model not initialized</div>;

  const stats = {
    totalScans: scanHistory.length,
    scansWithModel: scanHistory.filter(s => s.model).length,
    averageConfidence: Math.round(
      scanHistory.reduce((sum, s) => sum + (s.confidence || 0), 0) / 
      Math.max(scanHistory.length, 1)
    )
  };

  return (
    <div className="stats-panel">
      <h3>Model Statistics</h3>
      
      <div className="stat-item">
        <label>Model Name:</label>
        <span>{model.modelName}</span>
      </div>

      <div className="stat-item">
        <label>Model Version:</label>
        <span>{model.version}</span>
      </div>

      <div className="stat-item">
        <label>Supported Classes:</label>
        <span>{model.classes?.length}</span>
      </div>

      <div className="stat-item">
        <label>Total Scans:</label>
        <span>{stats.totalScans}</span>
      </div>

      <div className="stat-item">
        <label>Scans Using Model:</label>
        <span>{stats.scansWithModel}</span>
      </div>

      <div className="stat-item">
        <label>Average Confidence:</label>
        <span>{stats.averageConfidence}%</span>
      </div>

      <div className="stat-item">
        <label>Model Path:</label>
        <code>{model.path}</code>
      </div>

      <div className="stat-item">
        <label>Input Size:</label>
        <span>640x640</span>
      </div>

      <div className="stat-item">
        <label>Confidence Threshold:</label>
        <span>0.5</span>
      </div>
    </div>
  );
};


// ============================================
// Example 5: Error Boundary for Model Issues
// ============================================

import React, { useState, useEffect } from 'react';
import { useScan } from '../context/ScanContext';

export const ModelErrorBoundary = ({ children }) => {
  const { modelError, initializeModel } = useScan();
  const [showRetry, setShowRetry] = useState(false);

  useEffect(() => {
    if (modelError) {
      setShowRetry(true);
    }
  }, [modelError]);

  if (modelError) {
    return (
      <div className="error-boundary">
        <div className="error-icon">⚠️</div>
        <h3>Model Error</h3>
        <p>{modelError}</p>
        
        {showRetry && (
          <button onClick={() => initializeModel()}>
            🔄 Retry Model Initialization
          </button>
        )}

        <details>
          <summary>Technical Details</summary>
          <p className="technical-info">
            The YOLOv8 model failed to initialize.
            Please ensure the model file is available at /yolov8s.pt
          </p>
        </details>
      </div>
    );
  }

  return children;
};


// ============================================
// Example 6: Class Information Display
// ============================================

import { useScan } from '../context/ScanContext';

export const ClassInformation = () => {
  const { model } = useScan();

  if (!model || !model.classes) return null;

  const classDescriptions = {
    'Die Back': {
      description: 'Fungal disease causing branch death and tree decline',
      severity: 'High',
      color: 'red'
    },
    'Healthy': {
      description: 'Leaf is healthy with no visible disease',
      severity: 'None',
      color: 'green'
    },
    'Powder Mildew': {
      description: 'Fungal disease with white powder-like coating',
      severity: 'Low',
      color: 'yellow'
    }
  };

  return (
    <div className="class-info">
      <h3>Disease Classes Detected By Model</h3>
      
      <div className="classes-grid">
        {model.classes.map((className, index) => {
          const info = classDescriptions[className];
          return (
            <div key={index} className={`class-card severity-${info.color}`}>
              <h4>{className}</h4>
              <p>{info.description}</p>
              <p className="severity">
                <strong>Severity:</strong> {info.severity}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};


// ============================================
// Example 7: Detailed Model Info Component
// ============================================

export const DetailedModelInfo = () => {
  const { model, modelLoading } = useScan();

  if (modelLoading) {
    return <div>Loading model information...</div>;
  }

  if (!model) {
    return <div>Model information not available</div>;
  }

  return (
    <div className="model-details">
      <h2>🤖 YOLOv8 Model Information</h2>
      
      <section>
        <h3>Model Specifications</h3>
        <ul>
          <li><strong>Name:</strong> {model.modelName}</li>
          <li><strong>Version:</strong> YOLOv8{model.version}</li>
          <li><strong>File Path:</strong> <code>{model.path}</code></li>
          <li><strong>Training Dataset:</strong> {model.dataset}</li>
          <li><strong>Input Resolution:</strong> 640x640 pixels</li>
          <li><strong>Confidence Threshold:</strong> 0.5</li>
          <li><strong>IOU Threshold:</strong> 0.45</li>
        </ul>
      </section>

      <section>
        <h3>Detectable Classes ({model.classes?.length})</h3>
        <ol>
          {model.classes?.map((cls, i) => (
            <li key={i}>{cls}</li>
          ))}
        </ol>
      </section>

      <section>
        <h3>Status</h3>
        <p>✅ Model Ready for Inference</p>
        <p>📍 Location: {model.path}</p>
        <p>🎯 Purpose: Mango Leaf Disease Detection</p>
      </section>
    </div>
  );
};


// ============================================
// Export all examples
// ============================================

export {
  ModelStatus,
  ResultsDisplay,
  ScanWithModelMonitoring,
  ModelStatistics,
  ModelErrorBoundary,
  ClassInformation,
  DetailedModelInfo
};
