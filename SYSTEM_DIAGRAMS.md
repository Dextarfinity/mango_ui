# SYSTEM DIAGRAMS AND DOCUMENTATION
## Mango Disease Detection System (Scan2Save)

---

## 1. SYSTEM FLOWCHARTS

### 1.1 Main System Flowchart

```mermaid
flowchart TD
    Start([User Opens Application]) --> CheckAuth{Is User<br/>Authenticated?}
    
    CheckAuth -->|No| Landing[Display Landing Page]
    Landing --> AuthChoice{User Action?}
    AuthChoice -->|Sign Up| SignUp[Sign Up Form]
    AuthChoice -->|Sign In| SignIn[Sign In Form]
    
    SignUp --> ValidateSignUp{Valid<br/>Credentials?}
    ValidateSignUp -->|No| SignUpError[Show Error Message]
    SignUpError --> SignUp
    ValidateSignUp -->|Yes| CreateUser[Create User Account<br/>in Supabase]
    CreateUser --> CreateProfile[Create User Profile<br/>in Database]
    CreateProfile --> Dashboard
    
    SignIn --> ValidateSignIn{Valid<br/>Credentials?}
    ValidateSignIn -->|No| SignInError[Show Error Message]
    SignInError --> SignIn
    ValidateSignIn -->|Yes| LoadSession[Load User Session]
    LoadSession --> Dashboard
    
    CheckAuth -->|Yes| Dashboard[Display Dashboard]
    Dashboard --> MainMenu{User<br/>Selection?}
    
    MainMenu -->|Scan| ScanPage[Navigate to Scan Page]
    MainMenu -->|History| HistoryPage[Navigate to History Page]
    MainMenu -->|Profile| ProfilePage[Navigate to Profile Page]
    MainMenu -->|Logout| Logout[Sign Out]
    Logout --> Landing
    
    ScanPage --> ScanChoice{Image Source?}
    ScanChoice -->|Camera| CaptureImage[Open Camera<br/>Capture Image]
    ScanChoice -->|Upload| UploadImage[Open File Picker<br/>Select Image]
    
    CaptureImage --> ValidateImage{Valid Image?}
    UploadImage --> ValidateImage
    ValidateImage -->|No| ImageError[Show Error<br/>Invalid Format/Size]
    ImageError --> ScanPage
    
    ValidateImage -->|Yes| PreviewImage[Display Image Preview]
    PreviewImage --> StartAnalysis[User Clicks Analyze]
    StartAnalysis --> ProcessImage[Convert to Base64<br/>Resize to 640x640]
    ProcessImage --> LoadModel{YOLO Model<br/>Loaded?}
    
    LoadModel -->|No| LoadYOLO[Load YOLOv8s Model<br/>yolov8s.pt]
    LoadYOLO --> LoadModel
    LoadModel -->|Yes| RunInference[Run AI Inference<br/>Detect Diseases]
    
    RunInference --> DetectObjects[Detect Objects<br/>Apply NMS Filter<br/>Confidence > 50%]
    DetectObjects --> CountDetections{Number of<br/>Detections?}
    
    CountDetections -->|1-3| ClassifyAll[Classify All Detections<br/>Die Back/Healthy/Powder Mildew]
    CountDetections -->|0| NoDetection[No Disease Detected<br/>Show Error]
    NoDetection --> ScanPage
    
    ClassifyAll --> MapDisease[Map to Disease Database<br/>Get Symptoms & Treatments]
    MapDisease --> SaveMultiple[Save All Detections<br/>to Database<br/>Separate Records]
    
    SaveMultiple --> UpdateStats[Update User Statistics<br/>Increment Total Scans]
    UpdateStats --> ResultsPage[Display Results Page]
    
    ResultsPage --> ShowPrimary[Show Primary Detection<br/>Highest Confidence]
    ShowPrimary --> ShowAll[Show All Detections Grid<br/>1-3 Diseases]
    ShowAll --> ShowDetails[Show Symptoms<br/>Treatments<br/>Prevention]
    ShowDetails --> ResultAction{User Action?}
    
    ResultAction -->|Download| GeneratePDF[Generate PDF Report]
    GeneratePDF --> ResultsPage
    ResultAction -->|New Scan| ScanPage
    ResultAction -->|View History| HistoryPage
    
    HistoryPage --> LoadHistory[Load All Scans<br/>Group by Session]
    LoadHistory --> FilterHistory{Apply Filter?}
    FilterHistory -->|All| ShowAll2[Display All Scans]
    FilterHistory -->|Healthy| ShowHealthy[Display Healthy Only]
    FilterHistory -->|Diseased| ShowDiseased[Display Diseased Only]
    
    ShowAll2 --> SelectScan{User Selects<br/>Scan?}
    ShowHealthy --> SelectScan
    ShowDiseased --> SelectScan
    
    SelectScan -->|Yes| ViewResult[View Scan Details]
    ViewResult --> ResultsPage
    SelectScan -->|Delete| ConfirmDelete{Confirm<br/>Delete?}
    ConfirmDelete -->|Yes| DeleteAll[Delete All Related<br/>Detection Records]
    DeleteAll --> HistoryPage
    ConfirmDelete -->|No| HistoryPage
    SelectScan -->|Back| MainMenu
    
    ProfilePage --> ShowProfile[Display User Info<br/>Statistics<br/>Settings]
    ShowProfile --> ProfileAction{User Action?}
    ProfileAction -->|Edit Profile| EditProfile[Update Name/Avatar]
    EditProfile --> SaveProfile[Save to Database]
    SaveProfile --> ProfilePage
    ProfileAction -->|Change Language| ChangeLanguage[Toggle EN/TL]
    ChangeLanguage --> ProfilePage
    ProfileAction -->|Back| MainMenu
    
    style Start fill:#4CAF50
    style Dashboard fill:#2196F3
    style RunInference fill:#FF9800
    style SaveMultiple fill:#9C27B0
    style ResultsPage fill:#4CAF50
```

