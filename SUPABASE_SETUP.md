# Supabase Integration Guide

## 🚀 Setup Instructions

### 1. Create Supabase Project

1. Go to [Supabase](https://app.supabase.com)
2. Click "New Project"
3. Fill in project details:
   - **Name**: `scan2save` (or your preferred name)
   - **Database Password**: Create a strong password
   - **Region**: Select closest to your location
4. Wait for project to initialize (2-3 minutes)

### 2. Get API Credentials

1. In Supabase dashboard, go to **Settings → API**
2. Copy the following values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public key** (Project API keys section)

### 3. Configure Environment Variables

1. Open `.env` file in your project root
2. Replace the placeholder values:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
3. Save the file

### 4. Install Supabase Client

Run in terminal:
```bash
npm install @supabase/supabase-js
```

### 5. Create Supabase Client

Create `src/utils/supabase.js`:
```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### 6. Use in Components

```javascript
import { supabase } from '../utils/supabase'

// Example: Get user data
const { data, error } = await supabase
  .from('users')
  .select('*')
```

---

## 📊 Database Schema

### Recommended Tables

#### `users` Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email TEXT NOT NULL,
  name TEXT,
  avatar TEXT,
  join_date TIMESTAMP DEFAULT now(),
  total_scans INT DEFAULT 0,
  language TEXT DEFAULT 'en',
  notifications BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
)

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only read their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- RLS Policy: Users can update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);
```

#### `scans` Table
```sql
CREATE TABLE scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  disease_id TEXT NOT NULL,
  disease TEXT NOT NULL,
  confidence INT NOT NULL,
  severity TEXT NOT NULL,
  image_url TEXT,
  location TEXT,
  model_name TEXT DEFAULT 'YOLOv8s',
  model_version TEXT DEFAULT '8s',
  dataset TEXT DEFAULT 'Mango-Leaf-Diseases-v2',
  analyzed_at TIMESTAMP DEFAULT now(),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
)

ALTER TABLE scans ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own scans
CREATE POLICY "Users can view own scans" ON scans
  FOR SELECT USING (auth.uid() = user_id);

-- RLS Policy: Users can insert their own scans
CREATE POLICY "Users can insert own scans" ON scans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can update their own scans
CREATE POLICY "Users can update own scans" ON scans
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policy: Users can delete their own scans
CREATE POLICY "Users can delete own scans" ON scans
  FOR DELETE USING (auth.uid() = user_id);
```

#### `treatments` Table
```sql
CREATE TABLE treatments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_id UUID NOT NULL REFERENCES scans(id) ON DELETE CASCADE,
  treatment TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
)

ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view treatments for their scans
CREATE POLICY "Users can view own treatments" ON treatments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM scans 
      WHERE scans.id = treatments.scan_id 
      AND scans.user_id = auth.uid()
    )
  );
```

---

## 🔐 Authentication Setup

### Enable Email Auth

1. Go to **Authentication → Providers**
2. Enable **Email** provider
3. Configure email templates if needed

### Enable Google Auth (Optional)

1. Go to **Authentication → Providers**
2. Enable **Google**
3. Add your Google OAuth credentials
4. Add authorized redirect URIs

---

## 🗄️ Storage Setup for Images

### Create Storage Bucket

1. Go to **Storage → Buckets**
2. Click "New Bucket"
3. Name: `scan-images`
4. Choose **Public** (for image display) or **Private** (more secure)
5. Create bucket

### Upload Images to Supabase

```javascript
import { supabase } from '../utils/supabase'

const uploadImage = async (file, userId) => {
  const fileName = `${userId}/${Date.now()}_${file.name}`
  
  const { data, error } = await supabase.storage
    .from('scan-images')
    .upload(fileName, file)
  
  if (error) throw error
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('scan-images')
    .getPublicUrl(fileName)
  
  return publicUrl
}
```

---

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Supabase project URL | `https://xxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Public anonymous key | Long API key string |
| `VITE_APP_NAME` | Application name | `Scan2Save` |
| `VITE_APP_VERSION` | App version | `1.0.0` |
| `VITE_API_TIMEOUT` | API timeout (ms) | `30000` |
| `VITE_ENABLE_YOLO_MODEL` | Enable YOLOv8 | `true` |
| `VITE_ENABLE_SCAN_HISTORY` | Enable database history | `true` |
| `VITE_ENABLE_USER_PROFILES` | Enable user profiles | `true` |
| `VITE_NODE_ENV` | Environment | `development` |

---

## 🔧 Vite Configuration

Update `vite.config.js` to expose environment variables:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': JSON.stringify(process.env)
  }
})
```

---

## 💾 Usage Examples

### Authentication

```javascript
import { supabase } from '../utils/supabase'

// Sign up
const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })
  return { data, error }
}

// Log in
const logIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

// Log out
const logOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// Get current user
const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
```

### Database Operations

```javascript
// Get scan history
const getScanHistory = async (userId) => {
  const { data, error } = await supabase
    .from('scans')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  return { data, error }
}

// Save new scan
const saveScan = async (userId, scanData) => {
  const { data, error } = await supabase
    .from('scans')
    .insert([{
      user_id: userId,
      disease_id: scanData.diseaseId,
      disease: scanData.disease,
      confidence: scanData.confidence,
      severity: scanData.severity,
      image_url: scanData.imageUrl,
      location: scanData.location,
      model_name: scanData.modelName
    }])
  
  return { data, error }
}

// Update user profile
const updateProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
  
  return { data, error }
}

// Delete scan
const deleteScan = async (scanId) => {
  const { error } = await supabase
    .from('scans')
    .delete()
    .eq('id', scanId)
  
  return { error }
}
```

---

## 🚨 Security Best Practices

1. **Never commit `.env` file** - Add to `.gitignore`
2. **Use `.env.example`** - For team reference (without secrets)
3. **Enable RLS** - Row Level Security on all tables
4. **Validate on backend** - Don't trust client-side validation
5. **Use anon key for client** - Never expose service role key
6. **Rotate keys regularly** - In production environments
7. **Monitor usage** - Check Supabase logs for issues

---

## 🐛 Troubleshooting

### "SUPABASE_URL is undefined"
- Check `.env` file exists in project root
- Restart dev server: `npm run dev`
- Variables prefixed with `VITE_` are required for client-side access

### "CORS errors"
- Go to Supabase Settings → API → CORS settings
- Add your app URL to allowed origins

### "RLS policy error"
- Check RLS policies are enabled on table
- Verify user is authenticated
- Check policy conditions match your logic

### "401 Unauthorized"
- Verify anon key is correct
- Check environment variable names (must start with `VITE_`)
- Ensure user is authenticated for protected operations

---

## 📚 Next Steps

1. ✅ Create `.env` file with Supabase credentials
2. ✅ Install `@supabase/supabase-js`
3. ✅ Create `src/utils/supabase.js`
4. ✅ Set up database tables
5. ✅ Update AuthContext to use Supabase
6. ✅ Update ScanContext to use Supabase
7. ✅ Integrate storage for images
8. ✅ Test all operations

---

**Status**: Ready for Supabase integration
**Date**: November 9, 2025
