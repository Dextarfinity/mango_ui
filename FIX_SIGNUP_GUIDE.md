# 🔧 Fix Users Table for Signup

## ⚠️ Issue
The `users` table has a `password_hash` column, but Supabase Auth handles passwords separately in `auth.users`. This causes signup to fail because we're not providing a password_hash when inserting into `public.users`.

## ✅ Solution

### Step 1: Run SQL Migration in Supabase

Go to your Supabase Dashboard → SQL Editor and run this:

```sql
-- Remove password_hash column (not needed with Supabase Auth)
ALTER TABLE users DROP COLUMN IF EXISTS password_hash;

-- Also remove the DEFAULT gen_random_uuid() from id column
-- The id should match auth.users.id, not be auto-generated
ALTER TABLE users ALTER COLUMN id DROP DEFAULT;
```

### Step 2: Verify Table Structure

After running the migration, your `users` table should have:

```
Column           | Type                        | Default
-----------------+-----------------------------+---------
id               | uuid                        | (none - from Supabase Auth)
email            | varchar(255)                | 
name             | varchar(255)                | 
avatar           | varchar(10)                 | '👨‍🌾'
join_date        | timestamp with time zone    | now()
total_scans      | integer                     | 0
language         | varchar(10)                 | 'en'
notifications    | boolean                     | true
created_at       | timestamp with time zone    | now()
updated_at       | timestamp with time zone    | now()
```

**No `password_hash` column!**

## 📊 How Signup Works Now

### Architecture
```
User Fills Signup Form
        ↓
LoginPage.jsx calls signup(email, password, name)
        ↓
AuthContext.signup() calls supabaseSignUp()
        ↓
Supabase Auth creates user in auth.users table
  ↓ (password stored securely by Supabase)
Auth returns user.id
        ↓
AuthContext inserts into public.users table:
  {
    id: user.id,           ← From Supabase Auth
    email: email,
    name: name,
    avatar: '👨‍🌾',
    join_date: NOW,
    total_scans: 0,
    language: 'en',
    notifications: true
  }
        ↓
Profile loaded and user logged in
```

## 🔐 Two Separate Tables

### 1. `auth.users` (Managed by Supabase)
- Contains: id, email, encrypted_password, email_confirmed_at, etc.
- You **DON'T** manually insert here
- Supabase Auth API handles this

### 2. `public.users` (Your app data)
- Contains: id, email, name, avatar, preferences, etc.
- You **DO** manually insert here
- Links to auth.users via matching id

## ✅ Updated Code

### AuthContext.jsx (Already Updated)
```javascript
const signup = async (email, password, name) => {
  // Step 1: Create auth user (Supabase handles password)
  const result = await supabaseSignUp(email, password, name);
  
  if (result.success && result.data?.user) {
    // Step 2: Create profile in public.users (no password!)
    const { error } = await supabase
      .from('users')
      .insert([{
        id: result.data.user.id,     // ← Match auth.users.id
        email: email,
        name: name || email.split('@')[0],
        avatar: '👨‍🌾',
        join_date: new Date().toISOString(),
        total_scans: 0,
        language: 'en',
        notifications: true
      }]);
    
    if (!error) {
      await loadUserProfile(result.data.user.id);
    }
  }
  
  return result;
};
```

## 🧪 Test Signup Flow

1. **Start dev server** (if not running):
   ```bash
   npm run dev
   ```

2. **Open app in browser** and click "Sign Up"

3. **Fill the form**:
   - Name: Test User
   - Email: test@example.com
   - Password: test123

4. **Check browser console** for:
   ```
   📝 Signing up user: test@example.com
   ✅ Signup successful
   📝 Creating user profile in public.users: {...}
   ✅ Profile created successfully: {...}
   ```

5. **Verify in Supabase Dashboard**:
   - Go to **Authentication** → See user in auth.users
   - Go to **Table Editor** → users → See profile record

## 🐛 Common Issues

### Issue: "null value in column 'password_hash' violates not-null constraint"
**Solution**: Run the SQL migration above to drop the password_hash column

### Issue: "duplicate key value violates unique constraint"
**Solution**: User already exists. Either:
- Use a different email
- Delete the existing user from Table Editor
- Login instead of signup

### Issue: "Profile creation error: ... users_pkey ..."
**Solution**: Make sure id column doesn't have DEFAULT gen_random_uuid(). Run:
```sql
ALTER TABLE users ALTER COLUMN id DROP DEFAULT;
```

## 📝 Summary

✅ **Removed**: `password_hash` column from public.users  
✅ **Updated**: AuthContext to insert profile without password  
✅ **Separated**: Auth (Supabase Auth) vs Profile (public.users)  
✅ **Added**: Logging to track signup process  

**Now signup will correctly:**
1. Create auth user with encrypted password (Supabase Auth)
2. Insert profile data into public.users table (your app)
3. Link both via matching UUID

---

**Last Updated**: November 9, 2025  
**Status**: ✅ Ready to test after SQL migration
