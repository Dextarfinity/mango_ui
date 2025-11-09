/**
 * Translation System
 * Supports English (en) and Filipino (fil)
 */

export const translations = {
  en: {
    // Dashboard Page
    dashboard: {
      welcomeBack: "Welcome back",
      subtitle: "Monitor your mango trees and keep them healthy",
      readyToScan: "Ready to scan?",
      scanDescription: "Detect diseases early to protect your harvest",
      startNewScan: "Start New Scan",
      totalScans: "Total Scans",
      diseasesFound: "Diseases Found",
      healthyScans: "Healthy Scans",
      healthRate: "Health Rate",
      recentScans: "Recent Scans",
      viewAll: "View All",
      noScans: "No scans yet",
      noScansDescription: "Start your first scan to monitor your mango trees",
      startFirstScan: "Start First Scan"
    },
    
    // Scan Page
    scan: {
      title: "Scan Your Mango Leaves",
      subtitle: "Take or upload a photo to detect diseases and pests",
      chooseMethod: "Choose Your Method",
      chooseDescription: "Capture a photo or upload an existing image",
      takePhoto: "Take Photo",
      uploadImage: "Upload Image",
      analyzeImage: "Analyze Image",
      analyzing: "Analyzing...",
      reset: "Reset",
      analyzingImage: "Analyzing image...",
      processingAI: "Processing with AI...",
      tipsTitle: "Tips for Best Results",
      tip1: "Ensure good lighting conditions",
      tip2: "Focus on the affected areas of the leaf",
      tip3: "Capture the leaf from a close distance",
      tip4: "Avoid blurry or out-of-focus images",
      tip5: "Include the entire lesion or affected area",
      diseasesWeDetect: "Diseases We Detect (YOLOv8 Trained)",
      dieBack: "Die Back",
      dieBackDesc: "Progressive death of shoots and branches",
      powderMildew: "Powder Mildew",
      powderMildewDesc: "White powdery growth on leaves",
      healthy: "Healthy",
      healthyDesc: "No disease detected",
      imageLoaded: "Image loaded successfully",
      imageFailed: "Failed to load image",
      selectImageFirst: "Please select an image first",
      loginToSave: "Please log in to save scans",
      analysisComplete: "Analysis complete!",
      analysisFailed: "Analysis failed. Please try again.",
      invalidFileType: "Please select an image file",
      fileTooLarge: "Image size must be less than 10MB"
    },
    
    // History Page
    history: {
      title: "Scan History",
      subtitle: "View and manage all your previous scans",
      allScans: "All Scans",
      diseased: "Diseased",
      healthy: "Healthy",
      searchPlaceholder: "Search by disease name...",
      noScansYet: "No scans yet",
      noScansFound: "No scans found",
      noScansDescription: "Start your first scan to build your history",
      adjustFilters: "Try adjusting your filters or search term",
      showing: "Showing",
      of: "of",
      totalScans: "total scans",
      confidence: "Confidence"
    },
    
    // Results Page
    results: {
      title: "Analysis Results",
      scannedOn: "Scanned on",
      backToHistory: "Back to History",
      healthyLeaf: "Healthy Leaf",
      diseaseDetected: "Disease Detected",
      severity: "Severity",
      confidenceScore: "Confidence Score",
      commonSymptoms: "Common Symptoms",
      treatmentRecommendations: "Treatment Recommendations",
      maintenanceRecommendations: "Maintenance Recommendations",
      preventionTips: "Prevention Tips",
      downloadReport: "Download Report",
      scanAnotherLeaf: "Scan Another Leaf",
      importantNote: "Important Note:",
      noteDescription: "This AI-powered diagnosis is meant to assist farmers in early detection. For severe cases or uncertain results, please consult with a local agricultural extension officer or plant pathologist for professional advice.",
      scanNotFound: "Scan Not Found",
      scanNotFoundDesc: "The scan you're looking for doesn't exist.",
      goToDashboard: "Go to Dashboard",
      reportDownloaded: "Report downloaded successfully"
    },
    
    // Profile Page
    profile: {
      title: "Profile",
      subtitle: "Manage your account and preferences",
      changeAvatar: "Change Avatar",
      joined: "Joined",
      totalScans: "Total Scans",
      healthRate: "Health Rate",
      diseasesDetected: "Diseases Detected",
      accountAge: "Account Age",
      settings: "Settings",
      languagePreference: "Language Preference",
      notifications: "Notifications",
      notificationsDesc: "Receive updates about your scans and new features",
      darkMode: "Dark Mode",
      darkModeDesc: "Switch between light and dark themes",
      signOut: "Sign Out",
      signOutDesc: "You can always sign back in anytime",
      logout: "Logout",
      chooseAvatar: "Choose Your Avatar",
      avatarUpdated: "Avatar updated successfully",
      languageUpdated: "Language preference updated",
      notificationsEnabled: "Notifications enabled",
      notificationsDisabled: "Notifications disabled",
      loggedOut: "Logged out successfully",
      english: "English",
      filipino: "Filipino (Tagalog)"
    },
    
    // Common
    common: {
      none: "None",
      low: "Low",
      medium: "Medium",
      high: "High",
      scan: "Scan",
      history: "History",
      profile: "Profile",
      home: "Home",
      dashboard: "Dashboard"
    }
  },
  
  fil: {
    // Dashboard Page
    dashboard: {
      welcomeBack: "Maligayang pagbabalik",
      subtitle: "Bantayan ang iyong mga puno ng mangga at panatilihing malusog",
      readyToScan: "Handa nang mag-scan?",
      scanDescription: "Tuklasin ang mga sakit nang maaga upang protektahan ang iyong ani",
      startNewScan: "Magsimula ng Bagong Scan",
      totalScans: "Kabuuang Scans",
      diseasesFound: "Nakitang Sakit",
      healthyScans: "Malusog na Scans",
      healthRate: "Rate ng Kalusugan",
      recentScans: "Kamakailang Scans",
      viewAll: "Tingnan Lahat",
      noScans: "Walang scans pa",
      noScansDescription: "Magsimula ng iyong unang scan upang bantayan ang iyong mga puno ng mangga",
      startFirstScan: "Magsimula ng Unang Scan"
    },
    
    // Scan Page
    scan: {
      title: "I-scan ang Iyong Dahon ng Mangga",
      subtitle: "Kumuha o mag-upload ng larawan upang matukoy ang mga sakit at peste",
      chooseMethod: "Pumili ng Paraan",
      chooseDescription: "Kumuha ng larawan o mag-upload ng umiiral na imahe",
      takePhoto: "Kumuha ng Larawan",
      uploadImage: "Mag-upload ng Larawan",
      analyzeImage: "Suriin ang Larawan",
      analyzing: "Sinusuri...",
      reset: "I-reset",
      analyzingImage: "Sinusuri ang larawan...",
      processingAI: "Pinoproseso gamit ang AI...",
      tipsTitle: "Mga Tip para sa Pinakamahusay na Resulta",
      tip1: "Siguraduhing maganda ang liwanag",
      tip2: "Tumuon sa mga apektadong bahagi ng dahon",
      tip3: "Kunan ang dahon mula sa malapit na distansya",
      tip4: "Iwasan ang malabo o hindi naka-focus na mga larawan",
      tip5: "Isama ang buong sugat o apektadong lugar",
      diseasesWeDetect: "Mga Sakit na Natutukoy Namin (YOLOv8 Trained)",
      dieBack: "Die Back",
      dieBackDesc: "Progresibong pagkamatay ng mga sanga at tangkay",
      powderMildew: "Powder Mildew",
      powderMildewDesc: "Puting pulbos na tumutubo sa mga dahon",
      healthy: "Malusog",
      healthyDesc: "Walang nakitang sakit",
      imageLoaded: "Matagumpay na na-load ang larawan",
      imageFailed: "Nabigo ang pag-load ng larawan",
      selectImageFirst: "Mangyaring pumili muna ng larawan",
      loginToSave: "Mangyaring mag-log in upang i-save ang mga scan",
      analysisComplete: "Kumpleto na ang pagsusuri!",
      analysisFailed: "Nabigo ang pagsusuri. Pakisubukan muli.",
      invalidFileType: "Mangyaring pumili ng image file",
      fileTooLarge: "Ang laki ng larawan ay dapat mas mababa sa 10MB"
    },
    
    // History Page
    history: {
      title: "Kasaysayan ng Scan",
      subtitle: "Tingnan at pamahalaan ang lahat ng iyong nakaraang scans",
      allScans: "Lahat ng Scans",
      diseased: "May Sakit",
      healthy: "Malusog",
      searchPlaceholder: "Maghanap ayon sa pangalan ng sakit...",
      noScansYet: "Walang scans pa",
      noScansFound: "Walang nakitang scans",
      noScansDescription: "Magsimula ng iyong unang scan upang bumuo ng kasaysayan",
      adjustFilters: "Subukang ayusin ang iyong mga filter o search term",
      showing: "Ipinapakita",
      of: "ng",
      totalScans: "kabuuang scans",
      confidence: "Tiwala"
    },
    
    // Results Page
    results: {
      title: "Mga Resulta ng Pagsusuri",
      scannedOn: "Na-scan noong",
      backToHistory: "Bumalik sa Kasaysayan",
      healthyLeaf: "Malusog na Dahon",
      diseaseDetected: "Nakitang Sakit",
      severity: "Kalubhaan",
      confidenceScore: "Marka ng Tiwala",
      commonSymptoms: "Karaniwang Sintomas",
      treatmentRecommendations: "Mga Rekomendasyon sa Paggamot",
      maintenanceRecommendations: "Mga Rekomendasyon sa Pagpapanatili",
      preventionTips: "Mga Tip sa Pag-iwas",
      downloadReport: "I-download ang Ulat",
      scanAnotherLeaf: "Mag-scan ng Ibang Dahon",
      importantNote: "Mahalagang Paalala:",
      noteDescription: "Ang AI-powered diagnosis na ito ay naglalayong tumulong sa mga magsasaka sa maagang pagtuklas. Para sa malalang kaso o hindi tiyak na resulta, mangyaring kumunsulta sa isang lokal na agricultural extension officer o plant pathologist para sa propesyonal na payo.",
      scanNotFound: "Hindi Natagpuan ang Scan",
      scanNotFoundDesc: "Ang scan na hinahanap mo ay hindi umiiral.",
      goToDashboard: "Pumunta sa Dashboard",
      reportDownloaded: "Matagumpay na na-download ang ulat"
    },
    
    // Profile Page
    profile: {
      title: "Profile",
      subtitle: "Pamahalaan ang iyong account at mga kagustuhan",
      changeAvatar: "Baguhin ang Avatar",
      joined: "Sumali noong",
      totalScans: "Kabuuang Scans",
      healthRate: "Rate ng Kalusugan",
      diseasesDetected: "Nakitang Sakit",
      accountAge: "Edad ng Account",
      settings: "Mga Setting",
      languagePreference: "Kagustuhan sa Wika",
      notifications: "Mga Abiso",
      notificationsDesc: "Makatanggap ng mga update tungkol sa iyong mga scan at bagong features",
      darkMode: "Dark Mode",
      darkModeDesc: "Lumipat sa pagitan ng light at dark themes",
      signOut: "Mag-sign Out",
      signOutDesc: "Maaari kang mag-sign in muli anumang oras",
      logout: "Mag-logout",
      chooseAvatar: "Pumili ng Iyong Avatar",
      avatarUpdated: "Matagumpay na na-update ang avatar",
      languageUpdated: "Na-update na ang kagustuhan sa wika",
      notificationsEnabled: "Pinagana ang mga abiso",
      notificationsDisabled: "Hindi pinagana ang mga abiso",
      loggedOut: "Matagumpay na nag-logout",
      english: "Ingles",
      filipino: "Filipino (Tagalog)"
    },
    
    // Common
    common: {
      none: "Wala",
      low: "Mababa",
      medium: "Katamtaman",
      high: "Mataas",
      scan: "Scan",
      history: "Kasaysayan",
      profile: "Profile",
      home: "Home",
      dashboard: "Dashboard"
    }
  }
};

/**
 * Get translation for a key
 * @param {string} language - 'en' or 'fil'
 * @param {string} section - Section name (e.g., 'dashboard', 'scan')
 * @param {string} key - Translation key
 * @returns {string} Translated text
 */
export const t = (language, section, key) => {
  try {
    return translations[language]?.[section]?.[key] || translations.en[section][key] || key;
  } catch (error) {
    console.warn(`Translation missing: ${language}.${section}.${key}`);
    return key;
  }
};

/**
 * Get all translations for a section
 * @param {string} language - 'en' or 'fil'
 * @param {string} section - Section name
 * @returns {object} All translations for the section
 */
export const getSection = (language, section) => {
  return translations[language]?.[section] || translations.en[section] || {};
};
