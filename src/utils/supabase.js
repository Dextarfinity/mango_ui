/**
 * Supabase Client Configuration
 * 
 * This file initializes and exports the Supabase client
 * Used for all database, authentication, and storage operations
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase configuration')
  console.error('Please check your .env file:')
  console.error('- VITE_SUPABASE_URL')
  console.error('- VITE_SUPABASE_ANON_KEY')
  throw new Error('Supabase configuration is missing')
}

console.log('🔐 Initializing Supabase client...')
console.log('📍 URL:', supabaseUrl)

/**
 * Supabase Client Instance
 * Use this for all Supabase operations
 * 
 * Example:
 * import { supabase } from '../utils/supabase'
 * 
 * const { data, error } = await supabase
 *   .from('table_name')
 *   .select('*')
 */
export const supabase = createClient(supabaseUrl, supabaseKey)

console.log('✅ Supabase client initialized')

/**
 * Authentication Functions
 */

export const signUp = async (email, password, name = '') => {
  try {
    console.log('📝 Signing up user:', email)
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || email.split('@')[0]
        }
      }
    })
    
    if (error) throw error
    
    console.log('✅ Signup successful')
    return { success: true, data }
  } catch (error) {
    console.error('❌ Signup failed:', error.message)
    return { success: false, error: error.message }
  }
}

export const signIn = async (email, password) => {
  try {
    console.log('🔓 Signing in user:', email)
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    
    console.log('✅ Sign in successful')
    return { success: true, data }
  } catch (error) {
    console.error('❌ Sign in failed:', error.message)
    return { success: false, error: error.message }
  }
}

export const signOut = async () => {
  try {
    console.log('👋 Signing out...')
    
    const { error } = await supabase.auth.signOut()
    
    if (error) throw error
    
    console.log('✅ Sign out successful')
    return { success: true }
  } catch (error) {
    console.error('❌ Sign out failed:', error.message)
    return { success: false, error: error.message }
  }
}

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) throw error
    
    return user
  } catch (error) {
    console.error('❌ Get current user failed:', error.message)
    return null
  }
}

export const getSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) throw error
    
    return session
  } catch (error) {
    console.error('❌ Get session failed:', error.message)
    return null
  }
}

/**
 * User Profile Functions
 */

export const getUserProfile = async (userId) => {
  try {
    console.log('👤 Fetching user profile:', userId)
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    
    console.log('✅ User profile fetched')
    return { success: true, data }
  } catch (error) {
    console.error('❌ Fetch profile failed:', error.message)
    return { success: false, error: error.message }
  }
}