---

### 1.2 Authentication Flowchart

```mermaid
flowchart TD
    Start([Authentication Required]) --> CheckSession{Session<br/>Exists?}
    
    CheckSession -->|Yes| ValidateToken{Token<br/>Valid?}
    ValidateToken -->|Yes| LoadUser[Load User Data<br/>from Supabase]
    LoadUser --> SetAuthState[Set Authentication<br/>Context State]
    SetAuthState --> Success([Authenticated])
    
    ValidateToken -->|No| ClearSession[Clear Invalid Session]
    ClearSession --> ShowLogin
    
    CheckSession -->|No| ShowLogin[Display Login Page]
    ShowLogin --> UserChoice{User Action?}
    
    UserChoice -->|Sign Up| SignUpForm[Display Sign Up Form]
    SignUpForm --> GetSignUpData[Collect:<br/>- Email<br/>- Password<br/>- Name]
    GetSignUpData --> ValidateSignUp{Validate<br/>Input?}
    
    ValidateSignUp -->|Invalid| ShowSignUpError[Show Validation Error:<br/>- Email format<br/>- Password strength<br/>- Required fields]
    ShowSignUpError --> SignUpForm
    
    ValidateSignUp -->|Valid| CallSignUp[Call Supabase<br/>signUp API]
    CallSignUp --> SignUpSuccess{Success?}
    
    SignUpSuccess -->|No| ShowSignUpAPIError[Show Error:<br/>- Email exists<br/>- Network error]
    ShowSignUpAPIError --> SignUpForm
    
    SignUpSuccess -->|Yes| CreateUserRecord[Create User Record<br/>in users Table]
    CreateUserRecord --> SetDefaultProfile[Set Default Values:<br/>- Avatar: 👨‍🌾<br/>- Language: en<br/>- Total Scans: 0]
    SetDefaultProfile --> SendVerification[Send Verification Email]
    SendVerification --> AutoLogin[Auto Login User]
    AutoLogin --> Success
    
    UserChoice -->|Sign In| SignInForm[Display Sign In Form]
    SignInForm --> GetSignInData[Collect:<br/>- Email<br/>- Password]
    GetSignInData --> ValidateSignIn{Validate<br/>Input?}
    
    ValidateSignIn -->|Invalid| ShowSignInError[Show Validation Error]
    ShowSignInError --> SignInForm
    
    ValidateSignIn -->|Valid| CallSignIn[Call Supabase<br/>signInWithPassword API]
    CallSignIn --> SignInSuccess{Success?}
    
    SignInSuccess -->|No| ShowSignInAPIError[Show Error:<br/>- Invalid credentials<br/>- Account not found<br/>- Network error]
    ShowSignInAPIError --> SignInForm
    
    SignInSuccess -->|Yes| CreateSession[Create Session<br/>Store JWT Token]
    CreateSession --> LoadUserProfile[Load User Profile<br/>from Database]
    LoadUserProfile --> SetAuthState
    
    style Success fill:#4CAF50
    style ShowSignUpError fill:#F44336
    style ShowSignInError fill:#F44336
    style ShowSignUpAPIError fill:#F44336
    style ShowSignInAPIError fill:#F44336
```

---

