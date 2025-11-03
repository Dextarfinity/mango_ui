import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Zap, BookOpen, Shield, ArrowRight, Leaf, Sparkles } from 'lucide-react';
import { Button } from '../components/common/Button';

export const LandingPage = () => {
  const features = [
    {
      icon: Camera,
      title: 'AI-Powered Detection',
      description: 'Advanced machine learning identifies mango diseases instantly with high accuracy.'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get diagnosis and treatment recommendations in seconds, not days.'
    },
    {
      icon: BookOpen,
      title: 'Expert Knowledge',
      description: 'Access comprehensive treatment guides and prevention tips from agricultural experts.'
    },
    {
      icon: Shield,
      title: 'Save Your Harvest',
      description: 'Early detection means better yields and healthier mango trees for Filipino farmers.'
    }
  ];

  const steps = [
    { number: '1', title: 'Capture', description: 'Take a photo of the affected leaf or fruit' },
    { number: '2', title: 'Analyze', description: 'Our AI identifies the disease or pest' },
    { number: '3', title: 'Treat', description: 'Get actionable treatment recommendations' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-leaf-50 via-white to-mango-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-leaf-600 via-leaf-500 to-mango-500 opacity-10 dark:opacity-5" />
        <div className="absolute top-20 left-10 text-8xl opacity-20 dark:opacity-10">🥭</div>
        <div className="absolute bottom-20 right-10 text-8xl opacity-20 dark:opacity-10">🌿</div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-mango-400 to-mango-600 p-4 rounded-2xl shadow-lg animate-pulse-slow">
                <Leaf className="text-white" size={64} />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Protect Your Mango Harvest with{' '}
              <span className="bg-gradient-to-r from-leaf-600 to-mango-600 bg-clip-text text-transparent">
                AI Technology
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Scan2Save helps Filipino mango farmers detect diseases and pests instantly. 
              Get expert treatment recommendations to save your crops.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/login?signup=true">
                <Button size="lg" icon={Sparkles} className="min-w-[200px]">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="min-w-[200px]">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Three simple steps to healthier mango trees
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-leaf-500 to-leaf-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 text-leaf-300" size={32} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-br from-leaf-50 to-mango-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Farmers Trust Scan2Save
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Built specifically for Philippine mango farmers
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-gradient-to-br from-leaf-100 to-mango-100 dark:from-leaf-900 dark:to-mango-900 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="text-leaf-600 dark:text-leaf-400" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-leaf-600 to-leaf-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Protect Your Mango Harvest?
          </h2>
          <p className="text-xl text-leaf-50 mb-8">
            Join thousands of Filipino farmers using AI to save their crops
          </p>
          <Link to="/login?signup=true">
            <button className="inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold bg-white text-leaf-600 rounded-lg shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-200">
              <Camera size={20} />
              Start Scanning Now
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Leaf size={24} />
              <span className="text-2xl font-bold">Scan2Save</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering Filipino mango farmers with AI technology
            </p>
            <p className="text-sm text-gray-500">
              © 2025 Scan2Save. Made with 💚 for Philippine agriculture.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
