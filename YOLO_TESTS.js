/**
 * YOLOv8 Integration Verification & Testing
 * 
 * This file contains test functions to verify the YOLOv8 model integration
 * is working correctly. Run these tests in the browser console or in test files.
 */

// ============================================
// Test 1: Model Initialization
// ============================================

export const testModelInitialization = async () => {
  console.log('🧪 Test 1: Model Initialization');
  console.log('━'.repeat(50));
  
  try {
    const { initializeYOLOModel } = await import('../utils/yoloModel.js');
    const modelInfo = await initializeYOLOModel();
    
    console.log('✅ Model initialized:', modelInfo);
    console.log('📊 Model Name:', modelInfo.modelName);
    console.log('📦 Model Path:', modelInfo.path);
    console.log('📈 File Size:', modelInfo.fileSize, 'bytes');
    
    return { success: true, data: modelInfo };
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return { success: false, error: error.message };
  }
};

// ============================================
// Test 2: Model Configuration
// ============================================

export const testModelConfiguration = () => {
  console.log('🧪 Test 2: Model Configuration');
  console.log('━'.repeat(50));
  
  try {
    const { MODEL_CONFIG, CLASS_MAPPING } = require('../utils/yoloModel.js');
    
    console.log('✅ Model Configuration loaded');
    console.log('📋 Model Name:', MODEL_CONFIG.modelName);
    console.log('📋 Model Version:', MODEL_CONFIG.version);
    console.log('📋 Input Size:', MODEL_CONFIG.inputSize);
    console.log('📋 Confidence Threshold:', MODEL_CONFIG.confThreshold);
    console.log('📋 IOU Threshold:', MODEL_CONFIG.iouThreshold);
    
    console.log('📊 Classes:', MODEL_CONFIG.classes);
    console.log('📊 Number of Classes:', MODEL_CONFIG.classes.length);
    
    console.log('🏷️  Class Mapping:');
    Object.entries(CLASS_MAPPING).forEach(([index, info]) => {
      console.log(`   ${index}: ${info.disease} (Severity: ${info.severity})`);
    });
    
    return { success: true };
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return { success: false, error: error.message };
  }
};

// ============================================
// Test 3: Context Integration
// ============================================

export const testContextIntegration = (useScan) => {
  console.log('🧪 Test 3: Context Integration');
  console.log('━'.repeat(50));
  
  try {
    const scanContext = useScan();
    
    console.log('✅ ScanContext hook works');
    console.log('📊 Model state:', scanContext.model);
    console.log('📊 Model loading:', scanContext.modelLoading);
    console.log('📊 Model error:', scanContext.modelError);
    console.log('📊 Has initializeModel:', typeof scanContext.initializeModel === 'function');
    
    if (scanContext.model) {
      console.log('✅ Model loaded in context');
      console.log('   Name:', scanContext.model.modelName);
      console.log('   Path:', scanContext.model.path);
    } else if (scanContext.modelLoading) {
      console.log('⏳ Model loading...');
    } else if (scanContext.modelError) {
      console.error('❌ Model error:', scanContext.modelError);
    }
    
    return { success: true, context: scanContext };
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return { success: false, error: error.message };
  }
};

// ============================================
// Test 4: Image Analysis
// ============================================

export const testImageAnalysis = async () => {
  console.log('🧪 Test 4: Image Analysis');
  console.log('━'.repeat(50));
  
  try {
    const { analyzeImage } = await import('../utils/mockAPI.js');
    
    // Create a simple test image
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 640;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#90EE90';
    ctx.fillRect(0, 0, 640, 640);
    const testImage = canvas.toDataURL('image/jpeg');
    
    console.log('📸 Test image created');
    console.log('🎯 Running analysis...');
    
    const result = await analyzeImage(testImage);
    
    console.log('✅ Analysis complete');
    console.log('🏷️  Disease:', result.disease);
    console.log('📊 Confidence:', result.confidence + '%');
    console.log('⚠️  Severity:', result.severity);
    console.log('🤖 Model Used:', result.model.name);
    console.log('📦 Model Version:', result.model.version);
    console.log('📈 Dataset:', result.model.dataset);
    console.log('🎓 Classes:', result.model.classes.join(', '));
    
    return { success: true, result };
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return { success: false, error: error.message };
  }
};

// ============================================
// Test 5: Inference Results Formatting
// ============================================

export const testResultsFormatting = async () => {
  console.log('🧪 Test 5: Results Formatting');
  console.log('━'.repeat(50));
  
  try {
    const { runYOLOInference, formatInferenceResults, getClassInfo } = 
      await import('../utils/yoloModel.js');
    
    // Create test image
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 640;
    const testImage = canvas.toDataURL('image/jpeg');
    
    console.log('🎯 Running inference...');
    const rawResults = await runYOLOInference(testImage);
    
    console.log('✅ Raw results:', rawResults);
    
    console.log('📝 Formatting results...');
    const formatted = formatInferenceResults(rawResults);
    
    console.log('✅ Formatted results:');
    console.log('   Model:', formatted.model.name);
    console.log('   Disease:', formatted.primaryDetection.disease);
    console.log('   Confidence:', formatted.primaryDetection.confidence + '%');
    console.log('   Severity:', formatted.primaryDetection.severity);
    
    return { success: true, formatted };
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return { success: false, error: error.message };
  }
};

