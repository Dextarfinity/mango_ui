# YOLOv8 Model Integration - Visual Architecture

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     MANGO DISEASE DETECTION APP                 │
└─────────────────────────────────────────────────────────────────┘

                              │
                              ▼
    ┌─────────────────────────────────────────────┐
    │          React App (Main.jsx)               │
    │         ┌──────────────────────────┐        │
    │         │   ScanProvider            │        │
    │         │  + Model Initialization   │        │
    │         │  + Model State Management │        │
    │         └──────────────────────────┘        │
    └─────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
        ┌──────────────────────┐  ┌──────────────────────┐
        │   ScanPage           │  │   Other Pages        │
        │  - Upload Image      │  │  (Results, History)  │
        │  - Take Photo        │  │                      │
        │  - Call Analyze      │  │                      │
        └──────────────────────┘  └──────────────────────┘
                    │
                    ▼
        ┌──────────────────────┐
        │  analyzeImage()      │
        │  (mockAPI.js)        │
        └──────────────────────┘
                    │
                    ▼
        ┌──────────────────────┐
        │  runYOLOInference()  │
        │  (yoloModel.js)      │
        └──────────────────────┘
                    │
                    ▼
        ┌──────────────────────┐
        │ /yolov8s.pt Model    │
        │ (public folder)      │
        │ - YOLOv8s Small      │
        │ - 3 Classes          │
        │ - 640x640 Input      │
        └──────────────────────┘
                    │
                    ▼
        ┌──────────────────────┐
        │   Detection Result   │
        │ - Class: Die Back    │
        │ - Confidence: 94%    │
        │ - Bounding Box       │
        └──────────────────────┘
                    │
                    ▼
        ┌──────────────────────┐
        │  formatResults()     │
        │  (yoloModel.js)      │
        └──────────────────────┘
                    │
                    ▼
        ┌──────────────────────┐
        │  saveScan()          │
        │  (ScanContext)       │
        │  - Save History      │
        │  - Update UI         │
        └──────────────────────┘
                    │
                    ▼
        ┌──────────────────────┐
        │   ResultsPage        │
        │  - Show Results      │
        │  - Display Model     │
        │  - Recommendations   │
        └──────────────────────┘
```

## 🔄 Data Flow Diagram

```
User Action (Upload/Capture Image)
        │
        ├─ Image Validation ✓
        │
        ├─ Convert to Base64
        │
        ▼
analyzeImage(base64Data)
        │
        ├─ Log: "Using YOLOv8s Model"
        │
        ├─ Simulate/Load Model
        │
        ├─ Preprocess Image
        │     └─ Resize to 640x640
        │
        ▼
runYOLOInference(image)
        │
        ├─ Load /yolov8s.pt
        │
        ├─ Forward Pass
        │     └─ Get Class Predictions
        │
        ├─ Filter by Confidence (>0.5)
        │
        ▼
Detection Output
        │
        ├─ Class: 0-2 (Die Back, Healthy, Powder Mildew)
        ├─ Confidence: 0-100%
        ├─ Bounding Box: [x, y, w, h]
        │
        ▼
formatInferenceResults()
        │
        ├─ Map Class Index to Disease Name
        │
        ├─ Format Confidence %
        │
        ├─ Add Model Metadata
        │     └─ Model Name, Version, Dataset
        │
        ▼
Analysis Result Object
        {
          disease: "Die Back",
          confidence: 94,
          model: {
            name: "YOLOv8s",
            path: "/yolov8s.pt",
            dataset: "Mango-Leaf-Diseases-v2",
            classes: ["Die Back", "Healthy", "Powder Mildew"],
            version: "8s"
          },
          analyzedAt: timestamp,
          image: base64
        }
        │
        ▼
saveScan(result)
        │
        ├─ Create Scan Record
        │
        ├─ Save to localStorage
        │
        ├─ Update ScanContext
        │
        ▼
Display Results
        │
        ├─ Show Disease Name
        ├─ Show Confidence %
        ├─ Show Model Used
        ├─ Show Treatments
        │
        ▼
