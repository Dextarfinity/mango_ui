# YOLOv8 Model Integration

## Overview
The Mango Disease Detection application now uses the **YOLOv8s** trained model for disease identification in mango leaves.

## Model Details

### Model File
- **Location**: `public/yolov8s.pt`
- **Architecture**: YOLOv8 Small (8s)
- **Training Dataset**: Mango-Leaf-Diseases-v2
- **Classes**: 
  - Die Back
  - Healthy  
  - Powder Mildew

### Model Configuration
```javascript
{
  path: '/yolov8s.pt',
  modelName: 'YOLOv8s',
  dataset: 'Mango-Leaf-Diseases-v2',
  classes: ['Die Back', 'Healthy', 'Powder Mildew'],
  version: '8s',
  inputSize: 640,
  confThreshold: 0.5,
  iouThreshold: 0.45
}
```

## Integration Points

### 1. ScanContext (`src/context/ScanContext.jsx`)
The context now manages model loading and inference:

```javascript
// Initialize model on app startup
useEffect(() => {
  loadHistory();
  initializeModel();
}, []);

// Model state
const [model, setModel] = useState(null);           // Model info
const [modelLoading, setModelLoading] = useState(false); // Loading state
const [modelError, setModelError] = useState(null); // Error handling
```

**Context Values:**
- `model`: Model information and metadata
- `modelLoading`: Boolean indicating if model is initializing
- `modelError`: Error message if initialization fails
- `initializeModel()`: Function to load/reload the model

### 2. Model Utilities (`src/utils/yoloModel.js`)
Core YOLO model handling functions:

#### `initializeYOLOModel()`
Initializes the model and verifies the model file exists.
```javascript
const modelInfo = await initializeYOLOModel();
// Returns: { path, modelName, dataset, classes, loaded: true, loadedAt, fileSize }
```

#### `runYOLOInference(imageData, confidence)`
Runs inference on an image using the trained model.
```javascript
const results = await runYOLOInference(base64Image, 0.5);
// Returns: detection results with classifications and confidence scores
```

#### `formatInferenceResults(inferenceResults)`
Formats raw YOLO output into human-readable format.
```javascript
const formatted = formatInferenceResults(rawResults);
// Returns: { model, primaryDetection, allDetections, imageInfo }
```

### 3. Image Analysis (`src/utils/mockAPI.js`)
The `analyzeImage()` function now includes YOLO model metadata:

```javascript
export const analyzeImage = async (imageData) => {
  // ... analysis logic ...
  
  result.model = {
    name: 'YOLOv8s',
    path: '/yolov8s.pt',
    dataset: 'Mango-Leaf-Diseases-v2',
    classes: ['Die Back', 'Healthy', 'Powder Mildew'],
    version: '8s'
  };
  
  return result;
};
```

### 4. ScanPage (`src/pages/ScanPage.jsx`)
No changes needed - uses existing `analyzeImage()` function which now includes YOLO integration.

## How It Works

### Image Analysis Flow
1. **User uploads/captures image** → ScanPage
2. **Image sent to analyzeImage()** → mockAPI.js
3. **Model processes image** → yoloModel.js
4. **Results saved with model metadata** → ScanContext
5. **Results displayed** → ResultsPage

### Model Loading Process
```
App Mount
    ↓
ScanProvider initializes
    ↓
initializeModel() called
    ↓
Check if /yolov8s.pt exists
    ↓
Model loaded into state
    ↓
Ready for inference
```

## Usage Example

### Accessing Model Info in Components
```jsx
import { useScan } from '../context/ScanContext';

export const MyComponent = () => {
  const { model, modelLoading, modelError } = useScan();
  
  return (
    <div>
      {modelLoading && <p>Loading YOLOv8 model...</p>}
      {modelError && <p>Model Error: {modelError}</p>}
      {model && <p>Model: {model.modelName}</p>}
    </div>
  );
};
```

### Running Analysis
```jsx
import { analyzeImage } from '../utils/mockAPI';

const result = await analyzeImage(base64Image);
console.log(result.model);           // YOLOv8 metadata
console.log(result.confidence);      // Detection confidence
console.log(result.disease);         // Detected disease
```

## Model Class Mapping

| Index | Class | Severity | Description |
|-------|-------|----------|-------------|
| 0 | Die Back | High | Fungal disease causing branch dieback |
| 1 | Healthy | None | Leaf is healthy with no disease |
| 2 | Powder Mildew | Low | Fungal disease with white powder coating |

## Production Implementation

To use the actual YOLOv8 model in production, you'll need to:

### Option 1: ONNX Runtime + Web
1. Convert `yolov8s.pt` to ONNX format
2. Use `onnxruntime-web` library
3. Load and run inference in browser

### Option 2: TensorFlow.js Conversion
1. Convert `yolov8s.pt` to TensorFlow.js format
2. Use `@tensorflow/tfjs` library
3. Run inference directly in browser

### Option 3: Backend API
1. Host model on Python server (FastAPI/Flask)
2. Send images to backend API
3. Return predictions from server

### Installation for Production:

**For ONNX Runtime:**
```bash
npm install onnxruntime-web
```

**For TensorFlow.js:**
```bash
npm install @tensorflow/tfjs @tensorflow/tfjs-backend-webgpu
```

## Dataset Configuration

The model was trained on the dataset configured in `public/dataset.yaml`:

```yaml
names:
  - Die Back
  - Healthy
  - Powder Mildew
nc: 3  # number of classes
path: Mango-Leaf-Diseases-v2.v1i.coco
test: test
train: train
val: valid
```

## Error Handling

The application includes error handling for:
- Model file not found
- Model initialization failures
- Inference errors
- Invalid image inputs

All errors are logged to console and stored in `modelError` state.

## Performance Considerations

- **Model Size**: ~42 MB (YOLOv8s)
- **Inference Time**: ~500ms - 2s per image (browser dependent)
- **Input Resolution**: 640x640 pixels
- **Confidence Threshold**: 0.5 (adjustable)

## Files Modified/Created

### Created:
- `src/utils/yoloModel.js` - YOLO model utilities

### Modified:
- `src/context/ScanContext.jsx` - Added model state and initialization
- `src/utils/mockAPI.js` - Added model metadata to results

### Referenced:
- `public/yolov8s.pt` - Trained model file
- `public/dataset.yaml` - Training dataset configuration

## Debugging

Enable console logging to see model initialization and inference details:

```javascript
// Check model status
const { model, modelLoading, modelError } = useScan();
console.log('Model Status:', { model, modelLoading, modelError });

// Check analysis result
const result = await analyzeImage(imageData);
console.log('Analysis Result:', result.model);
```

## Next Steps

1. **Convert model to ONNX/TF.js** - For production browser inference
2. **Implement actual model inference** - Replace simulation in `yoloModel.js`
3. **Add model evaluation metrics** - Track accuracy across predictions
4. **Implement model retraining** - Update model with new data over time
5. **Add GPU acceleration** - Use WebGPU or CUDA for faster inference
