import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, AlertTriangle, CheckCircle, Info, Leaf, Camera } from 'lucide-react';
import { useScan } from '../context/ScanContext';
import { useTranslation } from '../hooks/useTranslation';
import { fetchDiseaseById } from '../utils/diseaseHelpers';
import { Button } from '../components/common/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/common/Card';
import { getSeverityColor, getConfidenceColor, formatDate } from '../utils/helpers';
import { showToast } from '../components/common/Toast';

export const ResultsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getScanById } = useScan();
  const { ts, t } = useTranslation();
  const tx = ts('results');
  const common = ts('common');

  const [disease, setDisease] = useState(null);
  const [loadingDisease, setLoadingDisease] = useState(true);

  const scan = getScanById(id);

  // Fetch disease data from database
  useEffect(() => {
    const loadDisease = async () => {
      if (!scan) {
        setLoadingDisease(false);
        return;
      }

      try {
        setLoadingDisease(true);
        const diseaseData = await fetchDiseaseById(scan.diseaseId);
        if (diseaseData) {
          // Merge scan confidence with disease data
          setDisease({
            ...diseaseData,
            confidence: scan.confidence
          });
        }
      } catch (error) {
        console.error('Error loading disease:', error);
      } finally {
        setLoadingDisease(false);
      }
    };

    loadDisease();
  }, [scan]);

  // Loading state
  if (loadingDisease) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg"></div>
        </Card>
      </div>
    );
  }

  if (!scan || !disease) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="text-center py-12">
          <AlertTriangle className="mx-auto text-gray-300 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            {tx.scanNotFound}
          </h2>
          <p className="text-gray-600 mb-6">
            {tx.scanNotFoundDesc}
          </p>
          <Button onClick={() => navigate('/dashboard')}>
            {tx.goToDashboard}
          </Button>
        </Card>
      </div>
    );
  }

  const isHealthy = disease.severity === 'None';

  const handleDownload = () => {
    showToast(tx.reportDownloaded, 'success');
    // In a real app, this would generate and download a PDF
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          icon={ArrowLeft}
          onClick={() => navigate('/history')}
          className="mb-4"
        >
          {tx.backToHistory}
        </Button>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          {tx.title}
        </h1>
        <p className="text-gray-600 mt-2">
          {tx.scannedOn} {formatDate(scan.date)}
        </p>
      </div>

      <div className="space-y-6">
        {/* Image and Detection Result */}
        <Card className="animate-fade-in">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Image */}
            <div>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={scan.image}
                  alt="Scanned leaf"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Detection Info */}
            <div className="flex flex-col justify-center">
              <div className="mb-6">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${isHealthy ? 'bg-green-100' : 'bg-orange-100'}`}>
                  {isHealthy ? (
                    <CheckCircle className="text-green-600" size={24} />
                  ) : (
                    <AlertTriangle className="text-orange-600" size={24} />
                  )}
                  <span className={`font-semibold ${isHealthy ? 'text-green-700' : 'text-orange-700'}`}>
                    {isHealthy ? tx.healthyLeaf : tx.diseaseDetected}
                  </span>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {disease.disease}
                </h2>
                <p className="text-gray-600 mb-4">
                  {disease.description}
                </p>

                {/* Severity Badge */}
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700 mr-2">
                    {tx.severity}:
                  </span>
                  <span className={`px-3 py-1 rounded-full font-semibold ${getSeverityColor(disease.severity)}`}>
                    {common[disease.severity.toLowerCase()] || disease.severity}
                  </span>
                </div>

                {/* Confidence Score */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {tx.confidenceScore}
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {disease.confidence}%
                    </span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getConfidenceColor(disease.confidence)} transition-all duration-500`}
                      style={{ width: `${disease.confidence}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* All Detections - Show if multiple diseases detected */}
        {scan.allDetections && scan.allDetections.length > 1 && (
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle>All Detected Conditions ({scan.allDetections.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {scan.allDetections.map((detection, index) => {
                  const isHealthyDetection = detection.severity === 'None';
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 ${
                        isHealthyDetection
                          ? 'bg-green-50 border-green-200'
                          : index === 0
                          ? 'bg-orange-50 border-orange-300'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-gray-900">{detection.disease}</h3>
                        {index === 0 && (
                          <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">
                            Primary
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {detection.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getSeverityColor(detection.severity)}`}>
                          {common[detection.severity.toLowerCase()] || detection.severity}
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          {detection.confidence}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Symptoms */}
        {disease.symptoms && disease.symptoms.length > 0 && (
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle>{tx.commonSymptoms}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {disease.symptoms.map((symptom, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertTriangle className="text-orange-500 flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-gray-700">{symptom}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Treatment Recommendations */}
        <Card className={`animate-slide-up ${isHealthy ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
          <CardHeader>
            <CardTitle className={isHealthy ? 'text-green-900' : 'text-orange-900'}>
              {isHealthy ? tx.maintenanceRecommendations : tx.treatmentRecommendations}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {disease.treatments.map((treatment, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${isHealthy ? 'bg-green-500' : 'bg-orange-500'} text-white font-bold text-sm`}>
                    {index + 1}
                  </div>
                  <span className={isHealthy ? 'text-green-900' : 'text-orange-900'}>
                    {treatment}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Prevention Tips */}
        {disease.prevention && (
          <Card className="bg-blue-50 border-blue-200 animate-slide-up">
            <div className="flex gap-3">
              <Info className="text-blue-600 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  {tx.preventionTips}
                </h3>
                <p className="text-blue-800">
                  {disease.prevention}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
          <Button
            fullWidth
            size="lg"
            icon={Download}
            onClick={handleDownload}
          >
            {tx.downloadReport}
          </Button>
          <Button
            fullWidth
            size="lg"
            variant="outline"
            icon={Camera}
            onClick={() => navigate('/scan')}
          >
            {tx.scanAnotherLeaf}
          </Button>
        </div>

        {/* Additional Info */}
        <Card className="bg-gray-50 animate-slide-up">
          <div className="flex items-start gap-3 text-sm">
            <Leaf className="text-leaf-600 flex-shrink-0 mt-0.5" size={20} />
            <div className="text-gray-700">
              <p className="font-semibold mb-1">{tx.importantNote}</p>
              <p>
                {tx.noteDescription}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
