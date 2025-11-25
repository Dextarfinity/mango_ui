# SYSTEM REQUIREMENTS & TECHNICAL SPECIFICATIONS
## Mango Disease Detection System (Scan2Save)

---

## 1. FUNCTIONAL REQUIREMENTS

### 1.1 User Authentication & Authorization

**FR-1.1: User Registration**
- **ID:** FR-1.1
- **Priority:** High
- **Description:** System shall allow users to create new accounts
- **Requirements:**
  - Accept email and password input
  - Validate email format (RFC 5322 standard)
  - Enforce password requirements (min 8 characters, 1 uppercase, 1 number)
  - Check for duplicate email addresses
  - Send email verification link
  - Create user profile with default values
  - Generate unique user ID (UUID)
- **Acceptance Criteria:**
  - User can successfully register with valid credentials
  - System rejects invalid email formats
  - System rejects weak passwords
  - System prevents duplicate email registration
  - Verification email is sent within 30 seconds
  - User profile is created in database

**FR-1.2: User Login**
- **ID:** FR-1.2
- **Priority:** High
- **Description:** System shall authenticate existing users
- **Requirements:**
  - Accept email and password credentials
  - Validate credentials against Supabase Auth
  - Generate JWT authentication token
  - Create session with 7-day expiry
  - Load user profile from database
  - Redirect to dashboard on success
- **Acceptance Criteria:**
  - Valid credentials allow successful login
  - Invalid credentials show appropriate error message
  - Session persists across browser refreshes
  - Token expires after 7 days of inactivity

**FR-1.3: User Logout**
- **ID:** FR-1.3
- **Priority:** Medium
- **Description:** System shall allow users to sign out
- **Requirements:**
  - Clear authentication token
  - Destroy active session
  - Clear local storage/cache
  - Redirect to landing page
- **Acceptance Criteria:**
  - User is successfully logged out
  - Protected routes become inaccessible
  - User must re-authenticate to access system

---

### 1.2 Disease Detection & Analysis

**FR-2.1: Image Upload**
- **ID:** FR-2.1
- **Priority:** High
- **Description:** System shall accept mango leaf images from users
- **Requirements:**
  - Support image capture from device camera
  - Support file upload from device storage
  - Accept JPEG, PNG, WebP formats
  - Enforce maximum file size of 10MB
  - Validate image dimensions (minimum 300x300)
  - Convert image to Base64 encoding
  - Display image preview before analysis
- **Acceptance Criteria:**
  - Camera capture works on mobile devices
  - File picker allows image selection
  - Invalid file types are rejected with clear error
  - Files exceeding 10MB are rejected
  - Preview displays correctly before analysis

**FR-2.2: AI-Powered Disease Detection**
- **ID:** FR-2.2
- **Priority:** Critical
- **Description:** System shall detect mango diseases using YOLOv8 model
- **Requirements:**
  - Load YOLOv8s pre-trained model (yolov8s.pt)
  - Preprocess image to 640x640 pixels
  - Run inference with confidence threshold ≥ 50%
  - Apply Non-Maximum Suppression (IoU threshold 0.45)
  - Detect 1-3 diseases per image
  - Classify diseases: Die Back, Healthy, Powder Mildew
  - Calculate confidence score (0-100%)
  - Generate bounding box coordinates
  - Sort detections by confidence (highest first)
- **Acceptance Criteria:**
  - Model loads successfully within 5 seconds
  - Inference completes within 3 seconds
  - Detections have confidence scores ≥ 50%
  - Multiple diseases are detected in single image
  - Bounding boxes are properly positioned
  - Classification accuracy ≥ 85%

**FR-2.3: Multiple Detection Support**
- **ID:** FR-2.3
- **Priority:** High
- **Description:** System shall detect and display multiple diseases in one image
- **Requirements:**
  - Detect up to 3 unique diseases per scan
  - Store each detection as separate database record
  - Identify primary detection (highest confidence)
  - Display all detections in results page
  - Show confidence score for each detection
  - Link all detections to same image and timestamp
- **Acceptance Criteria:**
  - System can detect 1-3 diseases simultaneously
  - Each detection is saved to database
  - Primary detection is clearly indicated
  - All detections are visible in UI
  - Confidence scores are accurate for each

