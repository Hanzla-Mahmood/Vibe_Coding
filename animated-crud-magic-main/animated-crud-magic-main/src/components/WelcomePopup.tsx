
import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WelcomePopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has seen the welcome popup before
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div 
        className={`relative bg-white rounded-3xl p-8 mx-4 max-w-md w-full shadow-2xl transform transition-all duration-700 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors duration-200"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="text-center text-white">
          {/* Animated sparkles */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Sparkles className="w-16 h-16 text-yellow-300 animate-pulse" />
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full animate-ping"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-white rounded-full animate-bounce"></div>
            </div>
          </div>

          {/* Welcome text with animation */}
          <h1 className="text-4xl font-bold mb-4 animate-fade-in">
            Welcome
          </h1>
          
          <div className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-yellow-300 via-pink-300 to-white bg-clip-text text-transparent animate-fade-in">
            Hanzla!
          </div>

          <p className="text-lg mb-8 opacity-90 animate-fade-in">
            Ready to explore the beautiful world of CRUD Operations? 
            Let's manage student records with style!
          </p>

          {/* Action button */}
          <Button
            onClick={handleClose}
            className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 hover:border-white/50 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm"
          >
            Let's Get Started! 🚀
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-300 rounded-full opacity-70 animate-bounce"></div>
        <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-pink-300 rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute top-1/2 -left-6 w-4 h-4 bg-white rounded-full opacity-50 animate-ping"></div>
        <div className="absolute top-1/4 -right-6 w-5 h-5 bg-blue-300 rounded-full opacity-60 animate-bounce"></div>
      </div>
    </div>
  );
};

export default WelcomePopup;
