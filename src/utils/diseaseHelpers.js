/**
 * Disease Data Helpers
 * Transforms disease data from database to app format
 */

import { getDiseaseById, getAllDiseases } from './supabase';

// Cache for disease data
let diseasesCache = null;
let diseasesCacheTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get all diseases from database with caching
 */
export const fetchDiseases = async () => {
  const now = Date.now();
  
  // Return cached data if still valid
  if (diseasesCache && diseasesCacheTime && (now - diseasesCacheTime) < CACHE_DURATION) {
    return diseasesCache;
  }
  
  const result = await getAllDiseases();
  
  if (result.success && result.data) {
    // Transform database format to app format
    const transformed = {};
    result.data.forEach(disease => {
      transformed[disease.id] = {
        id: disease.id,
        disease: disease.disease_name,
        description: disease.description,
        severity: disease.severity,
        symptoms: disease.symptoms || [],
        treatments: disease.treatments || [],
        prevention: disease.prevention,
        confidence: 95 // Default confidence, will be overridden by scan results
      };
    });
    
    diseasesCache = transformed;
    diseasesCacheTime = now;
    
    return transformed;
  }
  
  return null;
};

/**
 * Get single disease by ID from database
 */
export const fetchDiseaseById = async (diseaseId) => {
  const result = await getDiseaseById(diseaseId);
  
  if (result.success && result.data) {
    const disease = result.data;
    return {
      id: disease.id,
      disease: disease.disease_name,
      description: disease.description,
      severity: disease.severity,
      symptoms: disease.symptoms || [],
      treatments: disease.treatments || [],
      prevention: disease.prevention,
      confidence: 95
    };
  }
  
  return null;
};

/**
 * Clear disease cache (call when database is updated)
 */
export const clearDiseaseCache = () => {
  diseasesCache = null;
  diseasesCacheTime = null;
};

/**
 * Get disease info with scan-specific confidence
 * Merges database disease info with scan confidence
 */
export const getDiseaseWithConfidence = async (diseaseId, confidence) => {
  const disease = await fetchDiseaseById(diseaseId);
  
  if (disease) {
    return {
      ...disease,
      confidence: confidence || disease.confidence
    };
  }
  
  return null;
};
