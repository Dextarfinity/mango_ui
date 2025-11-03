// Mock disease database
export const diseaseDatabase = {
  anthracnose: {
    id: 'anthracnose',
    disease: 'Anthracnose',
    confidence: 94,
    severity: 'Medium',
    symptoms: [
      'Dark, sunken spots on leaves and fruit',
      'Premature fruit drop',
      'Black lesions that expand rapidly',
      'Fruit rot during storage'
    ],
    treatments: [
      'Apply copper-based fungicide every 10-14 days',
      'Remove and destroy infected leaves and fruits',
      'Improve air circulation by pruning',
      'Avoid overhead irrigation',
      'Apply fungicide before rainy season'
    ],
    description: 'Fungal disease common in humid conditions. Most severe during wet weather and can cause significant yield loss.',
    prevention: 'Maintain good orchard sanitation and apply preventive fungicides before rainy season.'
  },
  powderyMildew: {
    id: 'powderyMildew',
    disease: 'Powdery Mildew',
    confidence: 91,
    severity: 'Low',
    symptoms: [
      'White powdery growth on leaves',
      'Leaf curling and distortion',
      'Stunted shoot growth',
      'Reduced fruit quality'
    ],
    treatments: [
      'Apply sulfur-based fungicide',
      'Use neem oil spray weekly',
      'Remove heavily infected parts',
      'Ensure proper spacing between trees',
      'Apply potassium bicarbonate solution'
    ],
    description: 'Fungal disease affecting young leaves and flowers. Thrives in warm, dry conditions with high humidity at night.',
    prevention: 'Plant resistant varieties and maintain good air circulation.'
  },
  bacterialBlackSpot: {
    id: 'bacterialBlackSpot',
    disease: 'Bacterial Black Spot',
    confidence: 88,
    severity: 'High',
    symptoms: [
      'Small black spots with yellow halos',
      'Spots on leaves, stems, and fruit',
      'Leaf yellowing and drop',
      'Fruit cracking and lesions'
    ],
    treatments: [
      'Apply copper bactericide immediately',
      'Remove and burn infected plant material',
      'Avoid working in wet orchards',
      'Disinfect pruning tools between cuts',
      'Apply streptomycin if available'
    ],
    description: 'Bacterial infection spread by wind and rain. Can cause severe defoliation and fruit damage.',
    prevention: 'Use disease-free planting material and apply copper sprays preventively.'
  },
  sootyMold: {
    id: 'sootyMold',
    disease: 'Sooty Mold',
    confidence: 96,
    severity: 'Low',
    symptoms: [
      'Black sooty coating on leaves',
      'Reduced photosynthesis',
      'Associated with insect infestation',
      'Easy to wipe off surface'
    ],
    treatments: [
      'Control aphids, mealybugs, and scale insects',
      'Spray with insecticidal soap',
      'Wash leaves with water jet',
      'Apply neem oil to control insects',
      'Improve tree vigor with fertilization'
    ],
    description: 'Fungal growth on honeydew secreted by sap-sucking insects. Not directly harmful but reduces plant health.',
    prevention: 'Control insect populations through integrated pest management.'
  },
  mangoHopper: {
    id: 'mangoHopper',
    disease: 'Mango Hopper Infestation',
    confidence: 89,
    severity: 'Medium',
    symptoms: [
      'Small jumping insects on flowers and leaves',
      'Honeydew secretion and sooty mold',
      'Flower and fruit drop',
      'Stunted panicle growth'
    ],
    treatments: [
      'Spray insecticide during flowering',
      'Use neem-based products',
      'Apply carbaryl or malathion',
      'Remove alternate host plants',
      'Monitor and spray early morning'
    ],
    description: 'Sap-sucking insect pest that causes significant damage during flowering season.',
    prevention: 'Regular monitoring and early intervention during flowering period.'
  },
  healthy: {
    id: 'healthy',
    disease: 'Healthy',
    confidence: 98,
    severity: 'None',
    symptoms: [
      'Vibrant green leaves',
      'No spots or discoloration',
      'Normal growth pattern',
      'No signs of pests'
    ],
    treatments: [
      'Continue regular monitoring',
      'Maintain proper irrigation',
      'Apply balanced fertilizer',
      'Keep orchard clean',
      'Practice preventive care'
    ],
    description: 'Your mango tree appears healthy! Continue with regular maintenance and monitoring.',
    prevention: 'Maintain current care practices and monitor regularly for any changes.'
  }
};