### 1.3 Disease Detection Flowchart (Detailed)

```mermaid
flowchart TD
    Start([Image Uploaded/Captured]) --> ValidateFile{Validate File}
    
    ValidateFile -->|Invalid Type| ErrorType[Error: Invalid File Type<br/>Accept: JPEG, PNG, WebP]
    ErrorType --> End1([Return to Scan Page])
    
    ValidateFile -->|Too Large| ErrorSize[Error: File Too Large<br/>Max: 10MB]
    ErrorSize --> End1
    
    ValidateFile -->|Valid| ConvertBase64[Convert Image<br/>to Base64 String]
    ConvertBase64 --> ShowPreview[Display Image Preview<br/>Show Analyze Button]
    
    ShowPreview --> UserAnalyze{User Clicks<br/>Analyze}
    UserAnalyze -->|Cancel| ResetImage[Clear Image<br/>Reset State]
    ResetImage --> End1
    
    UserAnalyze -->|Analyze| StartProgress[Show Progress Bar<br/>0%]
    StartProgress --> CheckModel{Model<br/>Loaded?}
    
    CheckModel -->|No| InitModel[Initialize YOLOv8 Model]
    InitModel --> LoadWeights[Load Model Weights<br/>yolov8s.pt]
    LoadWeights --> SetConfig[Set Config:<br/>- Input: 640x640<br/>- Conf Threshold: 0.5<br/>- IoU Threshold: 0.45]
    SetConfig --> Progress25[Update Progress: 25%]
    Progress25 --> CheckModel
    
    CheckModel -->|Yes| PreprocessImage[Preprocess Image:<br/>1. Resize to 640x640<br/>2. Normalize pixels<br/>3. Convert to tensor]
    PreprocessImage --> Progress50[Update Progress: 50%]
    
    Progress50 --> RunModel[Run YOLO Inference<br/>Forward Pass]
    RunModel --> GetPredictions[Get Raw Predictions:<br/>- Bounding boxes<br/>- Class probabilities<br/>- Confidence scores]
    GetPredictions --> Progress75[Update Progress: 75%]
    
    Progress75 --> ApplyNMS[Apply Non-Max Suppression<br/>Remove Overlapping Boxes<br/>IoU < 0.45]
    ApplyNMS --> FilterConfidence[Filter Detections<br/>Confidence > 50%]
    
    FilterConfidence --> CountResults{Number of<br/>Detections?}
    
    CountResults -->|0| NoDetection[No Disease Detected]
    NoDetection --> ShowNoDetectionError[Show Error Message:<br/>Try different image]
    ShowNoDetectionError --> End1
    
    CountResults -->|1-3| SortByConfidence[Sort Detections<br/>By Confidence Descending]
    CountResults -->|> 3| LimitDetections[Keep Top 3<br/>Highest Confidence]
    LimitDetections --> SortByConfidence
    
    SortByConfidence --> MapClasses[Map Class Indices:<br/>0 → Die Back<br/>1 → Healthy<br/>2 → Powder Mildew]
    
    MapClasses --> GetDiseaseInfo[Get Disease Info<br/>from Database:<br/>- Symptoms<br/>- Treatments<br/>- Prevention<br/>- Description]
    
    GetDiseaseInfo --> CreateRecords[Create Detection Objects:<br/>For Each Detection:<br/>- Disease ID<br/>- Disease Name<br/>- Confidence %<br/>- Severity<br/>- Bbox Coordinates]
    
    CreateRecords --> Progress90[Update Progress: 90%]
    Progress90 --> SaveToDB[Save to Database]
    
    SaveToDB --> Loop1{For Each<br/>Detection}
    Loop1 -->|Next| InsertRecord[Insert Scan Record:<br/>- user_id<br/>- disease_id<br/>- disease_name<br/>- confidence<br/>- severity<br/>- image_url (Base64)<br/>- location<br/>- model metadata]
    InsertRecord --> Loop1
    
    Loop1 -->|Done| UpdateUserStats[Update User Record:<br/>Increment total_scans]
    UpdateUserStats --> Progress100[Update Progress: 100%]
    
    Progress100 --> PrepareResults[Prepare Results Object:<br/>- Primary Detection<br/>- All Detections Array<br/>- Scan IDs Array<br/>- Model Metadata]
    
    PrepareResults --> NavigateResults[Navigate to<br/>Results Page]
    NavigateResults --> End2([Show Results])
    
    style Start fill:#4CAF50
    style RunModel fill:#FF9800
    style SaveToDB fill:#9C27B0
    style End2 fill:#4CAF50
    style ErrorType fill:#F44336
    style ErrorSize fill:#F44336
    style NoDetection fill:#FF9800
```