✅ Complete
```

## 🎯 Component Dependencies

```
ScanProvider (Context)
    │
    ├─ State:
    │   ├─ scanHistory: Scan[]
    │   ├─ currentScan: Scan | null
    │   ├─ loading: boolean
    │   ├─ model: Model | null          ← YOLOv8 Model
    │   ├─ modelLoading: boolean
    │   └─ modelError: string | null
    │
    ├─ Functions:
    │   ├─ initializeModel()           ← Initialize YOLOv8
    │   ├─ loadHistory()
    │   ├─ saveScan(scanResult)
    │   ├─ getScanById(id)
    │   ├─ getFilteredScans(filter)
    │   └─ getStats()
    │
    └─ Exports:
        └─ useScan() Hook
            ├─ All State
            ├─ All Functions
            └─ Model Information

ScanPage
    │
    ├─ Uses: useScan(), analyzeImage()
    │
    └─ Calls:
        └─ analyzeImage(imageData)
            └─ Uses: runYOLOInference()
                └─ Uses: /yolov8s.pt Model

ResultsPage
    │
    ├─ Uses: useScan()
    │
    └─ Displays:
        ├─ scan.disease
        ├─ scan.confidence
        ├─ scan.model (YOLOv8 Info)
        └─ scan.treatments
```

## 📦 File Structure with YOLOv8

```
mango_ui/
│
├─ public/
│   ├─ yolov8s.pt              ← 🤖 Trained Model File
│   ├─ dataset.yaml            ← Dataset Configuration
│   └─ ...
│
├─ src/
│   │
│   ├─ context/
│   │   └─ ScanContext.jsx      ← Enhanced with Model State
│   │                              - model state
│   │                              - modelLoading state
│   │                              - modelError state
│   │                              - initializeModel()
│   │
│   ├─ utils/
│   │   ├─ mockAPI.js           ← Enhanced with Model Metadata
│   │   │                           - analyzeImage() updated
│   │   │
│   │   ├─ yoloModel.js         ← 🆕 New YOLO Utilities
│   │   │                           - initializeYOLOModel()
│   │   │                           - runYOLOInference()
│   │   │                           - formatInferenceResults()
│   │   │                           - MODEL_CONFIG
│   │   │                           - CLASS_MAPPING
│   │   │
│   │   ├─ helpers.js
│   │   └─ ...
│   │
│   ├─ pages/
│   │   ├─ ScanPage.jsx
│   │   ├─ ResultsPage.jsx
│   │   └─ ...
│   │
│   └─ ...
│
├─ YOLO_INTEGRATION.md          ← 🆕 Integration Guide
├─ YOLO_INTEGRATION_SUMMARY.md  ← 🆕 Quick Summary
├─ USAGE_EXAMPLES.md            ← 🆕 Code Examples
│
└─ ...
```

## 🔌 Integration Points

```
1. ScanContext (State Management)
   └─ Model: YOLOv8 metadata
   └─ modelLoading: UI indicator
   └─ modelError: Error handling

2. analyzeImage() (API Layer)
   └─ Input: Base64 image
   └─ Process: Uses YOLOv8 inference
   └─ Output: Result with model metadata

3. yoloModel.js (Model Layer)
   └─ Load model from /yolov8s.pt
   └─ Run inference
   └─ Format results

4. ScanPage (UI Layer)
   └─ User interaction
   └─ Trigger analysis
   └─ Display loading state

5. ResultsPage (UI Layer)
   └─ Display results
   └─ Show model information
   └─ Show confidence score
```

## 🔄 State Flow

```
Initial State
    │
    ▼
ScanProvider Mounts
    ├─ loadHistory()
    ├─ initializeModel()
    │   ├─ setModelLoading(true)
    │   ├─ Fetch /yolov8s.pt
    │   ├─ setModel({...})
    │   └─ setModelLoading(false)
    │
    ▼
Model Ready State
    ├─ model: {loaded: true, path: '/yolov8s.pt', ...}
    ├─ modelLoading: false
    ├─ modelError: null
    │
    ▼
