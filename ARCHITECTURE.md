# 🏗️ Component Architecture - Scan2Save

## Overview
This document explains the clean, modular architecture of the Scan2Save application.

## Design Principles

### 1. Single Responsibility
Each component has ONE clear purpose:
- `Button.jsx` - Only handles button rendering and variants
- `Card.jsx` - Only handles card layouts
- `AuthContext.jsx` - Only manages authentication state

### 2. Reusability
Common components are extracted and reused:
```
Button → Used in 15+ places
Card → Used in 10+ places
Input → Used in forms across the app
Modal → Used for dialogs and overlays
```

### 3. Separation of Concerns
- **UI Components** (`components/common/`) - Pure presentation
- **Layout Components** (`components/layout/`) - App structure
- **Pages** (`pages/`) - Route-specific content
- **Context** (`context/`) - Global state management
- **Utils** (`utils/`) - Business logic and helpers

## Component Hierarchy

```
App.jsx (Root)
├── BrowserRouter
├── AuthProvider (Context)
│   └── ScanProvider (Context)
│       ├── Layout
│       │   ├── Navbar
│       │   ├── MobileMenu
│       │   ├── [Page Content]
│       │   └── BottomNav (mobile only)
│       └── Toast (Global)
```

## Context Pattern

### AuthContext
**Responsibility**: User authentication state
**Provides**:
- `user` - Current user object
- `login(email, password)` - Login function
- `signup(email, password, name)` - Signup function
- `logout()` - Logout function
- `updateProfile(updates)` - Update user data
- `isAuthenticated` - Boolean flag

**Used By**: All protected pages, Navbar, Profile page

### ScanContext
**Responsibility**: Scan history and current scan state
**Provides**:
- `scanHistory` - Array of all scans
- `currentScan` - Active scan being viewed
- `saveScan(result)` - Save new scan
- `getScanById(id)` - Retrieve specific scan
- `getFilteredScans(filter)` - Filter scans
- `getStats()` - Calculate statistics

**Used By**: Dashboard, Scan, Results, History pages

## Common Components

### Button Component
```javascript
<Button 
  variant="primary|secondary|outline|ghost|danger"
  size="sm|md|lg"
  icon={IconComponent}
  loading={boolean}
  disabled={boolean}
  fullWidth={boolean}
  onClick={handler}
>
  Text
</Button>
```

**Features**:
- 5 visual variants
- 3 size options
- Icon support
- Loading state
- Disabled state
- Full-width option

### Card Component
```javascript
<Card hover onClick={handler}>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

**Features**:
- Consistent shadow and padding
- Optional hover effect
- Optional click handler
- Semantic sub-components

### Input Component
```javascript
<Input
  label="Field Label"
  type="text|email|password"
  icon={IconComponent}
  error="Error message"
  value={value}
  onChange={handler}
/>
```

**Features**:
- Label support
- Icon support
- Error state with message
- Full validation styling
- Accessible

### Modal Component
```javascript
<Modal
  isOpen={boolean}
  onClose={handler}
  title="Modal Title"
  size="sm|md|lg|xl"
>
  Modal content
</Modal>
```

**Features**:
- Backdrop with blur
- Close button
- Escape key support
- Click outside to close
- Size variants
- Smooth animations

### Toast Component
```javascript
import { showToast } from './components/common/Toast';

