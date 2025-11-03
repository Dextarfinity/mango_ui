# 🥭 Scan2Save - Mango Disease Detection System

A beautiful, modern React application designed to help Filipino mango farmers detect diseases and pests using AI-powered image analysis.

## ✨ Features

- **AI-Powered Detection**: Identify mango diseases instantly with high accuracy
- **Instant Results**: Get diagnosis and treatment recommendations in seconds
- **Comprehensive Treatment Guides**: Expert knowledge and prevention tips
- **Scan History**: Track all your scans over time
- **User Profiles**: Customizable avatars and preferences
- **Mobile-First Design**: Optimized for smartphone use
- **Beautiful UI**: Modern design with mango-themed colors

## 🎨 Design Highlights

- Nature/agricultural color scheme (greens, yellows, oranges)
- Smooth animations and transitions
- Responsive mobile-first design
- Intuitive navigation with bottom nav bar
- Professional gradient effects and shadows

## 🏗️ Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Toast.jsx
│   │   └── Loading.jsx
│   └── layout/          # Layout components
│       ├── Navbar.jsx
│       ├── BottomNav.jsx
│       ├── MobileMenu.jsx
│       └── Layout.jsx
├── context/             # State management
│   ├── AuthContext.jsx
│   └── ScanContext.jsx
├── pages/               # Page components
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   ├── DashboardPage.jsx
│   ├── ScanPage.jsx
│   ├── ResultsPage.jsx
│   ├── HistoryPage.jsx
│   └── ProfilePage.jsx
├── utils/               # Utilities
│   ├── mockAPI.js      # Mock data and API
│   └── helpers.js      # Helper functions
├── App.jsx             # Main app with routing
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown in the terminal (usually http://localhost:5173)

### Build for Production

```bash
npm run build
```

## 📱 Pages Overview

### 1. Landing Page
- Hero section with compelling call-to-action
- How it works (3 simple steps)
- Features showcase
- CTA and footer

### 2. Login/Signup Page
- Toggle between login and signup
- Email/password authentication (mock)
- Form validation
- Demo mode indicator

### 3. Dashboard
- Welcome message
- Quick stats cards
- Recent scans grid
- Quick action to start new scan

### 4. Scan Page
- Camera access option
- Upload image option
- Image preview
- AI analysis with progress bar
- Tips for best results

### 5. Results Page
- Analyzed image display
- Disease/pest identification
- Confidence score with visual indicator
- Severity level
- Symptoms list
- Treatment recommendations
- Prevention tips
- Download report option

### 6. History Page
- Filter by all/diseased/healthy
- Search functionality
- Grid view of all scans
- Quick navigation to results

### 7. Profile Page
- User information display
- Avatar selection (12 emoji options)
- User statistics
- Language preference (English/Filipino)
- Notifications toggle
- Logout option

## 🎯 Code Quality Features

- **Modular Architecture**: Clean separation of concerns
- **Reusable Components**: DRY principle applied
- **Single Responsibility**: Each component has one purpose
- **Custom Hooks**: useAuth and useScan for shared logic
- **Clean Naming**: Descriptive variable and function names
- **Small Components**: All under 200 lines
- **Type Safety**: Proper prop handling and validation
- **Error Handling**: Graceful error states and user feedback

## 🌟 Technologies Used

- **React 18**: Modern React with hooks
- **React Router 6**: Client-side routing
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Beautiful icon library
- **Vite**: Fast build tool
- **localStorage**: Client-side data persistence

## 🔧 Mock Features

This is a demo application with mock functionality:

- **Authentication**: Any email/password works (stored in localStorage)
- **AI Analysis**: Random disease selection with 2.5s delay simulation
- **Data Persistence**: Uses localStorage for scans and user data
- **Camera Access**: Uses FileReader API for image handling

## 🎨 Color Scheme

- **Mango Yellow**: #ffc300 (primary accent)
- **Leaf Green**: #22c55e (primary brand)
- **Earth Brown**: #c19364 (secondary accent)
- Custom gradients throughout for premium feel

## 📝 Key Components

### Button
- Multiple variants: primary, secondary, outline, ghost, danger
- Size options: sm, md, lg
- Loading state support
- Icon support

### Card
- Hover effects
- Header, title, and content sections
- Clickable variant

### Input
- Icon support
- Error states
- Full validation

### Modal
- Backdrop with blur
- Size variants
- Smooth animations

### Toast
- Multiple types: success, error, warning, info
- Auto-dismiss
- Stacking support

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This is a demonstration project created for educational purposes.

## 👨‍💻 Development

Built with ❤️ for Filipino mango farmers using modern web technologies.

---

**Note**: This is a demo application with mock AI functionality. For production use, integrate with a real ML backend service for disease detection.
