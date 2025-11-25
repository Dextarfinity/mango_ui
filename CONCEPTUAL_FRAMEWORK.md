# CONCEPTUAL FRAMEWORK
## Mango Disease Detection System (Scan2Save)

### System Overview
An AI-powered web application for detecting and diagnosing mango leaf diseases using YOLOv8 deep learning model, providing farmers with instant analysis, treatment recommendations, and historical tracking capabilities.

---

## 1. INPUT-PROCESS-OUTPUT (IPO) MODEL

### 📥 INPUT
**User Inputs:**
- **Authentication Data**
  - Email address
  - Password
  - User profile information (name, avatar, language preference)

- **Image Data**
  - Mango leaf photographs (JPEG/PNG format)
  - Captured via camera or uploaded from device
  - Maximum size: 10MB
  - Minimum resolution: 640x640 pixels

- **User Preferences**
  - Language selection (English/Tagalog)
  - Notification settings
  - Location data (optional)

- **Historical Data Access**
  - Scan filtering criteria (all/healthy/diseased)
  - Date range for history view
  - Search parameters

### ⚙️ PROCESS

**1. Authentication & Authorization**
- User registration with email verification
- Secure login with JWT token generation
- Session management and persistence
- Profile creation and management

**2. Image Acquisition & Preprocessing**
- Image capture from device camera
- File upload validation (type, size, format)
- Image conversion to Base64 encoding
- Image resizing to model input dimensions (640x640)
- Quality assessment and optimization

**3. AI/ML Disease Detection**
- Load YOLOv8s pre-trained model (yolov8s.pt)
- Image preprocessing and normalization
- Forward pass through neural network
- Multi-object detection inference
- Confidence threshold filtering (>50%)
- Non-Maximum Suppression (NMS) with IoU threshold (0.45)
- Bounding box generation and classification

**4. Disease Classification & Analysis**
- Class mapping to disease types:
  - Class 0: Die Back (High severity)
  - Class 1: Healthy (No severity)
  - Class 2: Powder Mildew (Medium severity)
- Confidence score calculation (0-100%)
- Severity assessment
- Multiple detection aggregation (1-3 detections per image)

**5. Data Processing & Storage**
- Map detection results to disease database
- Retrieve comprehensive disease information:
  - Symptoms
  - Treatment recommendations
  - Prevention methods
- Generate multiple database records (one per detection)
- Store Base64 image data
- Link to user profile
- Update user statistics (total scans counter)

**6. Results Generation**
- Format detection results for UI display
- Sort detections by confidence (highest first)
- Identify primary detection
- Generate confidence visualization
- Prepare treatment recommendations
- Create downloadable report structure

**7. History & Analytics**
- Group related detections by scan session
- Aggregate statistics calculation:
  - Total scans
  - Healthy vs diseased ratio
  - Disease type distribution
- Time-series data organization
- Filter and search functionality

**8. Real-time Updates**
- WebSocket subscription for live updates
- Database change detection
- UI synchronization
- Notification delivery

### 📤 OUTPUT

**Visual Outputs:**
- **Detection Results Card**
  - Annotated image with bounding boxes
  - Primary disease identification
  - Confidence percentage (with color-coded bar)
  - Severity badge (High/Medium/Low/None)

- **Multiple Detections Display**
  - Grid layout showing all detected conditions (1-3)
  - Individual confidence scores per detection
  - Disease name and description
  - Severity indicators

- **Detailed Information Panels**
  - Common symptoms list (5-8 items)
  - Treatment recommendations (numbered steps)
  - Prevention tips and best practices
  - Important notes and disclaimers

- **Scan History Dashboard**
  - Chronological list of past scans
  - Thumbnail previews
  - Quick stats overview (total/healthy/diseased)
  - Filter controls and search

- **User Profile Interface**
  - Personal information display
  - Avatar customization (12 emoji options)
  - Statistics dashboard
  - Settings controls

**Data Outputs:**
- **Database Records** (PostgreSQL via Supabase)
  - User profile record
  - Multiple scan records (one per detection)
  - Linked disease information
  - Timestamps and metadata

- **Downloadable Reports** (Planned)
  - PDF format scan results
  - Treatment action plan
  - Historical analysis

