// Disease database - matches dataset.yaml classes
// Classes: Die Back, Healthy, Powder Mildew
export const diseaseDatabase = {
  dieBack: {
    id: 'dieBack',
    disease: 'Die Back',
    confidence: 30,
    severity: 'High',
    symptoms: [
      'Browning and drying of shoot tips',
      'Progressive death of branches from tip to base',
      'Gum exudation from affected areas',
      'Wilting and dropping of leaves',
      'Black discoloration of stems'
    ],
    treatments: [
      'Prune and remove all dead and infected branches',
      'Apply copper-based fungicide to cut surfaces',
      'Improve drainage and avoid water stress',
      'Apply balanced fertilizer to strengthen trees',
      'Disinfect pruning tools between cuts'
    ],
    description: 'Fungal disease that causes progressive death of shoots, branches, and twigs from tip backwards. Common in mango trees during stress conditions.',
    prevention: 'Maintain tree vigor through proper nutrition and irrigation. Prune during dry season and apply protective fungicides.'
  },
  healthy: {
    id: 'healthy',
    disease: 'Healthy',
    confidence: 10,
    severity: 'None',
    symptoms: [
      'Vibrant green leaves',
      'No spots or discoloration',
      'Normal growth pattern',
      'No signs of pests',
      'Strong shoot development'
    ],
    treatments: [
      'Continue regular monitoring',
      'Maintain proper irrigation schedule',
      'Apply balanced fertilizer as needed',
      'Keep orchard clean from fallen leaves',
      'Practice preventive care and sanitation'
    ],
    description: 'Your mango tree appears healthy! Continue with regular maintenance and monitoring.',
    prevention: 'Maintain current care practices and monitor regularly for any changes. Continue with preventive measures.'
  },
  powderMildew: {
    id: 'powderMildew',
    disease: 'Powder Mildew',
    confidence: 10,
    severity: 'Medium',
    symptoms: [
      'White powdery growth on leaves and flowers',
      'Leaf curling and distortion',
      'Stunted shoot growth',
      'Reduced fruit set and quality',
      'Premature leaf drop'
    ],
    treatments: [
      'Apply sulfur-based fungicide at first sign',
      'Use neem oil spray weekly as preventive',
      'Remove heavily infected plant parts',
      'Ensure proper spacing between trees for air circulation',
      'Apply potassium bicarbonate solution'
    ],
    description: 'Fungal disease affecting young leaves, flowers, and fruits. Appears as white powdery coating and thrives in warm, humid conditions.',
    prevention: 'Plant resistant varieties when available. Maintain good air circulation and avoid overhead irrigation during flowering.'
  }
};

// Mock user avatars
export const avatarOptions = [
  { id: 1, emoji: '👨‍🌾', label: 'Farmer' },
  { id: 2, emoji: '👩‍🌾', label: 'Farmer Woman' },
  { id: 3, emoji: '🌱', label: 'Seedling' },
  { id: 4, emoji: '🥭', label: 'Mango' },
  { id: 5, emoji: '🌳', label: 'Tree' },
  { id: 6, emoji: '🍃', label: 'Leaf' },
  { id: 7, emoji: '🌾', label: 'Rice' },
  { id: 8, emoji: '🌻', label: 'Sunflower' },
  { id: 9, emoji: '🦋', label: 'Butterfly' },
  { id: 10, emoji: '🐝', label: 'Bee' },
  { id: 11, emoji: '☀️', label: 'Sun' },
  { id: 12, emoji: '🌈', label: 'Rainbow' }
];

// Simulate AI analysis with YOLOv8 model
// Uses trained model classes: Die Back, Healthy, Powder Mildew
export const analyzeImage = async (imageData) => {
  return new Promise((resolve) => {
    // Simulate processing time
    setTimeout(() => {
      console.log('🎯 Using YOLOv8s Model for Analysis');
      console.log('📊 Model: Mango Leaf Disease Detection (YOLOv8s)');
      console.log('🏷️ Classes: Die Back, Healthy, Powder Mildew');
      console.log('🔍 Processing image...');
      
      // Generate 1-3 random detections
      const diseases = ['dieBack', 'healthy', 'powderMildew'];
      const numDetections = Math.floor(Math.random() * 3) + 1; // 1 to 3 detections
      const detections = [];
      const usedDiseases = new Set();
      
      for (let i = 0; i < numDetections; i++) {
        let randomDisease;
        let attempts = 0;
        do {
          randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
          attempts++;
        } while (usedDiseases.has(randomDisease) && attempts < 10);
        
        if (usedDiseases.has(randomDisease)) break;
        usedDiseases.add(randomDisease);
        
        const diseaseData = { ...diseaseDatabase[randomDisease] };
        
        // Add slight variation to confidence
        diseaseData.confidence = Math.max(75, Math.min(99, diseaseData.confidence + Math.random() * 15));
        diseaseData.confidence = Math.round(diseaseData.confidence);
        
        detections.push(diseaseData);
      }
      
      // Sort by confidence (highest first)
      detections.sort((a, b) => b.confidence - a.confidence);
      
      // Primary detection (highest confidence)
      const primaryDetection = detections[0];
      
      const result = {
        ...primaryDetection,
        image: imageData,
        analyzedAt: new Date(),
        allDetections: detections, // All detected diseases
        model: {
          name: 'YOLOv8s',
          path: '/yolov8s.pt',
          dataset: 'Mango-Leaf-Diseases-v2',
          classes: ['Die Back', 'Healthy', 'Powder Mildew'],
          version: '8s'
        }
      };
      
      console.log('✅ Analysis complete:', {
        totalDetections: detections.length,
        primary: primaryDetection.disease,
        confidence: primaryDetection.confidence + '%',
        all: detections.map(d => d.disease).join(', '),
        model: result.model.name
      });
      
      resolve(result);
    }, 2500);
  });
};
