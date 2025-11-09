-- ============================================
-- SCAN2SAVE DATABASE SCHEMA
-- Mango Disease Detection Application
-- Created: November 9, 2025
-- RLS: DISABLED (No policies created)
-- ============================================

-- ============================================
-- 1. USERS TABLE
-- Stores user profile data (auth handled by Supabase Auth)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,  -- Matches Supabase Auth user ID
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar VARCHAR(10) DEFAULT '👨‍🌾',
  join_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  total_scans INTEGER DEFAULT 0,
  language VARCHAR(10) DEFAULT 'en',
  notifications BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- RLS DISABLED - No policies created
ALTER TABLE users DISABLE ROW LEVEL SECURITY;


-- ============================================
-- 2. SCANS TABLE
-- Stores all scan history and results
-- ============================================
CREATE TABLE IF NOT EXISTS scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  disease_id VARCHAR(100) NOT NULL,
  disease_name VARCHAR(255) NOT NULL,
  confidence DECIMAL(5,2) NOT NULL CHECK (confidence >= 0 AND confidence <= 100),
  severity VARCHAR(50) NOT NULL,
  image_url TEXT,  -- Now optional - can store base64 or URL
  location VARCHAR(255) DEFAULT 'Philippines',
  analyzed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Model metadata
  model_name VARCHAR(100) DEFAULT 'YOLOv8s',
  model_path VARCHAR(255) DEFAULT '/yolov8s.pt',
  model_dataset VARCHAR(100) DEFAULT 'Mango-Leaf-Diseases-v2',
  model_version VARCHAR(50) DEFAULT '8s',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_scans_user_id ON scans(user_id);
CREATE INDEX IF NOT EXISTS idx_scans_disease_id ON scans(disease_id);
CREATE INDEX IF NOT EXISTS idx_scans_analyzed_at ON scans(analyzed_at DESC);

-- RLS DISABLED - No policies created
ALTER TABLE scans DISABLE ROW LEVEL SECURITY;