- **Notifications**
  - Success/error toast messages
  - Processing status updates
  - Authentication confirmations

**API Responses:**
- **JSON Formatted Data**
  ```json
  {
    "id": "uuid",
    "disease": "Disease Name",
    "confidence": 95,
    "severity": "High",
    "allDetections": [
      {
        "disease": "Die Back",
        "confidence": 95,
        "severity": "High"
      },
      {
        "disease": "Powder Mildew",
        "confidence": 87,
        "severity": "Medium"
      }
    ],
    "symptoms": ["symptom1", "symptom2"],
    "treatments": ["treatment1", "treatment2"],
    "model": {
      "name": "YOLOv8s",
      "dataset": "Mango-Leaf-Diseases-v2"
    }
  }
  ```

---

## 2. AGILE DEVELOPMENT APPROACH

### Methodology: Scrum Framework

**Sprint Structure:**
- **Sprint Duration:** 2 weeks
- **Team Size:** 3-5 members (Full-stack developers, ML engineer, QA)
- **Ceremonies:** Daily standups, sprint planning, review, retrospective

### Development Phases

#### **Phase 1: MVP Foundation (Sprints 1-2) - 4 weeks**
**User Stories:**
- ✅ As a user, I want to register and login securely
- ✅ As a user, I want to capture/upload mango leaf images
- ✅ As a user, I want to receive basic disease detection results
- ✅ As a user, I want to view my scan history

**Deliverables:**
- Authentication system (Supabase Auth)
- Basic UI/UX with responsive design
- YOLOv8 model integration (mock inference)
- Database schema implementation
- Single detection per scan

**Sprint 1 Backlog:**
1. Setup project structure (Vite + React)
2. Implement authentication pages (Login/Signup)
3. Create landing page with value proposition
4. Setup Supabase connection
5. Design database schema

**Sprint 2 Backlog:**
1. Build scan page with camera/upload
2. Implement mock disease detection API
3. Create results display page
4. Build history page with filtering
5. Implement user profile management

---

#### **Phase 2: AI Enhancement (Sprints 3-4) - 4 weeks**
**User Stories:**
- ✅ As a user, I want to detect multiple diseases in one image
- ✅ As a user, I want detailed treatment recommendations
- ✅ As a user, I want to see confidence scores for each detection
- ✅ As a user, I want disease information in my language

**Deliverables:**
- Multi-detection capability (1-3 diseases per scan)
- Enhanced YOLOv8 model simulation
- Comprehensive disease database
- Multi-language support (English/Tagalog)
- Improved results visualization

**Sprint 3 Backlog:**
1. Implement multi-detection algorithm
2. Update database to store multiple detections
3. Create all-detections display component
4. Enhance confidence visualization
5. Add severity indicators

**Sprint 4 Backlog:**
1. Build comprehensive disease database
2. Implement i18n (internationalization)
3. Add translation system
4. Create prevention tips sections
5. Improve mobile responsiveness

---

#### **Phase 3: Advanced Features (Sprints 5-6) - 4 weeks**
**User Stories:**
- 🔄 As a user, I want real-time notifications
- 🔄 As a user, I want to download PDF reports
- 🔄 As a user, I want to see analytics and trends
- 🔄 As a user, I want to share results with experts
- 🔄 As a user, I want offline mode capability

**Deliverables:**
- Real-time updates (WebSocket subscriptions)
- PDF report generation
- Analytics dashboard
- Social sharing features
- Progressive Web App (PWA) capabilities

**Sprint 5 Backlog:**
1. Implement real-time database subscriptions
2. Create analytics dashboard
3. Build statistics visualization (charts)
4. Add trend analysis
5. Implement notification system

**Sprint 6 Backlog:**
1. Build PDF report generator
2. Add social sharing functionality
3. Implement PWA features (offline mode)
4. Create export functionality
5. Add email notification system

---

#### **Phase 4: Production & Optimization (Sprints 7-8) - 4 weeks**
**User Stories:**
- 🔄 As a developer, I want optimized performance
- 🔄 As a user, I want faster image processing
- 🔄 As an admin, I want system monitoring
- 🔄 As a user, I want data backup/export

**Deliverables:**
- Real YOLOv8 model integration (ONNX Runtime)
- Performance optimization
- Error handling and logging
- Deployment to production
- Monitoring and analytics

