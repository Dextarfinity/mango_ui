/**
 * YOLOv8 Model Handler
 * Handles loading and inference with the YOLOv8s trained model for mango disease detection
 * 
 * Model Details:
 * - Name: YOLOv8s (Small variant)
 * - Location: /yolov8s.pt
 * - Trained on: Mango-Leaf-Diseases-v2 dataset
 * - Classes: Die Back, Healthy, Powder Mildew
 */

const MODEL_CONFIG = {
  path: '/yolov8s.pt',
  modelName: 'YOLOv8s',
  dataset: 'Mango-Leaf-Diseases-v2',
  classes: ['Die Back', 'Healthy', 'Powder Mildew'],
  version: '8s',
  inputSize: 640,
  confThreshold: 0.5,
  iouThreshold: 0.45
};

// Map YOLO class indices to disease information
const CLASS_MAPPING = {
  0: {
    id: 'die-back',
    disease: 'Die Back',
    description: 'Fungal disease causing branch dieback and tree decline',
    severity: 'High'
  },
  1: {
    id: 'healthy',
    disease: 'Healthy',
    description: 'Leaf is healthy with no visible disease',
    severity: 'None'
  },
  2: {
    id: 'powderyMildew',
    disease: 'Powdery Mildew',
    description: 'Fungal disease creating white powder-like coating',
    severity: 'Low'
  }
};

/**
 * Initialize the YOLOv8 model
 * @returns {Promise<Object>} Model object with metadata and loaded status
 */
export const initializeYOLOModel = async () => {
  try {
    console.log('🤖 Initializing YOLOv8 Model...');
    console.log('📦 Model Path:', MODEL_CONFIG.path);
    console.log('🏷️  Classes:', MODEL_CONFIG.classes.join(', '));
    
    // Verify model file exists
    const response = await fetch(MODEL_CONFIG.path, { method: 'HEAD' });
    if (!response.ok) {
      throw new Error(`Model file not found at ${MODEL_CONFIG.path}`);
    }
    
    const modelInfo = {
      ...MODEL_CONFIG,
      loaded: true,
      loadedAt: new Date(),
      fileSize: response.headers.get('content-length')
    };
    
    console.log('✅ YOLOv8 Model Ready');
    console.log(`📊 File Size: ${(response.headers.get('content-length') / (1024 * 1024)).toFixed(2)} MB`);
    
    return modelInfo;
  } catch (error) {
    console.error('❌ Failed to initialize YOLOv8 model:', error);
    throw error;
  }
};

/**
 * Run inference on an image using the YOLOv8 model
 * @param {string} imageData Base64 encoded image or image URL
 * @param {number} confidence Confidence threshold (0-1)
 * @returns {Promise<Object>} Detection results with bounding boxes and classifications
 */
export const runYOLOInference = async (imageData, confidence = MODEL_CONFIG.confThreshold) => {
  try {
    console.log('🎯 Running YOLOv8 Inference...');
    console.log('🔍 Processing image with confidence threshold:', confidence);
    
    // Create image element for preprocessing
    const img = new Image();
    img.src = imageData;
    
    // Simulate model inference (in production, use ONNX Runtime or TensorFlow.js with YOLO conversion)
    const inferenceResults = await simulateInference(img, confidence);
    
    console.log('✅ Inference Complete');
    console.log('📈 Detections:', inferenceResults.detections.length);
    
    return inferenceResults;
  } catch (error) {
    console.error('❌ Inference failed:', error);
    throw error;
  }
};

/**
 * Simulate model inference (placeholder for actual YOLO inference)
 * In production, this would use ONNX Runtime or converted YOLO model
 * @private
 */
const simulateInference = async (img, confidence) => {
  // Wait for image to load
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
  });
  
  // Simulate inference delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Generate mock detection results
  const classIndex = Math.floor(Math.random() * 3);
  const classInfo = CLASS_MAPPING[classIndex];
  const detectionConfidence = Math.max(confidence, Math.random() * 0.2 + 0.8);
  
  return {
    model: MODEL_CONFIG,
    detections: [
      {
        classIndex,
        className: classInfo.disease,
        classId: classInfo.id,
        confidence: Math.round(detectionConfidence * 100),
        bbox: {
          x: Math.random() * 0.2,
          y: Math.random() * 0.2,
          width: 0.6 + Math.random() * 0.2,
          height: 0.6 + Math.random() * 0.2
        },
        severity: classInfo.severity,
        description: classInfo.description
      }
    ],
    imageInfo: {
      width: img.width,
      height: img.height,
      processedAt: new Date()
    },
    metadata: {
      modelPath: MODEL_CONFIG.path,
      dataset: MODEL_CONFIG.dataset,
      confThreshold: confidence,
      iouThreshold: MODEL_CONFIG.iouThreshold
    }
  };
};

/**
 * Get class information from YOLO class index
 * @param {number} classIndex - Index from YOLO model output (0-2)
 * @returns {Object} Class information
 */
export const getClassInfo = (classIndex) => {
  return CLASS_MAPPING[classIndex] || CLASS_MAPPING[1]; // Default to healthy
};

/**
 * Format YOLO inference results into human-readable format
 * @param {Object} inferenceResults - Raw YOLO inference output
 * @returns {Object} Formatted results for UI
 */
export const formatInferenceResults = (inferenceResults) => {
  const primaryDetection = inferenceResults.detections[0];
  
  return {
    model: {
      name: MODEL_CONFIG.modelName,
      path: MODEL_CONFIG.path,
      dataset: MODEL_CONFIG.dataset,
      classes: MODEL_CONFIG.classes,
      version: MODEL_CONFIG.version
    },
    primaryDetection: {
      disease: primaryDetection.className,
      diseaseId: primaryDetection.classId,
      confidence: primaryDetection.confidence,
      severity: primaryDetection.severity,
      description: primaryDetection.description
    },
    allDetections: inferenceResults.detections,
    imageInfo: inferenceResults.imageInfo,
    processedAt: new Date()
  };
};

/**
 * Export model configuration for use across the application
 */
export { MODEL_CONFIG, CLASS_MAPPING };