showToast('Message here', 'success|error|warning|info', duration);
```

**Features**:
- 4 types with icons
- Auto-dismiss
- Manual dismiss
- Stacking support
- Global event system

## Page Components

### LandingPage
**Purpose**: Marketing and onboarding
**Sections**:
- Hero with CTA
- How it works
- Features grid
- Final CTA
- Footer

**Dependencies**: None (public page)

### LoginPage
**Purpose**: Authentication
**Features**:
- Toggle login/signup
- Form validation
- Error handling
- Auto-redirect if logged in

**Dependencies**: AuthContext

### DashboardPage
**Purpose**: Overview and quick actions
**Displays**:
- Welcome message
- Stats cards (4)
- Recent scans (6)
- Quick scan button

**Dependencies**: AuthContext, ScanContext

### ScanPage
**Purpose**: Image capture and analysis
**Flow**:
1. Choose camera or upload
2. Preview image
3. Analyze with progress
4. Navigate to results

**Dependencies**: ScanContext, mock API

### ResultsPage
**Purpose**: Display scan results
**Displays**:
- Original image
- Disease identification
- Confidence score
- Severity level
- Symptoms list
- Treatment steps
- Prevention tips

**Dependencies**: ScanContext, URL params

### HistoryPage
**Purpose**: Browse all scans
**Features**:
- Filter tabs (all/diseased/healthy)
- Search by disease name
- Grid view
- Stats summary

**Dependencies**: ScanContext

### ProfilePage
**Purpose**: User settings
**Features**:
- User info display
- Avatar selection modal
- Stats display
- Language preference
- Notification toggle
- Logout

**Dependencies**: AuthContext, ScanContext

## Layout Components

### Navbar
**Purpose**: Top navigation
**Variants**:
- Public (Login/Signup buttons)
- Authenticated (Dashboard, Scan, History, Profile links)

**Responsive**: Hamburger menu on mobile

### BottomNav
**Purpose**: Mobile navigation
**Shows**: Dashboard, Scan, History, Profile
**Display**: Mobile only (hidden on desktop)

### MobileMenu
**Purpose**: Slide-out navigation menu
**Triggers**: Hamburger button on mobile
**Features**: Backdrop, slide animation, user info

### Layout
**Purpose**: Wrapper for all pages
**Includes**:
- Navbar
- MobileMenu
- Page content
- BottomNav (if authenticated)

## Utils Organization

### mockAPI.js
**Contains**:
- `diseaseDatabase` - Disease information
- `mockScanHistory` - Sample scans
- `avatarOptions` - Profile avatars
- `analyzeImage()` - Simulate AI analysis
- `mockAuth` - Authentication functions
- `getScanHistory()` - Retrieve scans
- `saveScan()` - Save new scan
- `updateUserProfile()` - Update user

### helpers.js
**Contains**:
- `formatDate()` - Human-readable dates
- `getSeverityColor()` - Color for severity
- `getConfidenceColor()` - Color for confidence
- `isValidEmail()` - Email validation
- `getAccountAge()` - Calculate account age
- `fileToBase64()` - Convert file to base64
- `truncate()` - Truncate text
- `generateId()` - Generate unique IDs

## Data Flow Examples

### Login Flow
```
1. User enters credentials in LoginPage
2. LoginPage calls login() from AuthContext
3. AuthContext calls mockAuth.login()
4. mockAuth.login() saves to localStorage
5. AuthContext updates user state
6. App redirects to Dashboard
```

### Scan Flow
```
1. User selects image in ScanPage
2. Image converted to base64
3. User clicks "Analyze"
4. ScanPage calls analyzeImage() from mockAPI
5. Mock delay simulates AI processing
6. Result returned with disease info
7. ScanPage calls saveScan() from ScanContext
8. ScanContext saves to localStorage
9. Navigate to ResultsPage with scan ID
```

### Filter Flow
```
1. User clicks filter in HistoryPage
2. State updated with filter value
3. getFilteredScans() called from ScanContext
4. Scans filtered by criteria
5. Component re-renders with filtered list
```

## Best Practices Implemented

### ✅ Component Size
All components under 200 lines

### ✅ Prop Drilling Avoided
Context API used for global state

### ✅ DRY Principle
Common UI extracted to reusable components

### ✅ Naming Conventions
- Components: PascalCase
- Files: Component name + .jsx
- Utilities: camelCase
- Constants: UPPER_SNAKE_CASE

### ✅ Code Organization
```
Related functionality grouped together
Clear folder structure
Logical imports
Comments for complex logic only
```

### ✅ State Management
- Local state for UI (useState)
- Global state for data (Context)
- Derived state calculated on render

### ✅ Error Handling
- Form validation with error messages
- Graceful fallbacks for missing data
- User-friendly error states

### ✅ Performance
- Minimal re-renders
- Efficient filtering
- Optimized images
- Lazy loading ready

## Testing Strategy (for future)

### Unit Tests
- Test utilities in isolation
- Test helper functions
- Test data transformations

### Component Tests
- Test rendering with props
- Test user interactions
- Test state changes

### Integration Tests
- Test context providers
- Test routing
- Test auth flow

### E2E Tests
- Test complete user journeys
- Test mobile responsiveness
- Test form submissions

---

This architecture ensures:
- **Maintainability** - Easy to find and update code
- **Scalability** - Simple to add new features
- **Testability** - Components can be tested in isolation
- **Readability** - Clear structure and naming
- **Reusability** - Common patterns extracted