**Sprint 7 Backlog:**
1. Convert YOLOv8 model to ONNX format
2. Integrate ONNX Runtime Web
3. Optimize image preprocessing
4. Implement lazy loading
5. Add performance monitoring

**Sprint 8 Backlog:**
1. Deploy to Vercel/production
2. Setup CI/CD pipeline
3. Implement error tracking (Sentry)
4. Add usage analytics
5. Performance testing and optimization

---

### Agile Artifacts

**Product Backlog (Prioritized):**
1. ✅ User authentication and authorization
2. ✅ Image capture and upload
3. ✅ Disease detection (single)
4. ✅ Results display
5. ✅ Scan history
6. ✅ Multi-detection support
7. ✅ Disease database
8. ✅ Multi-language support
9. 🔄 Real-time updates
10. 🔄 PDF reports
11. 🔄 Analytics dashboard
12. 🔄 PWA features
13. 🔄 Real YOLO model integration
14. 🔄 Performance optimization
15. 🔄 Production deployment

**Definition of Done (DoD):**
- Code reviewed by at least 1 peer
- Unit tests written and passing
- Integration tests passing
- UI responsive on mobile/tablet/desktop
- No critical bugs
- Documentation updated
- Merged to main branch
- Deployed to staging environment

---

### Continuous Improvement Practices

**Code Quality:**
- ESLint + Prettier for code formatting
- Component-based architecture
- Reusable custom hooks
- Context API for state management
- Type checking (PropTypes/JSDoc)

**Testing Strategy:**
- Unit tests for utilities and helpers
- Component testing with React Testing Library
- E2E tests for critical user flows
- Manual QA testing before sprint review

**CI/CD Pipeline:**
- Automated builds on push
- Automated testing
- Staging deployment on merge to main
- Production deployment on release tags

**Monitoring & Feedback:**
- User feedback collection
- Error tracking and logging
- Performance monitoring
- Usage analytics
- Sprint retrospectives for continuous improvement

---

## 3. AGILE PRINCIPLES APPLIED

### 1. **Individuals and Interactions over Processes and Tools**
- Daily standups for team communication
- Pair programming for complex features
- Collaborative decision making
- Open communication channels (Slack/Discord)

### 2. **Working Software over Comprehensive Documentation**
- MVP delivered in 4 weeks
- Incremental feature delivery every 2 weeks
- Working prototypes for stakeholder review
- Demo-driven development

### 3. **Customer Collaboration over Contract Negotiation**
- Farmer/user feedback sessions
- Sprint reviews with stakeholders
- Beta testing program
- User acceptance testing (UAT)

### 4. **Responding to Change over Following a Plan**
- Flexible sprint planning
- Backlog refinement based on feedback
- Pivot capability for new requirements
- Iterative improvement cycles

---

## 4. RISK MANAGEMENT (AGILE)

**Technical Risks:**
| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Model accuracy issues | Medium | High | Start with mock API, iterate on real model |
| Browser compatibility | Low | Medium | Cross-browser testing in each sprint |
| Performance bottlenecks | Medium | Medium | Performance monitoring, lazy loading |
| API rate limiting | Low | High | Implement caching, optimize API calls |

**Process Risks:**
| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Scope creep | High | High | Strict sprint planning, clear DoD |
| Team capacity issues | Medium | Medium | Buffer stories, flexible sprint goals |
| Dependency delays | Low | Medium | Identify dependencies early |

---

## 5. SUCCESS METRICS (KPIs)

**Development Metrics:**
- Sprint velocity: 20-30 story points per sprint
- Code coverage: >70%
- Bug escape rate: <5% per sprint
- Sprint completion rate: >85%

**Product Metrics:**
- Detection accuracy: >90%
- User satisfaction: >4.5/5 stars
- Scan completion rate: >95%
- Mobile responsiveness score: >90/100

**Business Metrics:**
- User adoption rate
- Daily active users (DAU)
- Scan frequency per user
- Feature usage analytics

---

**Legend:**
- ✅ Completed
- 🔄 In Progress/Planned
- ⏳ Backlog

**Last Updated:** November 20, 2025
**Version:** 1.0
**Status:** Phase 2 Complete, Phase 3 Planned