export const updateUserProfile = async (userId, updates) => {
  try {
    console.log('✏️  Updating user profile:', userId)
    
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    
    console.log('✅ Profile updated')
    return { success: true, data }
  } catch (error) {
    console.error('❌ Update profile failed:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Scan Functions
 */

export const getScanHistory = async (userId) => {
  try {
    console.log('📊 Fetching scan history for user:', userId)
    
    const { data, error } = await supabase
      .from('scans')
      .select('*')
      .eq('user_id', userId)
      .order('analyzed_at', { ascending: false })
    
    if (error) throw error
    
    console.log(`✅ Fetched ${data?.length || 0} scans`)
    return { success: true, data }
  } catch (error) {
    console.error('❌ Fetch scan history failed:', error.message)
    return { success: false, error: error.message }
  }
}

export const saveScan = async (userId, scanData) => {
  try {
    console.log('💾 Saving scan for user:', userId)
    
    const { data, error } = await supabase
      .from('scans')
      .insert([{
        user_id: userId,
        disease_id: scanData.diseaseId,
        disease_name: scanData.disease,
        confidence: scanData.confidence,
        severity: scanData.severity,
        image_url: scanData.imageUrl,
        location: scanData.location || 'Philippines',
        model_name: scanData.modelName || 'YOLOv8s',
        model_version: scanData.modelVersion || '8s',
        model_dataset: scanData.dataset || 'Mango-Leaf-Diseases-v2'
      }])
      .select()
    
    if (error) throw error
    
    console.log('✅ Scan saved')
    return { success: true, data: data?.[0] }
  } catch (error) {
    console.error('❌ Save scan failed:', error.message)
    return { success: false, error: error.message }
  }
}

export const getScanById = async (scanId) => {
  try {
    console.log('🔍 Fetching scan:', scanId)
    
    const { data, error } = await supabase
      .from('scans')
      .select('*')
      .eq('id', scanId)
      .single()
    
    if (error) throw error
    
    console.log('✅ Scan fetched')
    return { success: true, data }
  } catch (error) {
    console.error('❌ Fetch scan failed:', error.message)
    return { success: false, error: error.message }
  }
}

export const deleteScan = async (scanId) => {
  try {
    console.log('🗑️  Deleting scan:', scanId)
    
    const { error } = await supabase
      .from('scans')
      .delete()
      .eq('id', scanId)
    
    if (error) throw error
    
    console.log('✅ Scan deleted')
    return { success: true }
  } catch (error) {
    console.error('❌ Delete scan failed:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Disease Functions
 */

export const getAllDiseases = async () => {
  try {
    console.log('🦠 Fetching all diseases from database')
    
    const { data, error } = await supabase
      .from('diseases')
      .select('*')
    
    if (error) throw error
    
    console.log(`✅ Fetched ${data?.length || 0} diseases`)
    return { success: true, data }
  } catch (error) {
    console.error('❌ Fetch diseases failed:', error.message)
    return { success: false, error: error.message }
  }
}

export const getDiseaseById = async (diseaseId) => {
  try {
    console.log('🦠 Fetching disease:', diseaseId)
    
    const { data, error } = await supabase
      .from('diseases')
      .select('*')
      .eq('id', diseaseId)
      .single()
    
    if (error) throw error
    
    console.log('✅ Disease fetched')
    return { success: true, data }
  } catch (error) {
    console.error('❌ Fetch disease failed:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Storage Functions
 */

export const uploadImage = async (file, userId) => {
  try {
    const fileName = `${userId}/${Date.now()}_${file.name}`
    
    console.log('📸 Uploading image:', fileName)
    
    const { data, error } = await supabase.storage
      .from('scan-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (error) throw error
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('scan-images')
      .getPublicUrl(fileName)
    
    console.log('✅ Image uploaded')
    return { success: true, url: publicUrl }
  } catch (error) {
    console.error('❌ Upload image failed:', error.message)
    return { success: false, error: error.message }
  }
}

export const deleteImage = async (filePath) => {
  try {
    console.log('🗑️  Deleting image:', filePath)
    
    const { error } = await supabase.storage
      .from('scan-images')
      .remove([filePath])
    
    if (error) throw error
    
    console.log('✅ Image deleted')
    return { success: true }
  } catch (error) {
    console.error('❌ Delete image failed:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Real-time Subscriptions
 */

export const subscribeToScans = (userId, callback) => {
  console.log('👂 Subscribing to scan updates for user:', userId)
  
  return supabase
    .channel(`scans:${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'scans',
        filter: `user_id=eq.${userId}`
      },
      callback
    )
    .subscribe()
}

export const unsubscribe = (subscription) => {
  if (subscription) {
    console.log('🔇 Unsubscribing from updates')
    return supabase.removeChannel(subscription)
  }
}

/**
 * Health Check
 */

export const healthCheck = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1)
    
    if (error) throw error
    
    console.log('✅ Supabase connection healthy')
    return { success: true }
  } catch (error) {
    console.error('❌ Supabase connection failed:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Export all functions
 */
export default {
  supabase,
  // Auth
  signUp,
  signIn,
  signOut,
  getCurrentUser,
  getSession,
  // Profile
  getUserProfile,
  updateUserProfile,
  // Scans
  getScanHistory,
  saveScan,
  getScanById,
  deleteScan,
  // Diseases
  getAllDiseases,
  getDiseaseById,
  // Storage
  uploadImage,
  deleteImage,
  // Subscriptions
  subscribeToScans,
  unsubscribe,
  // Health
  healthCheck
}