**FR-2.4: Disease Information Retrieval**
- **ID:** FR-2.4
- **Priority:** High
- **Description:** System shall provide comprehensive disease information
- **Requirements:**
  - Retrieve disease details from database
  - Display disease name and description
  - Show severity level (None, Low, Medium, High)
  - List common symptoms (5-8 items)
  - Provide treatment recommendations (5+ steps)
  - Include prevention tips
  - Support English and Tagalog languages
- **Acceptance Criteria:**
  - All detected diseases show complete information
  - Symptoms are clearly listed
  - Treatments are actionable and numbered
  - Prevention tips are practical
  - Information displays correctly in selected language

**FR-2.5: Progress Indication**
- **ID:** FR-2.5
- **Priority:** Medium
- **Description:** System shall show analysis progress to users
- **Requirements:**
  - Display progress bar (0-100%)
  - Update progress at key stages:
    - 25%: Model loaded
    - 50%: Image preprocessed
    - 75%: Inference complete
    - 90%: Saving to database
    - 100%: Complete
  - Show loading animation during processing
  - Display estimated time remaining
- **Acceptance Criteria:**
  - Progress bar updates smoothly
  - User sees visual feedback throughout process
  - Loading states prevent multiple submissions
  - Progress reaches 100% before showing results

---

### 1.3 Scan History Management

**FR-3.1: View Scan History**
- **ID:** FR-3.1
- **Priority:** High
- **Description:** System shall display user's past scans
- **Requirements:**
  - Load all scans for authenticated user
  - Group related detections (same image/time)
  - Sort scans by date (newest first)
  - Display scan thumbnail, disease, confidence, date
  - Show total scan count
  - Load history within 2 seconds
- **Acceptance Criteria:**
  - All user scans are visible
  - Related detections are grouped together
  - Scans are sorted chronologically
  - Thumbnails display correctly
  - Page loads quickly (<2 seconds)

**FR-3.2: Filter Scans**
- **ID:** FR-3.2
- **Priority:** Medium
- **Description:** System shall allow filtering of scan history
- **Requirements:**
  - Filter by: All, Healthy, Diseased
  - Apply filter without page reload
  - Update scan count based on filter
  - Maintain filter state during session
- **Acceptance Criteria:**
  - Filter buttons are clearly visible
  - Filtering happens instantly
  - Scan count updates correctly
  - Filter state persists on navigation

**FR-3.3: View Scan Details**
- **ID:** FR-3.3
- **Priority:** High
- **Description:** System shall allow viewing of individual scan details
- **Requirements:**
  - Navigate to results page from history
  - Display original image
  - Show all detected diseases (if multiple)
  - Display primary detection prominently
  - Show all disease information
  - Enable downloading report
- **Acceptance Criteria:**
  - Scan details load within 1 second
  - All detections are visible
  - Image displays at good quality
  - Navigation works correctly

**FR-3.4: Delete Scans**
- **ID:** FR-3.4
- **Priority:** Medium
- **Description:** System shall allow users to delete scan records
- **Requirements:**
  - Show delete confirmation dialog
  - Delete all related detection records
  - Update user's total_scans counter
  - Remove scan from history list
  - Prevent accidental deletions
- **Acceptance Criteria:**
  - Confirmation dialog appears before deletion
  - All related records are removed
  - Statistics update correctly
  - UI updates immediately after deletion
  - Deleted scans cannot be recovered

---

### 1.4 User Profile Management

**FR-4.1: View Profile**
- **ID:** FR-4.1
- **Priority:** Medium
- **Description:** System shall display user profile information
- **Requirements:**
  - Show user name and email
  - Display selected avatar
  - Show statistics (total scans, healthy, diseased)
  - Display join date
  - Show current language preference
  - Display notification settings
- **Acceptance Criteria:**
  - Profile information is accurate
  - Statistics are calculated correctly
  - All fields display properly

**FR-4.2: Edit Profile**
- **ID:** FR-4.2
- **Priority:** Medium
- **Description:** System shall allow profile updates
- **Requirements:**
  - Edit user name
  - Change avatar (12 emoji options)
  - Update language preference (EN/TL)
  - Toggle notification settings
  - Validate name (2-50 characters)
  - Save changes to database
  - Show success confirmation
- **Acceptance Criteria:**
  - Changes save successfully
  - UI updates immediately
  - Validation works correctly
  - Success message appears