---

### 1.4 Database Operations Flowchart

```mermaid
flowchart TD
    Start([Database Operation]) --> OpType{Operation<br/>Type?}
    
    OpType -->|Save Scan| SaveStart[Receive Scan Data]
    SaveStart --> CheckDetections{Multiple<br/>Detections?}
    
    CheckDetections -->|No| CreateSingle[Create Single<br/>Scan Record]
    CreateSingle --> InsertSingle[INSERT INTO scans<br/>VALUES ...]
    InsertSingle --> TriggerCount1[Trigger: update_user_total_scans<br/>Increment by 1]
    TriggerCount1 --> ReturnSingle[Return Scan ID]
    ReturnSingle --> End1([Success])
    
    CheckDetections -->|Yes| CreateMultiple[Create Multiple<br/>Scan Records]
    CreateMultiple --> LoopInsert{For Each<br/>Detection}
    
    LoopInsert -->|Next| InsertOne[INSERT INTO scans<br/>Same image_url<br/>Same user_id<br/>Different disease_id<br/>Different confidence]
    InsertOne --> LoopInsert
    
    LoopInsert -->|Done| TriggerCountMulti[Trigger Fires N times<br/>Increment total_scans by N]
    TriggerCountMulti --> ReturnMultiple[Return Array of Scan IDs]
    ReturnMultiple --> End1
    
    OpType -->|Load History| LoadStart[Receive User ID]
    LoadStart --> QueryScans[SELECT * FROM scans<br/>WHERE user_id = ?<br/>ORDER BY analyzed_at DESC]
    QueryScans --> GroupScans[Group By:<br/>image_url + timestamp<br/>Within 1 second]
    
    GroupScans --> LoopGroups{For Each<br/>Group}
    LoopGroups -->|Next| SortGroup[Sort Group By<br/>Confidence DESC]
    SortGroup --> SetPrimary[First = Primary Detection]
    SetPrimary --> CreateScanObject[Create Scan Object:<br/>- Primary data<br/>- allDetections array<br/>- scanIds array]
    CreateScanObject --> LoopGroups
    
    LoopGroups -->|Done| SortByDate[Sort All Scans<br/>By Date DESC]
    SortByDate --> ReturnHistory[Return Scan History Array]
    ReturnHistory --> End1
    
    OpType -->|Delete Scan| DeleteStart[Receive Scan ID]
    DeleteStart --> FindScan[Find Scan in History]
    FindScan --> HasScanIds{Has scanIds<br/>Array?}
    
    HasScanIds -->|Yes| LoopDelete{For Each<br/>Scan ID}
    LoopDelete -->|Next| DeleteOne[DELETE FROM scans<br/>WHERE id = ?]
    DeleteOne --> TriggerDelete1[Trigger: update_user_total_scans<br/>Decrement by 1]
    TriggerDelete1 --> LoopDelete
    LoopDelete -->|Done| End1
    
    HasScanIds -->|No| DeleteSingle[DELETE FROM scans<br/>WHERE id = ?]
    DeleteSingle --> TriggerDeleteSingle[Trigger: update_user_total_scans<br/>Decrement by 1]
    TriggerDeleteSingle --> End1
    
    OpType -->|Update Profile| UpdateStart[Receive User ID<br/>+ Update Data]
    UpdateStart --> ValidateUpdate{Valid<br/>Fields?}
    ValidateUpdate -->|No| ErrorUpdate[Return Error]
    ErrorUpdate --> End2([Error])
    
    ValidateUpdate -->|Yes| UpdateRecord[UPDATE users<br/>SET name=?, avatar=?<br/>WHERE id = ?]
    UpdateRecord --> TriggerUpdate[Trigger: update_updated_at<br/>Set updated_at = NOW()]
    TriggerUpdate --> ReturnUpdated[Return Updated User]
    ReturnUpdated --> End1
    
    OpType -->|Get Disease Info| DiseaseStart[Receive Disease ID]
    DiseaseStart --> QueryDisease[SELECT * FROM diseases<br/>WHERE id = ?]
    QueryDisease --> CheckExists{Disease<br/>Exists?}
    CheckExists -->|No| ErrorNotFound[Return 404 Error]
    ErrorNotFound --> End2
    
    CheckExists -->|Yes| ReturnDisease[Return Disease Object:<br/>- Symptoms array<br/>- Treatments array<br/>- Prevention text<br/>- Description]
    ReturnDisease --> End1
    
    style End1 fill:#4CAF50
    style End2 fill:#F44336
    style TriggerCount1 fill:#FF9800
    style TriggerCountMulti fill:#FF9800
    style TriggerDelete1 fill:#FF9800
```