-- ============================================
-- 3. DISEASES TABLE
-- Master disease database with symptoms and treatments
-- ============================================
CREATE TABLE IF NOT EXISTS diseases (
  id VARCHAR(100) PRIMARY KEY,
  disease_name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  severity VARCHAR(50) NOT NULL,
  symptoms TEXT[] NOT NULL, -- Array of symptom strings
  treatments TEXT[] NOT NULL, -- Array of treatment strings
  prevention TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster disease lookups
CREATE INDEX IF NOT EXISTS idx_diseases_name ON diseases(disease_name);

-- RLS DISABLED - No policies created
ALTER TABLE diseases DISABLE ROW LEVEL SECURITY;


-- ============================================
-- 4. SCAN STATISTICS VIEW (OPTIONAL)
-- Provides quick access to user statistics
-- ============================================
CREATE OR REPLACE VIEW user_scan_stats AS
SELECT 
  u.id AS user_id,
  u.name,
  u.email,
  COUNT(s.id) AS total_scans,
  COUNT(CASE WHEN s.disease_id = 'healthy' THEN 1 END) AS healthy_scans,
  COUNT(CASE WHEN s.disease_id != 'healthy' THEN 1 END) AS diseased_scans,
  ROUND(
    (COUNT(CASE WHEN s.disease_id = 'healthy' THEN 1 END)::NUMERIC / 
     NULLIF(COUNT(s.id), 0) * 100), 2
  ) AS health_rate,
  MAX(s.analyzed_at) AS last_scan_date
FROM users u
LEFT JOIN scans s ON u.id = s.user_id
GROUP BY u.id, u.name, u.email;


-- ============================================
-- 5. SEED DATA - DISEASES
-- Populate disease database with initial data
-- Based on dataset.yaml: Die Back, Healthy, Powder Mildew
-- ============================================
INSERT INTO diseases (id, disease_name, description, severity, symptoms, treatments, prevention)
VALUES 
(
  'dieBack',
  'Die Back',
  'Fungal disease that causes progressive death of shoots, branches, and twigs from tip backwards. Common in mango trees during stress conditions.',
  'High',
  ARRAY[
    'Browning and drying of shoot tips',
    'Progressive death of branches from tip to base',
    'Gum exudation from affected areas',
    'Wilting and dropping of leaves',
    'Black discoloration of stems'
  ],
  ARRAY[
    'Prune and remove all dead and infected branches',
    'Apply copper-based fungicide to cut surfaces',
    'Improve drainage and avoid water stress',
    'Apply balanced fertilizer to strengthen trees',
    'Disinfect pruning tools between cuts'
  ],
  'Maintain tree vigor through proper nutrition and irrigation. Prune during dry season and apply protective fungicides.'
),
(
  'healthy',
  'Healthy',
  'Your mango tree appears healthy! Continue with regular maintenance and monitoring.',
  'None',
  ARRAY[
    'Vibrant green leaves',
    'No spots or discoloration',
    'Normal growth pattern',
    'No signs of pests',
    'Strong shoot development'
  ],
  ARRAY[
    'Continue regular monitoring',
    'Maintain proper irrigation schedule',
    'Apply balanced fertilizer as needed',
    'Keep orchard clean from fallen leaves',
    'Practice preventive care and sanitation'
  ],
  'Maintain current care practices and monitor regularly for any changes. Continue with preventive measures.'
),
(
  'powderMildew',
  'Powder Mildew',
  'Fungal disease affecting young leaves, flowers, and fruits. Appears as white powdery coating and thrives in warm, humid conditions.',
  'Medium',
  ARRAY[
    'White powdery growth on leaves and flowers',
    'Leaf curling and distortion',
    'Stunted shoot growth',
    'Reduced fruit set and quality',
    'Premature leaf drop'
  ],
  ARRAY[
    'Apply sulfur-based fungicide at first sign',
    'Use neem oil spray weekly as preventive',
    'Remove heavily infected plant parts',
    'Ensure proper spacing between trees for air circulation',
    'Apply potassium bicarbonate solution'
  ],
  'Plant resistant varieties when available. Maintain good air circulation and avoid overhead irrigation during flowering.'
)
ON CONFLICT (id) DO NOTHING;


-- ============================================
-- 6. FUNCTIONS - AUTO UPDATE TIMESTAMPS
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers if they exist, then create new ones
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_scans_updated_at ON scans;
CREATE TRIGGER update_scans_updated_at
  BEFORE UPDATE ON scans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_diseases_updated_at ON diseases;
CREATE TRIGGER update_diseases_updated_at
  BEFORE UPDATE ON diseases
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- ============================================
-- 7. FUNCTION - UPDATE USER TOTAL SCANS
-- Automatically update user's total_scans counter
-- ============================================
CREATE OR REPLACE FUNCTION update_user_total_scans()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    UPDATE users
    SET total_scans = total_scans + 1
    WHERE id = NEW.user_id;
    RETURN NEW;
  ELSIF (TG_OP = 'DELETE') THEN
    UPDATE users
    SET total_scans = GREATEST(0, total_scans - 1)
    WHERE id = OLD.user_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if exists, then create new one
DROP TRIGGER IF EXISTS update_user_scan_count ON scans;
CREATE TRIGGER update_user_scan_count
  AFTER INSERT OR DELETE ON scans
  FOR EACH ROW
  EXECUTE FUNCTION update_user_total_scans();


-- ============================================
-- 8. USEFUL QUERIES (COMMENTS FOR REFERENCE)
-- ============================================

-- Get user with scan statistics:
-- SELECT * FROM user_scan_stats WHERE user_id = 'YOUR_USER_ID';

-- Get recent scans for a user:
-- SELECT * FROM scans WHERE user_id = 'YOUR_USER_ID' ORDER BY analyzed_at DESC LIMIT 10;

-- Get scans filtered by disease:
-- SELECT * FROM scans WHERE user_id = 'YOUR_USER_ID' AND disease_id = 'anthracnose';

-- Get disease information:
-- SELECT * FROM diseases WHERE id = 'anthracnose';

-- Get scan statistics for a user:
-- SELECT 
--   COUNT(*) as total,
--   COUNT(CASE WHEN disease_id = 'healthy' THEN 1 END) as healthy,
--   COUNT(CASE WHEN disease_id != 'healthy' THEN 1 END) as diseased
-- FROM scans 
-- WHERE user_id = 'YOUR_USER_ID';


-- ============================================
-- SETUP COMPLETE
-- ============================================
-- Run this SQL file in your Supabase SQL Editor
-- All tables created with RLS DISABLED
-- No Row Level Security policies applied
-- ============================================
