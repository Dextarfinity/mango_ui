import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, signUp as supabaseSignUp, signIn as supabaseSignIn, signOut as supabaseSignOut, getUserProfile, updateUserProfile as supabaseUpdateProfile } from '../utils/supabase';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [session, setSession] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let mounted = true;

    // Check for existing session on mount
    const initializeAuth = async () => {
      try {
        // Minimum 3 second initialization display
        const startTime = Date.now();
        
        // Check for demo user in sessionStorage first
        const demoUserStr = sessionStorage.getItem('demoUser');
        if (demoUserStr) {
          const demoUser = JSON.parse(demoUserStr);
          console.log('🎭 Demo user found in session:', demoUser.email);
          setUser(demoUser);
          setSession({ user: { id: demoUser.id, email: demoUser.email } });
          
          // Ensure minimum 3 seconds display
          const elapsed = Date.now() - startTime;
          const remaining = Math.max(0, 3000 - elapsed);
          await new Promise(resolve => setTimeout(resolve, remaining));
          
          setLoading(false);
          setInitialized(true);
          return;
        }
        
        // Otherwise check Supabase session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        setSession(session);
        
        if (session?.user) {
          await loadUserProfile(session.user.id);
        }
        
        // Ensure minimum 3 seconds display
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 3000 - elapsed);
        if (remaining > 0) {
          await new Promise(resolve => setTimeout(resolve, remaining));
        }
        
        // Trigger fade out
        setFadeOut(true);
        
        // Wait for fade out animation (500ms)
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        if (mounted) {
          setLoading(false);
          setInitialized(true);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes (after initial load)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted || !initialized) return;
      
      console.log('🔐 Auth state changed:', event);
      setSession(session);
      
      if (session?.user) {
        await loadUserProfile(session.user.id);
      } else {
        setUser(null);
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []); // Only run once on mount

  const loadUserProfile = async (userId) => {
    try {
      console.log('👤 Loading profile for:', userId);
      
      const { success, data } = await getUserProfile(userId);
      if (success && data) {
        const userData = {
          id: data.id,
          email: data.email,
          name: data.name,
          avatar: data.avatar || '👨‍🌾',
          joinDate: new Date(data.join_date),
          totalScans: data.total_scans || 0,
          language: data.language || 'en',
          notifications: data.notifications ?? true
        };
        
        console.log('✅ Profile loaded:', userData.email);
        setUser(userData);
      } else {
        // If profile doesn't exist, create one from auth data
        console.log('⚠️ Profile not found, creating from auth metadata');
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          const fallbackUser = {
            id: authUser.id,
            email: authUser.email,
            name: authUser.user_metadata?.name || authUser.email?.split('@')[0],
            avatar: '👨‍🌾',
            joinDate: new Date(authUser.created_at),
            totalScans: 0,
            language: 'en',
            notifications: true
          };
          
          console.log('✅ Using fallback profile:', fallbackUser.email);
          setUser(fallbackUser);
        }
      }
    } catch (error) {
      console.error('❌ Load profile error:', error);
    }
  };

  const login = async (email, password) => {
    try {
      console.log('AuthContext: login() called with email:', email);
      setLoading(true);
      
      // Demo mode: Allow any login
      const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true' || !import.meta.env.VITE_SUPABASE_URL;
      console.log('AuthContext: isDemoMode:', isDemoMode);
      
      if (isDemoMode) {
        console.log('🎭 Demo mode: Bypassing authentication');
        
        // Create a demo user
        const demoUser = {
          id: 'demo-' + Date.now(),
          email: email,
          name: email.split('@')[0],
          avatar: '👨‍🌾',
          joinDate: new Date(),
          totalScans: 0,
          language: 'en',
          notifications: true
        };
        
        console.log('AuthContext: Created demo user:', demoUser);
        
        // Store demo user in sessionStorage
        sessionStorage.setItem('demoUser', JSON.stringify(demoUser));
        
        console.log('AuthContext: Setting user and session...');
        setUser(demoUser);
        setSession({ user: { id: demoUser.id, email: demoUser.email } });
        setLoading(false);
        
        console.log('AuthContext: Login complete, returning success');
        return { success: true, data: { user: demoUser } };
      }
      
      // Real authentication
      const result = await supabaseSignIn(email, password);
      
      if (result.success && result.data?.user) {
        await loadUserProfile(result.data.user.id);
      }
      
      setLoading(false);
      return result;
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      return { success: false, error: 'Login failed' };
    }
  };

  const signup = async (email, password, name) => {
    try {
      setLoading(true);
      
      // Demo mode: Allow any signup
      const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true' || !import.meta.env.VITE_SUPABASE_URL;
      
      if (isDemoMode) {
        console.log('🎭 Demo mode: Bypassing signup');
        
        // Create a demo user
        const demoUser = {
          id: 'demo-' + Date.now(),
          email: email,
          name: name || email.split('@')[0],
          avatar: '👨‍🌾',
          joinDate: new Date(),
          totalScans: 0,
          language: 'en',
          notifications: true
        };
        
        // Store demo user in sessionStorage
        sessionStorage.setItem('demoUser', JSON.stringify(demoUser));
        
        setUser(demoUser);
        setSession({ user: { id: demoUser.id, email: demoUser.email } });
        setLoading(false);
        
        return { success: true, data: { user: demoUser } };
      }
      
      // Real signup
      const result = await supabaseSignUp(email, password, name);
      
      if (result.success && result.data?.user) {
        // Create user profile in public.users table
        const profileData = {
          id: result.data.user.id,
          email: email,
          name: name || email.split('@')[0],
          avatar: '👨‍🌾',
          join_date: new Date().toISOString(),
          total_scans: 0,
          language: 'en',
          notifications: true
        };

        console.log('📝 Creating user profile in public.users:', profileData);

        const { data: insertedData, error: profileError } = await supabase
          .from('users')
          .insert([profileData])
          .select()
          .single();
        
        if (profileError) {
          console.error('❌ Profile creation error:', profileError);
          // Continue even if profile creation fails
        } else {
          console.log('✅ Profile created successfully:', insertedData);
        }
        
        // Load the profile (will create from auth metadata if DB insert failed)
        await loadUserProfile(result.data.user.id);
      }
      
      setLoading(false);
      return result;
    } catch (error) {
      console.error('Signup error:', error);
      setLoading(false);
      return { success: false, error: 'Signup failed' };
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      
      // Clear demo user if exists
      sessionStorage.removeItem('demoUser');
      
      const result = await supabaseSignOut();
      setUser(null);
      setSession(null);
      setLoading(false);
      return result;
    } catch (error) {
      console.error('Logout error:', error);
      setLoading(false);
      return { success: false, error: 'Logout failed' };
    }
  };

  const updateProfile = async (updates) => {
    try {
      if (!user?.id) return { success: false, error: 'No user logged in' };

      const result = await supabaseUpdateProfile(user.id, updates);
      
      if (result.success) {
        setUser(prev => ({ ...prev, ...updates }));
      }
      
      return result;
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: 'Update failed' };
    }
  };

  const value = {
    user,
    session,
    loading,
    fadeOut,
    login,
    signup,
    logout,
    updateProfile,
    isAuthenticated: !!user && !!session
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