---

## 2. USE CASE DIAGRAM

```mermaid
graph TB
    subgraph "Mango Disease Detection System"
        subgraph "User Management"
            UC1[Register Account]
            UC2[Login]
            UC3[Logout]
            UC4[Update Profile]
            UC5[Change Language]
        end
        
        subgraph "Disease Detection"
            UC6[Capture Image]
            UC7[Upload Image]
            UC8[Analyze Image]
            UC9[View Detection Results]
            UC10[View Multiple Detections]
        end
        
        subgraph "Scan Management"
            UC11[View Scan History]
            UC12[Filter Scans]
            UC13[View Scan Details]
            UC14[Delete Scan]
            UC15[Download Report]
        end
        
        subgraph "Information Access"
            UC16[View Disease Information]
            UC17[View Symptoms]
            UC18[View Treatments]
            UC19[View Prevention Tips]
        end
        
        subgraph "Statistics"
            UC20[View Scan Statistics]
            UC21[View Health Rate]
        end
    end
    
    User([👤 Farmer/User])
    Admin([👨‍💼 Admin])
    YOLOModel([🤖 YOLO Model])
    Database([💾 Database])
    AuthSystem([🔐 Auth System])
    
    User --> UC1
    User --> UC2
    User --> UC3
    User --> UC4
    User --> UC5
    User --> UC6
    User --> UC7
    User --> UC8
    User --> UC9
    User --> UC10
    User --> UC11
    User --> UC12
    User --> UC13
    User --> UC14
    User --> UC15
    User --> UC16
    User --> UC17
    User --> UC18
    User --> UC19
    User --> UC20
    User --> UC21
    
    Admin --> UC1
    Admin --> UC2
    Admin --> UC11
    Admin --> UC20
    
    UC1 --> AuthSystem
    UC2 --> AuthSystem
    UC3 --> AuthSystem
    
    UC4 --> Database
    UC5 --> Database
    
    UC8 --> YOLOModel
    UC8 --> Database
    UC9 --> Database
    UC10 --> Database
    
    UC11 --> Database
    UC12 --> Database
    UC13 --> Database
    UC14 --> Database
    
    UC16 --> Database
    UC17 --> Database
    UC18 --> Database
    UC19 --> Database
    
    UC20 --> Database
    UC21 --> Database
    
    style User fill:#4CAF50
    style Admin fill:#2196F3
    style YOLOModel fill:#FF9800
    style Database fill:#9C27B0
    style AuthSystem fill:#F44336
```

---

## 3. DATA FLOW DIAGRAMS (DFD)

### 3.1 Context Diagram (Level 0)

```mermaid
flowchart LR
    User([👤 User/Farmer])
    Admin([👨‍💼 Administrator])
    
    System[Mango Disease<br/>Detection System<br/>Scan2Save]
    
    YOLOModel[(🤖 YOLOv8<br/>Model)]
    Database[(💾 PostgreSQL<br/>Database)]
    AuthService[(🔐 Supabase<br/>Auth)]
    
    User -->|Login Credentials| System
    User -->|Mango Leaf Images| System
    User -->|Profile Updates| System
    User -->|Filter/Search Requests| System
    
    System -->|Authentication Token| User
    System -->|Detection Results| User
    System -->|Scan History| User
    System -->|Disease Information| User
    System -->|Statistics| User
    
    Admin -->|Login Credentials| System
    System -->|System Reports| Admin
    System -->|User Analytics| Admin
    
    System -->|Auth Requests| AuthService
    AuthService -->|Auth Tokens| System
    
    System -->|Image Data| YOLOModel
    YOLOModel -->|Predictions| System
    
    System -->|Store Data| Database
    Database -->|Retrieve Data| System
    
    style System fill:#2196F3
    style User fill:#4CAF50
    style Admin fill:#FF9800
```

---

### 3.2 Level 1 DFD - Major Processes