User Uploads Image
    │
    ▼
Analyzing State
    ├─ loading: true
    ├─ analyzing: true
    ├─ progress: 0-100%
    │
    ▼
analyzeImage() Called
    ├─ Uses: model info from ScanContext
    ├─ Runs: runYOLOInference()
    ├─ Gets: Detection results
    │
    ▼
Results State
    ├─ progress: 100%
    ├─ currentScan: {results + model metadata}
    ├─ scanHistory: [newScan, ...]
    │
    ▼
Navigate to Results
    ├─ Display scan results
    ├─ Show model used: "YOLOv8s"
    ├─ Show confidence
    ├─ Show disease info
    │
    ▼
✅ Complete
```

## 📊 Model Configuration Tree

```
MODEL_CONFIG
├─ path: '/yolov8s.pt'
├─ modelName: 'YOLOv8s'
├─ dataset: 'Mango-Leaf-Diseases-v2'
├─ classes: [
│   ├─ 'Die Back'
│   ├─ 'Healthy'
│   └─ 'Powder Mildew'
│ ]
├─ version: '8s'
├─ inputSize: 640
├─ confThreshold: 0.5
└─ iouThreshold: 0.45

CLASS_MAPPING
├─ 0: {
│   ├─ id: 'die-back'
│   ├─ disease: 'Die Back'
│   ├─ description: '...'
│   └─ severity: 'High'
│ }
├─ 1: {
│   ├─ id: 'healthy'
│   ├─ disease: 'Healthy'
│   ├─ description: '...'
│   └─ severity: 'None'
│ }
└─ 2: {
    ├─ id: 'powderyMildew'
    ├─ disease: 'Powder Mildew'
    ├─ description: '...'
    └─ severity: 'Low'
  }
```

## 🎭 Sequence Diagram

```
User         ScanPage      Context       Model         API           Storage
 │              │              │           │             │              │
 ├─Upload───────>│              │           │             │              │
 │              │              │           │             │              │
 │              ├─Read Image───>│           │             │              │
 │              │<─Base64──────┤           │             │              │
 │              │              │           │             │              │
 │              ├─Check Model──>│           │             │              │
 │              │<─Model OK────┤           │             │              │
 │              │              │           │             │              │
 │              ├──Analyze────────────────>│             │              │
 │              │              │           │             │              │
 │              │              │           ├─Infer──────>│              │
 │              │              │           │             │              │
 │              │              │           │<─Result────┤              │
 │              │              │           │             │              │
 │              │<──Result─────────────────┤             │              │
 │              │              │           │             │              │
 │              ├─Save Result──────────────────────────────────────────>│
 │              │              │           │             │              │
 │              │<─Scan ID─────────────────────────────────────────────┤
 │              │              │           │             │              │
 │              ├─Update State>│           │             │              │
 │              │              │           │             │              │
 │<─Navigate────┤              │           │             │              │
 │              │              │           │             │              │
 ├─View Results─────────────────────────────────────────────────────────>│
 │              │              │           │             │              │
 │              │              ├─Get Scan─────────────────────────────>│
 │              │              │           │             │              │
 │              │              │<──Scan Data───────────────────────────┤
 │              │              │           │             │              │
 │<─Display─────┤              │           │             │              │
```

## 🌳 Dependency Tree

```
App.jsx
└─ ScanProvider
    ├─ initializeModel() [startup]
    │   └─ yoloModel.js:initializeYOLOModel()
    │       └─ Fetch /yolov8s.pt
    │
    └─ useScan() [in components]
        ├─ ScanPage.jsx
        │   └─ analyzeImage()
        │       └─ yoloModel.js:runYOLOInference()
        │           └─ formatInferenceResults()
        │
        ├─ ResultsPage.jsx
        │   └─ Display scan.model info
        │
        └─ Other Pages
            └─ Display model status
```

This architecture ensures:
- ✅ Clean separation of concerns
- ✅ Centralized model state management
- ✅ Reusable model utilities
- ✅ Easy production conversion
- ✅ Comprehensive error handling
- ✅ Scalable for future enhancements
