# 🚀 Quick Start Guide - Scan2Save

## Installation & Running

### Step 1: Install Dependencies
Open your terminal in the project directory and run:
```bash
npm install
```

This will install:
- React 18
- React Router DOM
- Lucide React (icons)
- Tailwind CSS
- Vite

### Step 2: Start Development Server
```bash
npm run dev
```

The app will start at `http://localhost:5173` (or another port if 5173 is busy)

### Step 3: Explore the App

#### Demo Login
1. Go to the Login page
2. Enter ANY email and password (e.g., `farmer@test.com` / `password123`)
3. The app uses mock authentication - any credentials work!

#### Try Features
1. **Dashboard** - View your stats and recent scans
2. **Scan** - Upload an image or use your camera
3. **Results** - See AI analysis (randomly assigned for demo)
4. **History** - Browse all your scans with filters
5. **Profile** - Change avatar, adjust settings

## 🎯 Demo Features

### Mock Disease Detection
The app randomly assigns one of these diseases to your scans:
- Anthracnose (Medium severity)
- Powdery Mildew (Low severity)
- Bacterial Black Spot (High severity)
- Sooty Mold (Low severity)
- Mango Hopper (Medium severity)
- Healthy (No disease)

### Data Persistence
All data is stored in your browser's localStorage:
- User profile
- Scan history
- Preferences

Clear your browser's localStorage to reset the app.

## 📱 Mobile Testing

### Test on Your Phone
1. Find your computer's IP address:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`
2. Start the dev server: `npm run dev`
3. On your phone, visit: `http://YOUR_IP:5173`
4. Make sure your phone and computer are on the same network!

### Camera Access
The app requests camera permission when you click "Take Photo". This works best on actual mobile devices.

## 🎨 Customization Tips

### Change Colors
Edit `tailwind.config.js` to modify:
- `mango` colors (yellows/oranges)
- `leaf` colors (greens)
- `earth` colors (browns)

### Add More Diseases
Edit `src/utils/mockAPI.js` and add to `diseaseDatabase` object.

### Modify Mock Data
All mock data is in `src/utils/mockAPI.js`:
- `diseaseDatabase` - Disease information
- `mockScanHistory` - Sample scans
- `avatarOptions` - Profile avatars

## 🛠️ Troubleshooting

### Port Already in Use
If port 5173 is busy, Vite will automatically try another port.

### Images Not Loading
The app uses Unsplash URLs for demo images. Make sure you have internet connection.

### Camera Not Working
- Camera access requires HTTPS or localhost
- Check browser permissions
- Try uploading an image instead

### Build Errors
Make sure you have Node.js 16+ installed:
```bash
node --version
```

## 📦 Building for Production

```bash
npm run build
```

The optimized files will be in the `dist` folder. You can deploy these to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 🎓 Learning Resources

### React Concepts Used
- Function components
- Hooks (useState, useEffect, useContext, useRef)
- Context API for state management
- React Router for navigation
- Custom hooks

### File Organization
```
components/common/  → Reusable UI components
components/layout/  → Navigation and layout
context/           → Global state (Auth & Scan)
pages/             → Route components
utils/             → Helper functions and mock API
hooks/             → Custom React hooks
```

## 💡 Next Steps

### To Make This Production-Ready
1. Replace mock API with real backend
2. Integrate actual ML model for disease detection
3. Add proper authentication (Firebase, Supabase, etc.)
4. Add image optimization
5. Implement real-time notifications
6. Add offline support with Service Workers
7. Add analytics

### Feature Ideas
- Multi-language support (full Filipino translation)
- Weather integration
- Treatment reminders
- Community forum
- Expert consultation booking
- Fertilizer recommendations
- Crop calendar

## 📞 Support

For issues or questions about the code:
1. Check the README.md
2. Review the inline comments in components
3. Examine the mock data structure in `mockAPI.js`

---

Enjoy building with Scan2Save! 🥭🌿