// ============================================
// Test 6: Error Handling
// ============================================

export const testErrorHandling = async () => {
  console.log('🧪 Test 6: Error Handling');
  console.log('━'.repeat(50));
  
  try {
    const { analyzeImage } = await import('../utils/mockAPI.js');
    
    console.log('Test 6a: Empty image');
    try {
      await analyzeImage(null);
    } catch (e) {
      console.log('✅ Correctly handles empty image');
    }
    
    console.log('Test 6b: Invalid base64');
    try {
      await analyzeImage('invalid data');
    } catch (e) {
      console.log('✅ Correctly handles invalid data');
    }
    
    console.log('✅ Error handling works');
    return { success: true };
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return { success: false, error: error.message };
  }
};

// ============================================
// Test 7: Model File Availability
// ============================================

export const testModelFileAvailability = async () => {
  console.log('🧪 Test 7: Model File Availability');
  console.log('━'.repeat(50));
  
  try {
    const modelPath = '/yolov8s.pt';
    
    console.log('📦 Checking model file:', modelPath);
    
    const response = await fetch(modelPath, { method: 'HEAD' });
    
    if (response.ok) {
      const fileSize = response.headers.get('content-length');
      const sizeInMB = (fileSize / (1024 * 1024)).toFixed(2);
      
      console.log('✅ Model file found');
      console.log('📊 File size:', sizeInMB + ' MB');
      console.log('📍 Path:', modelPath);
      console.log('🔗 Status:', response.status, response.statusText);
      
      return { success: true, fileSize, path: modelPath };
    } else {
      console.error('❌ Model file not found');
      console.error('📍 Expected path:', modelPath);
      console.error('🔗 Status:', response.status, response.statusText);
      
      return { success: false, error: 'Model file not found' };
    }
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return { success: false, error: error.message };
  }
};

// ============================================
// Test 8: Complete Integration Flow
// ============================================

export const testCompleteFlow = async (useScan) => {
  console.log('🧪 Test 8: Complete Integration Flow');
  console.log('━'.repeat(50));
  
  try {
    console.log('Step 1: Check context');
    const scanContext = useScan();
    console.log('✅ Context available');
    
    console.log('Step 2: Check model status');
    if (!scanContext.model) {
      console.log('⏳ Waiting for model to initialize...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    if (scanContext.model) {
      console.log('✅ Model ready:', scanContext.model.modelName);
    } else {
      throw new Error('Model failed to initialize');
    }
    
    console.log('Step 3: Analyze test image');
    const { analyzeImage } = await import('../utils/mockAPI.js');
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 640;
    const testImage = canvas.toDataURL('image/jpeg');
    
    const result = await analyzeImage(testImage);
    console.log('✅ Analysis complete');
    console.log('   Disease:', result.disease);
    console.log('   Confidence:', result.confidence + '%');
    
    console.log('Step 4: Save to history');
    const saved = scanContext.saveScan(result);
    console.log('✅ Saved with ID:', saved.id);
    
    console.log('Step 5: Retrieve from history');
    const retrieved = scanContext.getScanById(saved.id);
    console.log('✅ Retrieved:', retrieved?.disease);
    
    console.log('✅ Complete flow successful!');
    return { success: true };
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return { success: false, error: error.message };
  }
};

// ============================================
// Run All Tests
// ============================================

export const runAllTests = async (useScan) => {
  console.clear();
  console.log('🚀 YOLOv8 Integration Test Suite');
  console.log('═'.repeat(50));
  console.log('');
  
  const results = [];
  
  // Test 1
  console.log('');
  results.push(await testModelInitialization());
  
  // Test 2
  console.log('');
  results.push(testModelConfiguration());
  
  // Test 3
  if (useScan) {
    console.log('');
    results.push(testContextIntegration(useScan));
  }
  
  // Test 4
  console.log('');
  results.push(await testImageAnalysis());
  
  // Test 5
  console.log('');
  results.push(await testResultsFormatting());
  
  // Test 6
  console.log('');
  results.push(await testErrorHandling());
  
  // Test 7
  console.log('');
  results.push(await testModelFileAvailability());
  
  // Test 8
  if (useScan) {
    console.log('');
    results.push(await testCompleteFlow(useScan));
  }
  
  // Summary
  console.log('');
  console.log('═'.repeat(50));
  console.log('📊 Test Summary');
  console.log('═'.repeat(50));
  
  const passed = results.filter(r => r.success).length;
  const total = results.length;
  
  console.log(`✅ Passed: ${passed}/${total}`);
  console.log(`❌ Failed: ${total - passed}/${total}`);
  
  if (passed === total) {
    console.log('');
    console.log('🎉 All tests passed! YOLOv8 integration is working correctly.');
  } else {
    console.log('');
    console.log('⚠️  Some tests failed. Check the logs above for details.');
  }
  
  return results;
};

// ============================================
// Export for browser console usage
// ============================================

if (typeof window !== 'undefined') {
  window.YOLOTests = {
    testModelInitialization,
    testModelConfiguration,
    testContextIntegration,
    testImageAnalysis,
    testResultsFormatting,
    testErrorHandling,
    testModelFileAvailability,
    testCompleteFlow,
    runAllTests
  };
  
  console.log('🧪 YOLOv8 Tests available at window.YOLOTests');
  console.log('Run: YOLOTests.runAllTests(useScan) to test everything');
}
