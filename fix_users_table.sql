-- ============================================
-- FIX: Remove password_hash from users table
-- Supabase Auth handles passwords separately
-- Run this in Supabase SQL Editor
-- ============================================

-- Drop the password_hash column (not needed with Supabase Auth)
ALTER TABLE users DROP COLUMN IF EXISTS password_hash;

-- Verify the updated table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'users'
ORDER BY ordinal_position;
