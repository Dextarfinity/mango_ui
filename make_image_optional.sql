-- ============================================
-- MIGRATION: Make image_url optional in scans table
-- Run this in Supabase SQL Editor
-- ============================================

-- Remove NOT NULL constraint from image_url
ALTER TABLE scans ALTER COLUMN image_url DROP NOT NULL;

-- Verify the change
SELECT column_name, is_nullable, data_type 
FROM information_schema.columns 
WHERE table_name = 'scans' AND column_name = 'image_url';