**FR-4.3: View Statistics**
- **ID:** FR-4.3
- **Priority:** Medium
- **Description:** System shall calculate and display user statistics
- **Requirements:**
  - Total scans performed
  - Number of healthy scans
  - Number of diseased scans
  - Health rate percentage
  - Last scan date
  - Scan frequency trends
- **Acceptance Criteria:**
  - Statistics are accurate
  - Calculations are correct
  - Updates happen in real-time
  - Charts/graphs display properly

---

### 1.5 Multilingual Support

**FR-5.1: Language Selection**
- **ID:** FR-5.1
- **Priority:** Medium
- **Description:** System shall support multiple languages
- **Requirements:**
  - Support English (default)
  - Support Tagalog
  - Language toggle in navigation
  - Persist language preference
  - Translate all UI text
  - Translate disease information
- **Acceptance Criteria:**
  - Language switches instantly
  - All text translates correctly
  - Preference persists across sessions
  - No untranslated text visible

---

### 1.6 Report Generation

**FR-6.1: Download Report**
- **ID:** FR-6.1
- **Priority:** Low
- **Description:** System shall generate downloadable scan reports
- **Requirements:**
  - Generate PDF format report
  - Include scan image
  - Include detection results
  - Include disease information
  - Include treatment recommendations
  - Add timestamp and user information
  - Trigger browser download
- **Acceptance Criteria:**
  - PDF generates within 5 seconds
  - PDF is properly formatted
  - All information is included
  - File downloads successfully

---

## 2. NON-FUNCTIONAL REQUIREMENTS

### 2.1 Performance Requirements

**NFR-1.1: Response Time**
- **ID:** NFR-1.1
- **Priority:** High
- **Description:** System shall maintain fast response times
- **Requirements:**
  - Page load time: < 2 seconds (3G network)
  - Disease detection: < 3 seconds
  - Database queries: < 500ms
  - Image upload: < 1 second for 5MB file
  - Model loading: < 5 seconds (first time)
  - API response: < 200ms
- **Measurement:** Use Lighthouse performance score ≥ 90

**NFR-1.2: Throughput**
- **ID:** NFR-1.2
- **Priority:** Medium
- **Description:** System shall handle concurrent users
- **Requirements:**
  - Support 100+ concurrent users
  - Process 50+ simultaneous scans
  - Maintain performance under load
  - No degradation up to 1000 daily active users
- **Measurement:** Load testing with Apache JMeter

**NFR-1.3: Resource Utilization**
- **ID:** NFR-1.3
- **Priority:** Medium
- **Description:** System shall use resources efficiently
- **Requirements:**
  - Browser memory usage: < 200MB
  - CPU usage: < 50% during inference
  - Network bandwidth: < 5MB per scan
  - Local storage: < 10MB cached data
- **Measurement:** Chrome DevTools Performance profiling

---

### 2.2 Scalability Requirements

**NFR-2.1: Horizontal Scalability**
- **ID:** NFR-2.1
- **Priority:** Medium
- **Description:** System shall scale to accommodate growth
- **Requirements:**
  - Support 10,000+ registered users
  - Handle 50,000+ scans per month
  - Database can grow to 100GB+
  - CDN for static assets
  - Serverless architecture for API
- **Measurement:** Successful deployment with increased load

**NFR-2.2: Database Scalability**
- **ID:** NFR-2.2
- **Priority:** High
- **Description:** Database shall handle large datasets
- **Requirements:**
  - Indexed queries for fast retrieval
  - Efficient grouping of related scans
  - Pagination for large result sets
  - Optimized for read-heavy operations
- **Measurement:** Query performance < 500ms with 100K+ records

---

### 2.3 Availability & Reliability

**NFR-3.1: System Availability**
- **ID:** NFR-3.1
- **Priority:** High
- **Description:** System shall be highly available
- **Requirements:**
  - Uptime: 99.5% (SLA)
  - Planned maintenance: < 4 hours/month
  - Unplanned downtime: < 2 hours/month
  - Automatic failover for critical services
- **Measurement:** Uptime monitoring with Pingdom

**NFR-3.2: Data Reliability**
- **ID:** NFR-3.2
- **Priority:** Critical
- **Description:** System shall ensure data integrity
- **Requirements:**
  - Zero data loss
  - ACID compliance for database transactions
  - Automated backups every 24 hours
  - Point-in-time recovery (7 days)
  - Database triggers for data consistency
