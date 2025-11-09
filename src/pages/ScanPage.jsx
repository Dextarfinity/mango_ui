import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, Loader, AlertCircle, Info } from 'lucide-react';
import { useScan } from '../context/ScanContext';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../hooks/useTranslation';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { analyzeImage } from '../utils/mockAPI';
import { fileToBase64 } from '../utils/helpers';
import { showToast } from '../components/common/Toast';

export const ScanPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { saveScan, setLoading, loading } = useScan();
  const { ts } = useTranslation();
  const tx = ts('scan');
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileSelect = async (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showToast(tx.invalidFileType, 'error');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      showToast(tx.fileTooLarge, 'error');
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      setSelectedImage(base64);
      setSelectedFile(file);
      showToast(tx.imageLoaded, 'success');
    } catch (error) {
      showToast(tx.imageFailed, 'error');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      showToast(tx.selectImageFirst, 'warning');
      return;
    }

    if (!user) {
      showToast(tx.loginToSave, 'error');
      return;
    }

    setAnalyzing(true);
    setLoading(true);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 250);

    try {
      console.log('🔍 Starting image analysis...');
      
      // Analyze image with YOLOv8
      const result = await analyzeImage(selectedImage);
      console.log('✅ Analysis result:', result);
      
      setProgress(100);
      
      // Save scan to database (with base64 image)
      const scanData = {
        ...result,
        image: selectedImage // Use base64 image directly
      };
      
      console.log('💾 Saving scan to database...');
      const savedScan = await saveScan(scanData);
      
      if (savedScan) {
        console.log('✅ Scan saved successfully:', savedScan.id);
        showToast(tx.analysisComplete, 'success');
        
        // Navigate to results
        setTimeout(() => {
          navigate(`/results/${savedScan.id}`);
        }, 500);
      } else {
        throw new Error('Failed to save scan');
      }
    } catch (error) {
      console.error('❌ Analysis error:', error);
      showToast(tx.analysisFailed, 'error');
      setProgress(0);
    } finally {
      clearInterval(progressInterval);
      setAnalyzing(false);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setProgress(0);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          {tx.title}
        </h1>
        <p className="text-lg text-gray-600">
          {tx.subtitle}
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Image Preview or Upload Options */}
        {!selectedImage ? (
          <Card className="animate-slide-up">
            <div className="text-center py-12">
              <div className="mb-8">
                <div className="inline-block bg-gradient-to-br from-leaf-100 to-mango-100 p-6 rounded-full mb-4">
                  <Camera className="text-leaf-600" size={64} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {tx.chooseMethod}
                </h2>
                <p className="text-gray-600">
                  {tx.chooseMethodDesc}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Button
                  size="lg"
                  icon={Camera}
                  onClick={handleCameraClick}
                  fullWidth
                >
                  {tx.takePhoto}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  icon={Upload}
                  onClick={handleUploadClick}
                  fullWidth
                >
                  {tx.uploadImage}
                </Button>
              </div>

              {/* Hidden file inputs */}
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files[0])}
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files[0])}
              />
            </div>
          </Card>
        ) : (
          <Card className="animate-slide-up">
            {/* Image Preview */}
            <div className="mb-6">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={selectedImage}
                  alt="Selected leaf"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Analysis Progress */}
            {analyzing && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {tx.analyzingImage}
                  </span>
                  <span className="text-sm font-medium text-leaf-600">
                    {progress}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-leaf-500 to-leaf-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-center mt-4 text-gray-600">
                  <Loader className="animate-spin mr-2" size={20} />
                  <span>{tx.processingAI}</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                fullWidth
                size="lg"
                onClick={handleAnalyze}
                disabled={analyzing}
                loading={analyzing}
              >
                {analyzing ? tx.analyzing : tx.analyzeImage}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleReset}
                disabled={analyzing}
              >
                {tx.reset}
              </Button>
            </div>
          </Card>
        )}

        {/* Tips Section */}
        <Card className="bg-blue-50 border-blue-200 animate-slide-up">
          <div className="flex gap-3">
            <Info className="text-blue-600 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                {tx.tipsTitle}
              </h3>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• {tx.tip1}</li>
                <li>• {tx.tip2}</li>
                <li>• {tx.tip3}</li>
                <li>• {tx.tip4}</li>
                <li>• {tx.tip5}</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Common Diseases Info */}
        <Card className="animate-slide-up">
          <h3 className="font-bold text-lg text-gray-900 mb-4">
            {tx.diseasesWeDetect}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={16} />
              <div>
                <p className="font-semibold text-gray-900">{tx.dieBack}</p>
                <p className="text-gray-600">{tx.dieBackDesc}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <AlertCircle className="text-yellow-500 flex-shrink-0 mt-0.5" size={16} />
              <div>
                <p className="font-semibold text-gray-900">{tx.powderMildew}</p>
                <p className="text-gray-600">{tx.powderMildewDesc}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <AlertCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
              <div>
                <p className="font-semibold text-gray-900">{tx.healthy}</p>
                <p className="text-gray-600">{tx.healthyDesc}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