```mermaid
flowchart TB
    User([👤 User])
    
    P1[1.0<br/>Authentication<br/>Management]
    P2[2.0<br/>Disease<br/>Detection]
    P3[3.0<br/>Scan<br/>Management]
    P4[4.0<br/>Profile<br/>Management]
    P5[5.0<br/>Information<br/>Retrieval]
    
    D1[(D1: Users)]
    D2[(D2: Scans)]
    D3[(D3: Diseases)]
    
    AuthService[(Supabase Auth)]
    YOLOModel[(YOLOv8 Model)]
    
    User -->|Login/Signup Data| P1
    P1 -->|Auth Request| AuthService
    AuthService -->|Auth Token| P1
    P1 -->|Auth Response| User
    P1 -->|User Info| D1
    D1 -->|User Data| P1
    
    User -->|Leaf Image| P2
    P2 -->|Image Data| YOLOModel
    YOLOModel -->|Detection Results| P2
    P2 -->|Disease ID| D3
    D3 -->|Disease Info| P2
    P2 -->|Detection Data| D2
    P2 -->|Results| User
    P2 -->|Update Stats| D1
    
    User -->|History Request| P3
    D2 -->|Scan Records| P3
    P3 -->|Scan History| User
    User -->|Delete Request| P3
    P3 -->|Delete Command| D2
    P3 -->|Update Stats| D1
    
    User -->|Profile Data| P4
    P4 -->|Update Request| D1
    D1 -->|Current Profile| P4
    P4 -->|Updated Profile| User
    
    User -->|Disease Query| P5
    D3 -->|Disease Details| P5
    D2 -->|Statistics| P5
    D1 -->|User Stats| P5
    P5 -->|Information| User
    
    style P1 fill:#F44336
    style P2 fill:#FF9800
    style P3 fill:#4CAF50
    style P4 fill:#2196F3
    style P5 fill:#9C27B0
```

---

### 3.3 Level 2 DFD - Disease Detection Process (Process 2.0)

```mermaid
flowchart TB
    User([👤 User])
    
    P21[2.1<br/>Image<br/>Validation]
    P22[2.2<br/>Image<br/>Preprocessing]
    P23[2.3<br/>YOLO<br/>Inference]
    P24[2.4<br/>Post-<br/>Processing]
    P25[2.5<br/>Disease<br/>Mapping]
    P26[2.6<br/>Data<br/>Storage]
    P27[2.7<br/>Results<br/>Formatting]
    
    D2[(D2: Scans)]
    D3[(D3: Diseases)]
    D1[(D1: Users)]
    YOLOModel[(YOLOv8 Model)]
    
    User -->|Raw Image| P21
    
    P21 -->|Validation Error| User
    P21 -->|Valid Image| P22
    
    P22 -->|Base64 Image| P22
    P22 -->|Resized Image<br/>640x640| P23
    
    P23 -->|Image Tensor| YOLOModel
    YOLOModel -->|Raw Predictions<br/>Bboxes + Classes| P23
    
    P23 -->|Predictions| P24
    
    P24 -->|Apply NMS<br/>Filter Confidence| P24
    P24 -->|1-3 Detections| P25
    
    P25 -->|Disease ID| D3
    D3 -->|Disease Details<br/>Symptoms<br/>Treatments| P25
    
    P25 -->|Enriched Detection Data| P26
    
    P26 -->|For Each Detection| P26
    P26 -->|Insert Records| D2
    P26 -->|Update Count| D1
    D2 -->|Saved IDs| P26
    
    P26 -->|All Scan IDs| P27
    P25 -->|Disease Info| P27
    
    P27 -->|Formatted Results<br/>Primary + All Detections| User
    
    style P23 fill:#FF9800
    style P26 fill:#4CAF50
```

---

### 3.4 Level 2 DFD - Scan Management Process (Process 3.0)

```mermaid
flowchart TB
    User([👤 User])
    
    P31[3.1<br/>Load<br/>History]
    P32[3.2<br/>Group<br/>Scans]
    P33[3.3<br/>Filter<br/>Scans]
    P34[3.4<br/>Display<br/>Scans]
    P35[3.5<br/>Delete<br/>Scan]
    P36[3.6<br/>Calculate<br/>Statistics]
    
    D1[(D1: Users)]
    D2[(D2: Scans)]
    
    User -->|User ID| P31
    
    P31 -->|Query User Scans| D2
    D2 -->|All Scan Records| P31
    
    P31 -->|Raw Scan List| P32
    
    P32 -->|Group by Image+Time| P32
    P32 -->|Grouped Scans| P33
    
    User -->|Filter: All/Healthy/Diseased| P33
    P33 -->|Apply Filter| P33
    P33 -->|Filtered Scans| P34
    
    P34 -->|Formatted History| User
    
    User -->|Delete Scan ID| P35
    P34 -->|Selected Scan<br/>with scanIds| P35
    
    P35 -->|Loop Delete| D2
    P35 -->|Update Count| D1
    P35 -->|Confirmation| User
    
    User -->|Stats Request| P36
    D2 -->|All User Scans| P36
    D1 -->|User Info| P36
    
    P36 -->|Calculate<br/>Total/Healthy/Diseased<br/>Health Rate| P36
    P36 -->|Statistics| User
    
    style P32 fill:#FF9800
    style P35 fill:#F44336
    style P36 fill:#2196F3
```

