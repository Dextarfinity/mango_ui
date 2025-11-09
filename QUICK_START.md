# 🚀 QUICK START GUIDE - Backend Integration

## ⚡ 5-Minute Setup

### **Step 1: Install Packages**
```bash
npm install
```

### **Step 2: Configure Supabase**

1. **Create Supabase Project**
   - Go to https://app.supabase.com
   - Click "New Project"
   - Fill in details and create

2. **Get Credentials**
   - Go to **Settings** → **API**
   - Copy **Project URL**
   - Copy **anon/public key**

3. **Update `.env` file**
   ```env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJxxxx...
   ```

### **Step 3: Set Up Database**

1. Go to **SQL Editor** in Supabase
2. Copy entire content from `database_schema.sql`
3. Paste and click **Run**
4. ✅ All tables, functions, and seed data created!

### **Step 4: Create Storage Bucket**

1. Go to **Storage** in Supabase
2. Click **New Bucket**
3. Name: `scan-images`
4. Make it **Public**
5. Click **Create**
6. ✅ Done!

### **Step 5: Start Development**
```bash
npm run dev
```

### **Step 6: Test It Out**

1. Open browser: `http://localhost:5173`
2. Click **Sign Up** → Create account
3. Go to **Scan** → Upload an image
4. Click **Analyze Image**
5. View results!
6. Check **Dashboard** for statistics
7. Check **History** to see all scans

---

## 🎯 What Works Now

✅ **Real Authentication** - Supabase Auth  
✅ **Database Storage** - PostgreSQL  
✅ **Image Upload** - Supabase Storage  
✅ **Real-time Updates** - Live sync  
✅ **User Profiles** - Full CRUD  
✅ **Scan History** - Persistent  
✅ **Statistics** - Calculated from DB  

---

## 📊 File Changes Made

### **Updated Files**:
```
src/context/
  ✅ AuthContext.jsx       - Supabase auth integration
  ✅ ScanContext.jsx       - Database operations

src/utils/
  ✅ mockAPI.js            - Disease database only (3 diseases)
  ✅ supabase.js           - Already existed (18 functions)

src/pages/
  ✅ ScanPage.jsx          - Image upload + save to DB

Root Files:
  ✅ database_schema.sql   - Complete DB schema
  📄 .env                  - Environment config
  📄 .env.example          - Template
```

### **No Changes Needed**:
```
src/pages/
  ✓ DashboardPage.jsx      - Works with new context
  ✓ HistoryPage.jsx        - Works with new context  
  ✓ ResultsPage.jsx        - Works with new context
  ✓ ProfilePage.jsx        - Works with new context
  ✓ LoginPage.jsx          - Works with new context
  ✓ LandingPage.jsx        - Static (no changes needed)
```

---

## 🔥 Key Features

### **1. Authentication Flow**
```
Sign Up → Creates auth user + database profile
Login → Loads user profile from database
Logout → Clears session
Auto-login → Restores session on refresh
```

### **2. Scan Flow**
```
Upload Image → Supabase Storage
Analyze → YOLOv8 simulation
Save → Database (scans table)
Display → Results page
History → All user's scans
```

### **3. Data Sync**
```
User Action → Context → Supabase → Database
                           ↓
Real-time Subscription → Auto-update UI
```

---

## 🐛 Common Issues

### **"Missing Supabase configuration"**
→ Check `.env` has both URL and key

### **"Cannot insert into scans table"**
→ Run `database_schema.sql` in Supabase

### **"Image upload failed"**
→ Create `scan-images` bucket and make it public

### **"User profile not found"**
→ Profile auto-created on signup, try logout/login

---

## 📱 Test Scenarios

1. **New User Journey**
   ```
   Sign Up → Scan Image → View Results → Check Dashboard
   ```

2. **Returning User**
   ```
   Login → Dashboard shows stats → History shows scans
   ```

3. **Multiple Scans**
   ```
   Scan 3+ images → Dashboard updates → History filters work
   ```

4. **Profile Updates**
   ```
   Change avatar → Change name → Updates in database
   ```

---

## 🎓 Quick Reference

### **Import Auth**
```javascript
import { useAuth } from '../context/AuthContext'
const { user, login, logout } = useAuth()
```

### **Import Scans**
```javascript
import { useScan } from '../context/ScanContext'
const { scanHistory, saveScan, getStats } = useScan()
```

### **Disease Database**
```javascript
import { diseaseDatabase } from '../utils/mockAPI'
const disease = diseaseDatabase.dieBack
```

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Can sign up new user
- [ ] Can login
- [ ] Dashboard shows 0 scans
- [ ] Can upload image
- [ ] Analysis runs (2.5 seconds)
- [ ] Results page shows disease info
- [ ] Scan appears in history
- [ ] Dashboard shows 1 scan
- [ ] Profile page shows stats
- [ ] Can logout
- [ ] Can login again (data persists)

---

## 🎉 You're Ready!

All backend services are integrated and working!

**Next Steps**:
1. Test with real users
2. Replace mock YOLOv8 with real model
3. Deploy to production
4. Add more features!

---

**Need Help?** Check `BACKEND_INTEGRATION_COMPLETE.md` for full details!