- **Measurement:** Regular backup tests and recovery drills

**NFR-3.3: Error Handling**
- **ID:** NFR-3.3
- **Priority:** High
- **Description:** System shall handle errors gracefully
- **Requirements:**
  - Catch and log all exceptions
  - Display user-friendly error messages
  - No stack traces visible to users
  - Automatic retry for network errors (3 attempts)
  - Fallback mechanisms for critical features
- **Measurement:** Error rate < 1% of all requests

---

### 2.4 Security Requirements

**NFR-4.1: Authentication Security**
- **ID:** NFR-4.1
- **Priority:** Critical
- **Description:** System shall secure user authentication
- **Requirements:**
  - JWT token-based authentication
  - Secure password hashing (bcrypt)
  - HTTPS/TLS 1.3 for all connections
  - Token expiration after 7 days
  - No password storage in plain text
  - Protection against brute force attacks
- **Measurement:** Security audit with OWASP Top 10

**NFR-4.2: Data Security**
- **ID:** NFR-4.2
- **Priority:** Critical
- **Description:** System shall protect user data
- **Requirements:**
  - Encrypt data in transit (TLS)
  - Encrypt data at rest (AES-256)
  - Row-level security policies
  - User data isolation
  - No sharing of data between users
  - Secure API endpoints
- **Measurement:** Penetration testing quarterly

**NFR-4.3: Privacy Compliance**
- **ID:** NFR-4.3
- **Priority:** High
- **Description:** System shall comply with privacy regulations
- **Requirements:**
  - GDPR compliance (data protection)
  - User consent for data collection
  - Data deletion on account closure
  - Privacy policy disclosure
  - No third-party data sharing without consent
- **Measurement:** Privacy audit and legal review

---

### 2.5 Usability Requirements

**NFR-5.1: User Interface**
- **ID:** NFR-5.1
- **Priority:** High
- **Description:** System shall be intuitive and easy to use
- **Requirements:**
  - Clean, modern design (Material Design principles)
  - Consistent color scheme and typography
  - Clear navigation with bottom nav on mobile
  - Accessibility compliance (WCAG 2.1 Level AA)
  - Touch-friendly buttons (minimum 44x44px)
  - Keyboard navigation support
- **Measurement:** User testing with 80%+ satisfaction score

**NFR-5.2: Responsive Design**
- **ID:** NFR-5.2
- **Priority:** High
- **Description:** System shall work on all device sizes
- **Requirements:**
  - Mobile-first design approach
  - Support for screens 320px to 2560px wide
  - Responsive breakpoints: mobile, tablet, desktop
  - Touch and mouse input support
  - Optimized for portrait and landscape
- **Measurement:** Cross-device testing (5+ devices)

**NFR-5.3: Learnability**
- **ID:** NFR-5.3
- **Priority:** Medium
- **Description:** System shall be easy to learn
- **Requirements:**
  - Intuitive UI requiring no training
  - Clear labels and instructions
  - Helpful error messages
  - Tooltips and hints where needed
  - First-time user guidance
- **Measurement:** New user completes scan within 3 minutes

---

### 2.6 Compatibility Requirements

**NFR-6.1: Browser Compatibility**
- **ID:** NFR-6.1
- **Priority:** High
- **Description:** System shall work on modern browsers
- **Requirements:**
  - Chrome 90+ (desktop and mobile)
  - Firefox 88+
  - Safari 14+ (iOS and macOS)
  - Edge 90+
  - No Internet Explorer support
- **Measurement:** Cross-browser testing suite

**NFR-6.2: Device Compatibility**
- **ID:** NFR-6.2
- **Priority:** High
- **Description:** System shall work on various devices
- **Requirements:**
  - iOS 13+ (iPhone, iPad)
  - Android 8+ (phones and tablets)
  - Windows 10+ (desktop)
  - macOS 10.15+ (desktop)
  - Camera access on mobile devices
- **Measurement:** Device testing matrix

**NFR-6.3: Network Compatibility**
- **ID:** NFR-6.3
- **Priority:** Medium
- **Description:** System shall work on various network conditions
- **Requirements:**
  - Functional on 3G networks (minimum)
  - Optimized for 4G/5G
  - Offline-capable (PWA features)
  - Graceful degradation on slow connections
  - Progressive image loading
