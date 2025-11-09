# 🔐 Environment Configuration Guide

## Overview

Your project is now configured to use Supabase as a backend service. This guide will help you set up everything needed.

---

## 📋 Files Created

### Environment Files
- ✅ `.env` - Your local environment variables (DO NOT commit)
- ✅ `.env.example` - Template for team reference
- ✅ `.gitignore` - Already configured to ignore `.env`

### Configuration Files
- ✅ `vite.config.js` - Updated for environment variables
- ✅ `SUPABASE_SETUP.md` - Complete Supabase setup guide
- ✅ `src/utils/supabase.js` - Supabase client with helper functions

---

## 🚀 Quick Start (5 minutes)

### Step 1: Install Supabase Client
```bash
npm install @supabase/supabase-js
```

### Step 2: Get Supabase Credentials
1. Go to [supabase.com](https://supabase.com)
2. Sign in or create account
3. Create new project
4. Go to Settings → API
5. Copy Project URL and anon key

### Step 3: Configure .env File
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 4: Restart Dev Server
```bash
npm run dev
```

### Step 5: Verify Connection
Open browser console and run:
```javascript
import { healthCheck } from './src/utils/supabase.js'
await healthCheck()
```

---

## 📄 Environment Variables Reference

### Required Variables
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Optional Variables
```env
# App Configuration
VITE_APP_NAME=Scan2Save
VITE_APP_VERSION=1.0.0
VITE_API_TIMEOUT=30000

# Feature Flags
VITE_ENABLE_YOLO_MODEL=true
VITE_ENABLE_SCAN_HISTORY=true
VITE_ENABLE_USER_PROFILES=true

# Environment
VITE_NODE_ENV=development
```

### Accessing in Code
```javascript
// Get environment variable
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL

// All variables start with VITE_ prefix
const apiTimeout = import.meta.env.VITE_API_TIMEOUT
const appName = import.meta.env.VITE_APP_NAME
```

---

## 📂 File Locations

```
mango_ui/
├── .env                          [Your secrets - DO NOT COMMIT]
├── .env.example                  [Template for team - COMMIT THIS]
├── .gitignore                    [Already configured]
├── vite.config.js                [Updated with env support]
├── src/
│   └── utils/
│       └── supabase.js           [Supabase client + helpers]
└── SUPABASE_SETUP.md             [Detailed setup guide]
```

---

## 🔧 Available Supabase Functions

### Authentication
```javascript
import { signUp, signIn, signOut, getCurrentUser } from './src/utils/supabase'

// Sign up
await signUp('user@example.com', 'password123', 'John Doe')

// Sign in
await signIn('user@example.com', 'password123')

// Sign out
await signOut()

// Get current user
const user = await getCurrentUser()
```

### User Profile
```javascript
import { getUserProfile, updateUserProfile } from './src/utils/supabase'

// Get profile
const { data, error } = await getUserProfile(userId)

// Update profile
await updateUserProfile(userId, { name: 'New Name' })
```

### Scans
```javascript
import { getScanHistory, saveScan, getScanById, deleteScan } from './src/utils/supabase'

// Get all scans for user
const { data } = await getScanHistory(userId)

// Save new scan
await saveScan(userId, {
  diseaseId: 'anthracnose',
  disease: 'Anthracnose',
  confidence: 94,
  severity: 'High'
})

// Get specific scan
const { data } = await getScanById(scanId)

// Delete scan
await deleteScan(scanId)
```

### Storage
```javascript
import { uploadImage, deleteImage } from './src/utils/supabase'

// Upload image
const { url } = await uploadImage(file, userId)

// Delete image
await deleteImage(filePath)
```

---

## ✅ Setup Checklist

### Phase 1: Environment Setup (Today)
- [ ] Created `.env` file
- [ ] Created `.env.example` file
- [ ] Updated `vite.config.js`
- [ ] Created `src/utils/supabase.js`
- [ ] `.env` added to `.gitignore`

### Phase 2: Supabase Project (Next)
- [ ] Create Supabase project
- [ ] Get Project URL and anon key
- [ ] Add credentials to `.env`
- [ ] Install `@supabase/supabase-js`
- [ ] Test connection with `healthCheck()`

### Phase 3: Database Setup
- [ ] Create `users` table
- [ ] Create `scans` table
- [ ] Create `treatments` table
- [ ] Enable Row Level Security (RLS)
- [ ] Create RLS policies

### Phase 4: Authentication
- [ ] Enable Email auth provider
- [ ] Enable Google auth (optional)
- [ ] Configure email templates

### Phase 5: Storage
- [ ] Create `scan-images` bucket
- [ ] Set bucket permissions
- [ ] Test image upload

### Phase 6: Integration
- [ ] Update AuthContext to use Supabase
- [ ] Update ScanContext to use Supabase
- [ ] Update other contexts as needed
- [ ] Test all authentication flows
- [ ] Test all database operations

---

## 🔒 Security Best Practices

### ✅ DO:
- ✅ Keep `.env` file local only
- ✅ Add `.env` to `.gitignore`
- ✅ Use `.env.example` for team reference
- ✅ Rotate API keys regularly
- ✅ Enable Row Level Security
- ✅ Validate on backend
- ✅ Use anon key for client only
- ✅ Monitor Supabase logs

### ❌ DON'T:
- ❌ Commit `.env` file
- ❌ Share API keys in chat
- ❌ Use service role key in frontend
- ❌ Skip RLS setup
- ❌ Trust client-side validation only
- ❌ Expose keys in version control
- ❌ Commit secrets to git
- ❌ Log sensitive information

---

## 🐛 Troubleshooting

### "Cannot find module '@supabase/supabase-js'"
```bash
npm install @supabase/supabase-js
```

### "VITE_SUPABASE_URL is undefined"
1. Check `.env` file exists in project root
2. Verify variable name: `VITE_SUPABASE_URL` (must have `VITE_` prefix)
3. Restart dev server: `npm run dev`
4. Clear browser cache

### "CORS error when uploading image"
1. Go to Supabase Dashboard
2. Settings → API → CORS settings
3. Add your app URL to allowed origins
4. Example: `http://localhost:5173`, `https://yourdomain.com`

### "401 Unauthorized"
1. Check anon key is correct
2. Verify user is authenticated for protected operations
3. Check RLS policies on table
4. Look at Supabase logs for details

### "Connection refused"
1. Verify internet connection
2. Check Supabase project status
3. Verify credentials are correct
4. Try `healthCheck()` function

---

## 📊 Project Structure Update

```
mango_ui/
├── .env                          ← Secrets (not in git)
├── .env.example                  ← Template (in git)
├── vite.config.js                ← Updated
├── src/
│   ├── context/
│   │   ├── AuthContext.jsx       ← Use Supabase auth
│   │   ├── ScanContext.jsx       ← Use Supabase DB
│   │   └── ThemeContext.jsx
│   ├── utils/
│   │   ├── supabase.js           ← New: Supabase client
│   │   ├── yoloModel.js
│   │   └── mockAPI.js            ← Can be replaced with supabase.js
│   ├── pages/
│   ├── components/
│   └── ...
└── ...
```

---

## 🔄 Next Steps

1. **Install Supabase Package**
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Create Supabase Project**
   - Visit [supabase.com](https://supabase.com)
   - Create new project
   - Get credentials

3. **Update `.env` File**
   ```
   VITE_SUPABASE_URL=your-url
   VITE_SUPABASE_ANON_KEY=your-key
   ```

4. **Verify Connection**
   - Restart dev server
   - Run `healthCheck()` in console

5. **Set Up Database**
   - See `SUPABASE_SETUP.md` for SQL scripts
   - Create tables and policies

6. **Update Contexts**
   - Update `AuthContext.jsx` to use `supabase.js`
   - Update `ScanContext.jsx` to use `supabase.js`

7. **Test Everything**
   - Sign up and sign in
   - Upload and save scans
   - Upload images
   - Verify data in Supabase dashboard

---

## 📚 Documentation

- **SUPABASE_SETUP.md** - Complete Supabase setup guide with SQL schemas
- **src/utils/supabase.js** - All available functions with documentation
- **vite.config.js** - Vite configuration with environment variables
- **.env.example** - Environment variable template

---

## 💬 Getting Help

### Documentation
- [Supabase Docs](https://supabase.com/docs)
- [Supabase React Guide](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs)
- [Vite Guide](https://vitejs.dev/guide/)

### Community
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Discussions](https://github.com/supabase/supabase/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/supabase)

---

## ✨ Summary

You now have:
- ✅ `.env` file for local configuration
- ✅ `.env.example` for team reference
- ✅ Updated `vite.config.js` for environment variables
- ✅ Complete Supabase client in `src/utils/supabase.js`
- ✅ 18 helper functions for common operations
- ✅ Comprehensive setup guide in `SUPABASE_SETUP.md`
- ✅ Security best practices documented

**Next**: Install the Supabase package and set up your project!

---

**Status**: ✅ Environment setup complete
**Date**: November 9, 2025
