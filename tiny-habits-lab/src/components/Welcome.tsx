
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ArrowRight, Heart, Star, Clock, Eye, EyeOff, X, Sparkles } from 'lucide-react';

const Welcome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const slides = [
    {
      icon: <Star className="w-16 h-16 text-yellow-400" />,
      title: "Small Habits. Big Shifts.",
      description: "Discover quirky, science-backed micro-habits that fit perfectly into your unique lifestyle."
    },
    {
      icon: <Heart className="w-16 h-16 text-pink-400" />,
      title: "Tailored Just for You",
      description: "Our AI learns your personality and daily rhythms to suggest habits you'll actually love."
    },
    {
      icon: <Clock className="w-16 h-16 text-blue-400" />,
      title: "Track & Evolve",
      description: "Build streaks, gain insights, and watch your habits evolve as you grow."
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/quiz');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUserName(formData.name);
    setIsLoggedIn(true);
    setShowLogin(false);
    setFormData({ name: '', email: '', password: '' });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
                  <stop offset="50%" style="stop-color:#764ba2;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#f093fb;stop-opacity:1" />
                </linearGradient>
                <filter id="noise">
                  <feTurbulence baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
                  <feComponentTransfer>
                    <feFuncA type="discrete" tableValues="0 .5"/>
                  </feComponentTransfer>
                  <feComposite in2="SourceGraphic" operator="multiply"/>
                </filter>
              </defs>
              <rect width="100%" height="100%" fill="url(#grad1)"/>
              <rect width="100%" height="100%" filter="url(#noise)" opacity="0.4"/>
              <circle cx="200" cy="200" r="300" fill="rgba(255,255,255,0.1)"/>
              <circle cx="800" cy="600" r="250" fill="rgba(255,255,255,0.05)"/>
              <circle cx="1000" cy="150" r="200" fill="rgba(255,255,255,0.08)"/>
            </svg>
          `)}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="absolute inset-0 bg-black/10 z-10" />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-white" />
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Habitual Curator
              </h1>
            </div>

            {/* Menu Items */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white/80 hover:text-white transition-colors duration-200 font-medium">
                Home
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors duration-200 font-medium">
                Discover
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors duration-200 font-medium">
                About
              </a>
            </div>

            {/* Login Button */}
            {!isLoggedIn ? (
              <Button
                onClick={() => setShowLogin(true)}
                className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl"
              >
                Login
              </Button>
            ) : (
              <div className="text-white font-medium">
                Hi, {userName}! 👋
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center p-6 pt-24">
        {/* Background Elements */}
        <div className="absolute top-32 left-10 w-32 h-32 bg-gradient-to-br from-white/20 to-white/10 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 bg-gradient-to-br from-white/15 to-white/5 rounded-full opacity-50 animate-pulse" style={{animationDelay: '1s'}}></div>

        <div className="max-w-md w-full space-y-8 text-center relative z-10">
          {/* Welcome Message for Logged In Users */}
          {isLoggedIn && (
            <div className="mb-8 animate-fade-in">
              <Card className="p-6 bg-white/20 backdrop-blur-md border-0 shadow-2xl rounded-3xl border border-white/30">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Welcome, {userName}! 🌟
                </h2>
                <p className="text-white/90 text-lg">
                  Let's build some great habits today.
                </p>
              </Card>
            </div>
          )}

          {/* Logo/Brand */}
          {!isLoggedIn && (
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                Habitual Curator
              </h1>
              <p className="text-white/80 text-lg drop-shadow">Your personal habit companion</p>
            </div>
          )}

          {/* Slide Card */}
          <Card className="p-8 bg-white/10 backdrop-blur-md border-0 shadow-2xl rounded-3xl transition-all duration-500 hover:scale-105 border border-white/20">
            <div className="space-y-6">
              <div className="mx-auto w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transform transition-all duration-300 hover:rotate-12">
                {slides[currentSlide].icon}
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white drop-shadow">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-white/90 leading-relaxed drop-shadow-sm">
                  {slides[currentSlide].description}
                </p>
              </div>
            </div>
          </Card>

          {/* Progress Dots */}
          <div className="flex justify-center space-x-3">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white w-8 shadow-lg'
                    : 'bg-white/40 w-3'
                }`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              onClick={nextSlide}
              className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg border border-white/30"
            >
              {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              onClick={() => navigate('/discover')}
              className="w-full text-white/80 hover:text-white hover:bg-white/10 rounded-full py-3 backdrop-blur-sm"
            >
              Continue as Guest
            </Button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent className="sm:max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300">
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowLogin(false)}
              className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/20 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <DialogTitle className="text-2xl font-bold text-white text-center mb-6">
            Welcome Back
          </DialogTitle>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-white/90 text-sm font-medium">Name</label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-white/90 text-sm font-medium">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-white/90 text-sm font-medium">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20 pr-10"
                  placeholder="Enter your password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-white/70 hover:text-white hover:bg-transparent"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-white/30 backdrop-blur-sm hover:bg-white/40 text-white rounded-full py-3 font-semibold transition-all duration-300 hover:scale-105 shadow-lg border border-white/30 mt-6"
            >
              Login
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Welcome;