---

## 4. ENTITY RELATIONSHIP DIAGRAM (ERD)

```mermaid
erDiagram
    USERS ||--o{ SCANS : "performs"
    SCANS }o--|| DISEASES : "identifies"
    
    USERS {
        uuid id PK
        varchar email UK
        varchar name
        varchar avatar
        timestamp join_date
        integer total_scans
        varchar language
        boolean notifications
        timestamp created_at
        timestamp updated_at
    }
    
    SCANS {
        uuid id PK
        uuid user_id FK
        varchar disease_id FK
        varchar disease_name
        decimal confidence
        varchar severity
        text image_url
        varchar location
        timestamp analyzed_at
        varchar model_name
        varchar model_path
        varchar model_dataset
        varchar model_version
        timestamp created_at
        timestamp updated_at
    }
    
    DISEASES {
        varchar id PK
        varchar disease_name
        text description
        varchar severity
        text_array symptoms
        text_array treatments
        text prevention
        timestamp created_at
        timestamp updated_at
    }
```

**Cardinality:**
- One USER can have MANY SCANS (1:N)
- One SCAN identifies ONE DISEASE (N:1)
- One DISEASE can be identified in MANY SCANS (1:N)

**Relationships:**
1. **USERS ↔ SCANS**: One-to-Many
   - A user can perform multiple scans
   - Each scan belongs to exactly one user
   - Cascade delete: When user is deleted, all their scans are deleted

2. **SCANS ↔ DISEASES**: Many-to-One
   - Multiple scans can identify the same disease
   - Each scan record identifies exactly one disease
   - For multi-detection scans, multiple scan records are created
   - Each scan record shares the same image_url but different disease_id

---

## 5. SYSTEM ARCHITECTURE DIAGRAM

```mermaid
graph TB
    subgraph "Client Layer"
        Browser[Web Browser]
        PWA[Progressive Web App]
        Mobile[Mobile Device]
    end
    
    subgraph "Presentation Layer - React Frontend"
        Pages[Pages Layer]
        Components[Components Layer]
        Hooks[Custom Hooks]
        Context[Context/State Management]
        
        Pages --> Components
        Components --> Hooks
        Components --> Context
    end
    
    subgraph "Business Logic Layer"
        AuthLogic[Authentication Logic]
        ScanLogic[Scan Processing Logic]
        ImageLogic[Image Processing Logic]
        AILogic[AI Inference Logic]
        HistoryLogic[History Management Logic]
    end
    
    subgraph "AI/ML Layer"
        YOLOModel[YOLOv8s Model<br/>yolov8s.pt]
        ModelLoader[Model Loader]
        Inference[Inference Engine]
        PostProcess[Post-Processing<br/>NMS, Filtering]
    end
    
    subgraph "Data Access Layer"
        SupabaseClient[Supabase Client]
        APIHelpers[API Helpers]
        CacheLayer[Local Cache<br/>Session Storage]
    end
    
    subgraph "Backend Services - Supabase"
        Auth[Supabase Auth<br/>JWT Authentication]
        Database[PostgreSQL Database]
        Storage[Storage Buckets]
        Realtime[Realtime Subscriptions]
    end
    
    subgraph "Database Layer"
        UsersTable[(users Table)]
        ScansTable[(scans Table)]
        DiseasesTable[(diseases Table)]
        Triggers[Database Triggers<br/>Functions]
    end
    
    Browser --> Pages
    PWA --> Pages
    Mobile --> Pages
    
    Pages --> AuthLogic
    Pages --> ScanLogic
    Pages --> HistoryLogic
    
    ScanLogic --> ImageLogic
    ScanLogic --> AILogic
    
    AILogic --> YOLOModel
    YOLOModel --> ModelLoader
    ModelLoader --> Inference
    Inference --> PostProcess
    
    AuthLogic --> SupabaseClient
    ScanLogic --> SupabaseClient
    HistoryLogic --> SupabaseClient
    
    SupabaseClient --> APIHelpers
    APIHelpers --> CacheLayer
    
    SupabaseClient --> Auth
    SupabaseClient --> Database
    SupabaseClient --> Storage
    SupabaseClient --> Realtime
    
    Database --> UsersTable
    Database --> ScansTable
    Database --> DiseasesTable
    Database --> Triggers
    
    style Pages fill:#2196F3
    style YOLOModel fill:#FF9800
    style Database fill:#4CAF50
    style Auth fill:#F44336
```