- **Measurement:** Network throttling tests

---

### 2.7 Maintainability Requirements

**NFR-7.1: Code Quality**
- **ID:** NFR-7.1
- **Priority:** Medium
- **Description:** Code shall be maintainable and clean
- **Requirements:**
  - Modular component architecture
  - Consistent code style (ESLint + Prettier)
  - Comprehensive inline documentation
  - Reusable custom hooks
  - DRY principle (Don't Repeat Yourself)
  - SOLID principles for architecture
- **Measurement:** Code review checklist compliance

**NFR-7.2: Documentation**
- **ID:** NFR-7.2
- **Priority:** Medium
- **Description:** System shall be well-documented
- **Requirements:**
  - README with setup instructions
  - API documentation
  - Component documentation (JSDoc)
  - Architecture diagrams
  - Deployment guide
  - User manual
- **Measurement:** Documentation completeness score ≥ 90%

**NFR-7.3: Testing**
- **ID:** NFR-7.3
- **Priority:** High
- **Description:** System shall have comprehensive test coverage
- **Requirements:**
  - Unit tests for utilities (70%+ coverage)
  - Component tests for UI
  - Integration tests for critical flows
  - E2E tests for user journeys
  - Automated test execution in CI/CD
- **Measurement:** Test coverage ≥ 70%

---

### 2.8 Portability Requirements

**NFR-8.1: Deployment Portability**
- **ID:** NFR-8.1
- **Priority:** Medium
- **Description:** System shall be deployable to multiple platforms
- **Requirements:**
  - Containerized deployment (Docker)
  - Cloud-agnostic architecture
  - Environment-based configuration
  - Easy migration between hosting providers
- **Measurement:** Successful deployment to 2+ platforms

---

## 3. TECHNOLOGY STACK

### 3.1 Frontend Development

**Framework & Libraries:**
```javascript
{
  // Core Framework
  "react": "^18.2.0",              // UI component library
  "react-dom": "^18.2.0",          // DOM rendering
  "react-router-dom": "^6.20.0",   // Client-side routing
  
  // Build Tool
  "vite": "^5.0.0",                // Fast build tool and dev server
  
  // State Management
  "React Context API": "Built-in", // Global state management
  
  // Styling
  "tailwindcss": "^3.3.0",         // Utility-first CSS framework
  "postcss": "^8.4.32",            // CSS processing
  "autoprefixer": "^10.4.16",      // CSS vendor prefixing
  
  // Icons
  "lucide-react": "^0.294.0",      // Icon library
  
  // AI/ML (Planned)
  "onnxruntime-web": "^1.16.0",    // ONNX Runtime for browser
  "@tensorflow/tfjs": "^4.15.0",   // TensorFlow.js (alternative)
  
  // Utilities
  "clsx": "^2.0.0",                // Conditional CSS classes
  "date-fns": "^2.30.0"            // Date manipulation
}
```

**Development Tools:**
```javascript
{
  "eslint": "^8.55.0",             // Code linting
  "prettier": "^3.1.1",            // Code formatting
  "vite-plugin-pwa": "^0.17.4"     // PWA support
}
```

---

### 3.2 Backend Development

**Backend-as-a-Service (BaaS):**
```javascript
{
  // Supabase Services
  "@supabase/supabase-js": "^2.38.0",  // Supabase client library
  
  // Services Used:
  "Supabase Auth": {
    "purpose": "User authentication and authorization",
    "features": [
      "Email/password authentication",
      "JWT token generation",
      "Session management",
      "Email verification"
    ]
  },
  
  "Supabase Database": {
    "purpose": "PostgreSQL database",
    "features": [
      "SQL queries",
      "Real-time subscriptions",
      "Row-level security",
      "Database triggers and functions"
    ]
  },
  
  "Supabase Storage": {
    "purpose": "File storage (optional for images)",
    "features": [
      "Image upload",
      "CDN delivery",
      "Public/private buckets"
    ]
  },
  
  "Supabase Realtime": {
    "purpose": "Live data updates",
    "features": [
      "WebSocket connections",
      "Database change streams",
      "Presence tracking"
    ]
  }
}
```

**API Architecture:**
- RESTful API through Supabase
- Serverless functions for custom logic
- WebSocket for real-time updates

---

### 3.3 Database Management

**Database System:**
```sql
-- PostgreSQL 15+ (via Supabase)
{
  "type": "Relational Database",
  "provider": "Supabase (PostgreSQL)",
  "version": "15.x",
  
  "tables": [
    "users",        // User profiles and authentication
    "scans",        // Scan results and detections
    "diseases"      // Disease information database
  ],
  
  "features": [
    "ACID compliance",
    "Foreign key constraints",
    "Database triggers",
    "Stored procedures",
    "Views for analytics",
    "Automatic timestamps",
    "UUID primary keys"
  ],
  
  "indexes": [
    "idx_users_email",
    "idx_scans_user_id",
    "idx_scans_disease_id",
    "idx_scans_analyzed_at",
    "idx_diseases_name"
  ],
  
  "triggers": [
    "update_updated_at_column",     // Auto-update timestamps
    "update_user_total_scans"       // Auto-update scan count
  ]
}
```

**Data Storage Strategy:**
- **Structured Data:** PostgreSQL (users, scans, diseases)
- **Image Data:** Base64 in database OR Supabase Storage
- **Session Data:** JWT tokens in localStorage
- **Cache:** Browser cache for static assets

---

### 3.4 AI/ML Integration

**Model Details:**
```python
{
  "model": "YOLOv8s",
  "framework": "PyTorch/Ultralytics",
  "format": ".pt (PyTorch)",
  "file": "yolov8s.pt",
  "size": "~22MB",
  
  "architecture": {
    "type": "Object Detection",
    "variant": "Small (s)",
    "input_size": "640x640",
    "backbone": "CSPDarknet",
    "neck": "PANet",
    "head": "YOLO Detection Head"
  },
  
  "training": {
    "dataset": "Mango-Leaf-Diseases-v2",
    "classes": [
      "Die Back",
      "Healthy",
      "Powder Mildew"
    ],
    "num_classes": 3,
    "epochs": 100,
    "batch_size": 16,
    "image_size": 640
  },
  
  "inference": {
    "confidence_threshold": 0.5,
    "iou_threshold": 0.45,
    "max_detections": 3,
    "device": "CPU (browser)"
  },
  
  "deployment": {
    "current": "Mock API (Phase 2)",
    "planned": "ONNX Runtime Web (Phase 4)",
    "alternative": "TensorFlow.js conversion"
  }
}
```

**Model Conversion Pipeline (Planned):**
```bash
# Convert PyTorch model to ONNX
python export.py --weights yolov8s.pt --format onnx --simplify

# Optimize for browser
onnxruntime-web optimize yolov8s.onnx

# Deploy to CDN
upload yolov8s.onnx to Supabase Storage
```

---

### 3.5 DevOps & Deployment

**Hosting & Infrastructure:**
```javascript
{
  "frontend_hosting": {
    "provider": "Vercel",
    "features": [
      "Automatic deployments from Git",
      "CDN (Edge Network)",
      "HTTPS/SSL certificates",
      "Environment variables",
      "Custom domain support",
      "Serverless functions"
    ],
    "regions": "Global CDN"
  },
  
  "backend_hosting": {
    "provider": "Supabase Cloud",
    "features": [
      "Managed PostgreSQL",
      "Automatic backups",
      "Database migrations",
      "Real-time subscriptions",
      "API auto-generation",
      "Row-level security"
    ],
    "region": "Asia Pacific (Singapore)"
  },
  
  "cdn": {
    "provider": "Vercel Edge Network",
    "purpose": "Static assets and YOLO model",
    "features": [
      "Global distribution",
      "Automatic caching",
      "HTTP/2 support",
      "Brotli compression"
    ]
  }
}
```

**CI/CD Pipeline:**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Setup Node.js 18
      - Install dependencies
      - Run linting (ESLint)
      - Run tests (Vitest)
      - Build production bundle
      - Deploy to Vercel
      - Run smoke tests
      - Notify team (Slack/Discord)
```

**Monitoring & Analytics:**
```javascript
{
  "error_tracking": "Sentry.io",
  "analytics": "Google Analytics 4",
  "performance": "Lighthouse CI",
  "uptime": "Pingdom / UptimeRobot",
  "logs": "Vercel Logs + Supabase Logs"
}
```

---

## 4. HARDWARE REQUIREMENTS

### 4.1 Client-Side (User Device)

**Minimum Requirements:**
- **Processor:** Dual-core CPU (1.5 GHz+)
- **RAM:** 2GB
- **Storage:** 100MB available space
- **Display:** 320x480 minimum resolution
- **Camera:** 5MP (for image capture)
- **Network:** 3G connection (minimum 1 Mbps)
- **OS:** Android 8+ / iOS 13+ / Windows 10+ / macOS 10.15+

**Recommended Requirements:**
- **Processor:** Quad-core CPU (2.0 GHz+)
- **RAM:** 4GB+
- **Storage:** 500MB available space
- **Display:** 1080p resolution
- **Camera:** 12MP+ with autofocus
- **Network:** 4G/5G connection (5+ Mbps)
- **OS:** Latest Android/iOS/Windows/macOS

---

### 4.2 Server-Side (Managed by Supabase/Vercel)

**Supabase Infrastructure:**
- **Database:** PostgreSQL on cloud infrastructure
- **CPU:** Auto-scaling based on load
- **RAM:** Auto-scaling based on queries
- **Storage:** 500MB to 8GB database size
- **Bandwidth:** Unlimited (fair use policy)
- **Backups:** Daily automated backups

**Vercel Edge Infrastructure:**
- **CDN:** Global edge network (300+ locations)
- **Serverless Functions:** Auto-scaling
- **Build Minutes:** 6000 minutes/month
- **Bandwidth:** 100GB/month (Pro plan)

---

## 5. SOFTWARE REQUIREMENTS

### 5.1 Development Environment

**Required Software:**
```bash
# Node.js and Package Manager
Node.js: v18.x or v20.x (LTS)
npm: v9.x or v10.x
# OR
pnpm: v8.x (faster alternative)

# Code Editor (Choose one)
Visual Studio Code: v1.85+
  - Extensions: ESLint, Prettier, Tailwind CSS IntelliSense
WebStorm: 2023.3+
Cursor AI: Latest

# Version Control
Git: v2.40+

# Browser for Testing
Google Chrome: Latest (recommended for DevTools)
Firefox Developer Edition: Latest
Safari: Latest (for iOS testing)

# Optional Tools
Docker: v24+ (for containerization)
Postman: Latest (for API testing)
```

### 5.2 Production Environment

**Runtime Requirements:**
```javascript
{
  "browser_engine": [
    "Chromium 90+",
    "Gecko 88+",
    "WebKit 14+"
  ],
  
  "javascript_features": [
    "ES2020+",
    "Async/Await",
    "Promises",
    "Modules",
    "Fetch API",
    "Web Workers (planned)"
  ],
  
  "web_apis": [
    "Camera API (getUserMedia)",
    "File API",
    "LocalStorage",
    "SessionStorage",
    "WebSocket",
    "Service Workers (PWA)"
  ]
}
```

---

## 6. QUALITY ATTRIBUTES

### 6.1 Testability
- Unit test coverage ≥ 70%
- Integration tests for critical paths
- E2E tests for user journeys
- Automated regression testing
- Test-driven development encouraged

### 6.2 Modularity
- Component-based architecture
- Separation of concerns (Pages/Components/Utils)
- Reusable custom hooks
- Context-based state management
- Pluggable AI model layer

### 6.3 Extensibility
- Easy to add new disease types
- Support for additional languages
- Pluggable authentication providers
- Modular model integration (YOLO, ResNet, etc.)
- API-first design for future mobile apps

---

## 7. CONSTRAINTS

### 7.1 Technical Constraints
- Browser-based inference (no native apps yet)
- Limited to YOLOv8s model size (browser memory)
- Dependent on Supabase availability
- Maximum image size: 10MB
- PostgreSQL database limitations

### 7.2 Business Constraints
- Free tier limitations (Supabase/Vercel)
- No offline AI inference (requires model download)
- Limited to 3 disease types initially
- English and Tagalog languages only

### 7.3 Regulatory Constraints
- GDPR compliance required
- Data privacy laws (Philippines Data Privacy Act)
- No medical claims (disclaimer required)
- Agricultural guidance only (not diagnostic)

---

**Document Version:** 1.0  
**Last Updated:** November 20, 2025  
**Status:** Complete - Phase 2 Implementation
