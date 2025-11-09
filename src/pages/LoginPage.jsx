import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, User, Leaf, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { isValidEmail } from '../utils/helpers';

export const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, signup, isAuthenticated } = useAuth();
  
  const [isSignUp, setIsSignUp] = useState(searchParams.get('signup') === 'true');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('LoginPage: isAuthenticated changed:', isAuthenticated);
    if (isAuthenticated) {
      console.log('LoginPage: Navigating to dashboard');
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (isSignUp && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);
    
    try {
      let result;
      if (isSignUp) {
        result = await signup(formData.email, formData.password, formData.name);
      } else {
        console.log('LoginPage: Calling login...');
        result = await login(formData.email, formData.password);
        console.log('LoginPage: Login result:', result);
      }

      if (result.success) {
        console.log('LoginPage: Login successful, navigating to dashboard');
        navigate('/dashboard');
      } else {
        console.log('LoginPage: Login failed:', result.error);
        setErrors({ form: result.error || 'Authentication failed' });
      }
    } catch (error) {
      console.error('LoginPage: Error during login:', error);
      setErrors({ form: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setErrors({});
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 bg-gradient-to-br from-leaf-100 via-white to-mango-100 -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 text-6xl opacity-20 animate-pulse-slow">🥭</div>
      <div className="absolute bottom-20 right-10 text-6xl opacity-20 animate-pulse-slow">🌿</div>

      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 animate-slide-up">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-leaf-500 to-leaf-600 p-3 rounded-xl shadow-lg">
              <Leaf className="text-white" size={40} />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-gray-600">
              {isSignUp 
                ? 'Join Scan2Save to protect your mango harvest' 
                : 'Sign in to continue protecting your crops'
              }
            </p>
          </div>

          {/* Form Error */}
          {errors.form && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-red-700">{errors.form}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <Input
                label="Full Name"
                name="name"
                type="text"
                icon={User}
                placeholder="Juan dela Cruz"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                autoComplete="name"
              />
            )}

            <Input
              label="Email Address"
              name="email"
              type="email"
              icon={Mail}
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
            />

            <Input
              label="Password"
              name="password"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
            />

            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={loading}
              disabled={loading}
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={toggleMode}
                className="text-leaf-600 font-semibold hover:text-leaf-700 transition-colors"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-leaf-50 rounded-lg border border-leaf-200">
            <p className="text-sm text-leaf-700 text-center">
              <strong>Demo Mode:</strong> Use any email/password to continue
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