// Mock scan history
export const mockScanHistory = [
  {
    id: '1',
    diseaseId: 'anthracnose',
    image: 'https://images.unsplash.com/photo-1584282948848-ffc968d0ecf9?w=400',
    date: new Date('2025-10-25T10:30:00'),
    location: 'Guimaras',
  },
  {
    id: '2',
    diseaseId: 'healthy',
    image: 'https://images.unsplash.com/photo-1591293835940-70a117e5a556?w=400',
    date: new Date('2025-10-24T14:20:00'),
    location: 'Cebu',
  },
  {
    id: '3',
    diseaseId: 'powderyMildew',
    image: 'https://images.unsplash.com/photo-1580894742597-87bc8789db3d?w=400',
    date: new Date('2025-10-23T09:15:00'),
    location: 'Davao',
  },
  {
    id: '4',
    diseaseId: 'sootyMold',
    image: 'https://images.unsplash.com/photo-1574856344991-aaa31b6f4ce3?w=400',
    date: new Date('2025-10-22T16:45:00'),
    location: 'Guimaras',
  },
  {
    id: '5',
    diseaseId: 'bacterialBlackSpot',
    image: 'https://images.unsplash.com/photo-1584282948848-ffc968d0ecf9?w=400',
    date: new Date('2025-10-20T11:00:00'),
    location: 'Zambales',
  },
  {
    id: '6',
    diseaseId: 'healthy',
    image: 'https://images.unsplash.com/photo-1591293835940-70a117e5a556?w=400',
    date: new Date('2025-10-18T13:30:00'),
    location: 'Cebu',
  }
];

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

// Simulate AI analysis with delay
export const analyzeImage = (imageData) => {
  return new Promise((resolve) => {
    // Simulate processing time
    setTimeout(() => {
      // Randomly select a disease for demo
      const diseases = Object.keys(diseaseDatabase);
      const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
      const result = { ...diseaseDatabase[randomDisease] };
      
      // Add slight variation to confidence
      result.confidence = Math.max(85, Math.min(98, result.confidence + Math.random() * 4 - 2));
      result.confidence = Math.round(result.confidence);
      result.image = imageData;
      result.analyzedAt = new Date();
      
      resolve(result);
    }, 2500);
  });
};

// Mock authentication
export const mockAuth = {
  login: (email, password) => {
    console.log('🔐 Mock Login:', { email, password });
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          id: '1',
          name: email.split('@')[0],
          email: email,
          avatar: '👨‍🌾',
          joinDate: new Date('2024-01-15'),
          totalScans: 45,
          language: 'en',
          notifications: true
        };
        localStorage.setItem('scan2save_user', JSON.stringify(user));
        resolve({ success: true, user });
      }, 800);
    });
  },
  
  signup: (email, password, name) => {
    console.log('📝 Mock Signup:', { email, password, name });
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          id: Date.now().toString(),
          name: name || email.split('@')[0],
          email: email,
          avatar: '👨‍🌾',
          joinDate: new Date(),
          totalScans: 0,
          language: 'en',
          notifications: true
        };
        localStorage.setItem('scan2save_user', JSON.stringify(user));
        resolve({ success: true, user });
      }, 800);
    });
  },
  
  logout: () => {
    console.log('👋 Mock Logout');
    localStorage.removeItem('scan2save_user');
    return Promise.resolve({ success: true });
  },
  
  getCurrentUser: () => {
    const userStr = localStorage.getItem('scan2save_user');
    return userStr ? JSON.parse(userStr) : null;
  }
};

// Get scan history from localStorage or use mock data
export const getScanHistory = () => {
  const historyStr = localStorage.getItem('scan2save_history');
  if (historyStr) {
    const history = JSON.parse(historyStr);
    // Convert date strings back to Date objects
    return history.map(scan => ({
      ...scan,
      date: new Date(scan.date)
    }));
  }
  return mockScanHistory;
};

// Save scan to history
export const saveScan = (scanResult) => {
  const history = getScanHistory();
  const newScan = {
    id: Date.now().toString(),
    diseaseId: scanResult.id,
    image: scanResult.image,
    date: new Date(),
    location: 'Philippines',
    ...scanResult
  };
  
  const updatedHistory = [newScan, ...history];
  localStorage.setItem('scan2save_history', JSON.stringify(updatedHistory));
  
  return newScan;
};

// Update user profile
export const updateUserProfile = (updates) => {
  const user = mockAuth.getCurrentUser();
  if (user) {
    const updatedUser = { ...user, ...updates };
    localStorage.setItem('scan2save_user', JSON.stringify(updatedUser));
    return updatedUser;
  }
  return null;
};