---

## 6. SEQUENCE DIAGRAMS

### 6.1 User Registration Sequence

```mermaid
sequenceDiagram
    actor User
    participant UI as Sign Up Page
    participant Context as AuthContext
    participant Supabase as Supabase Auth
    participant DB as Database
    
    User->>UI: Enter email, password, name
    User->>UI: Click "Sign Up"
    UI->>UI: Validate input
    
    alt Invalid Input
        UI->>User: Show validation errors
    else Valid Input
        UI->>Context: signUp(email, password, name)
        Context->>Supabase: auth.signUp({email, password, metadata})
        
        alt Email Already Exists
            Supabase-->>Context: Error: Email exists
            Context-->>UI: Return error
            UI->>User: Show error message
        else Success
            Supabase->>Supabase: Create auth user
            Supabase->>Supabase: Send verification email
            Supabase-->>Context: Return user data + session
            
            Context->>DB: Insert into users table
            DB->>DB: Set defaults (avatar, language, total_scans=0)
            DB-->>Context: User record created
            
            Context->>Context: Set auth state
            Context-->>UI: Success
            UI->>User: Redirect to Dashboard
        end
    end
```

---

### 6.2 Disease Detection Sequence

```mermaid
sequenceDiagram
    actor User
    participant UI as Scan Page
    participant Context as ScanContext
    participant ImageProc as Image Processor
    participant YOLO as YOLO Model
    participant DB as Database
    participant Results as Results Page
    
    User->>UI: Upload/Capture image
    UI->>UI: Validate file (type, size)
    UI->>ImageProc: Convert to Base64
    ImageProc-->>UI: Base64 string
    UI->>User: Show preview
    
    User->>UI: Click "Analyze"
    UI->>Context: analyzeImage(base64Data)
    Context->>UI: Update progress (25%)
    
    Context->>YOLO: Check if model loaded
    alt Model Not Loaded
        YOLO->>YOLO: Load yolov8s.pt
        YOLO->>YOLO: Initialize config
    end
    
    Context->>UI: Update progress (50%)
    Context->>ImageProc: Preprocess image (resize 640x640)
    ImageProc-->>Context: Processed tensor
    
    Context->>YOLO: runInference(imageTensor)
    YOLO->>YOLO: Forward pass
    YOLO->>YOLO: Get predictions
    YOLO->>YOLO: Apply NMS (IoU < 0.45)
    YOLO->>YOLO: Filter confidence (> 50%)
    YOLO->>YOLO: Limit to top 3 detections
    YOLO-->>Context: Detection results (1-3 detections)
    
    Context->>UI: Update progress (75%)
    
    loop For each detection
        Context->>DB: Query diseases table
        DB-->>Context: Disease details (symptoms, treatments)
    end
    
    Context->>UI: Update progress (90%)
    
    Context->>DB: saveScan(scanData with allDetections)
    
    loop For each detection
        DB->>DB: INSERT INTO scans
        DB->>DB: Trigger: Increment total_scans
    end
    
    DB-->>Context: Array of scan IDs
    
    Context->>Context: Group results (primary + all detections)
    Context->>UI: Update progress (100%)
    Context-->>UI: Return scan object with scanIds
    
    UI->>Results: Navigate with scan ID
    Results->>Context: getScanById(id)
    Context-->>Results: Scan with allDetections array
    Results->>User: Display results (primary + all detections grid)
```

---

### 6.3 Load Scan History Sequence

```mermaid
sequenceDiagram
    actor User
    participant UI as History Page
    participant Context as ScanContext
    participant DB as Database
    
    User->>UI: Navigate to History
    UI->>Context: loadHistory(userId)
    
    Context->>DB: SELECT * FROM scans WHERE user_id = ?
    DB-->>Context: All scan records (unsorted)
    
    Context->>Context: Group scans by (image_url + timestamp)
    
    loop For each group
        Context->>Context: Sort by confidence DESC
        Context->>Context: Set first as primary
        Context->>Context: Create allDetections array
        Context->>Context: Create scanIds array
        Context->>Context: Build scan object
    end
    
    Context->>Context: Sort all scans by date DESC
    Context-->>UI: Return formatted scan history
    
    UI->>User: Display scan list with filters
    
    User->>UI: Apply filter (All/Healthy/Diseased)
    UI->>UI: Filter scans locally
    UI->>User: Show filtered results
    
    User->>UI: Click on scan
    UI->>UI: Navigate to Results page
```

---

**Document Version:** 1.0  
**Last Updated:** November 20, 2025  
**Created By:** System Analysis Team
