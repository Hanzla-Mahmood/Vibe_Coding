
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-orange-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Welcome to
            <span className="block bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              The Sports Arena
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Discover the best sports facilities in Lahore. Book your favorite ground,
            connect with fellow athletes, and elevate your game to the next level.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/playground">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-3 text-lg font-semibold">
                <MapPin className="mr-2 h-5 w-5" />
                Explore Grounds
              </Button>
            </Link>

            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg font-semibold">
              <Play className="mr-2 h-5 w-5" />
              Watch Highlights
            </Button>
          </div>
        </div>

        {/* Video Section */}
        <div className="animate-fade-in delay-300">
          <div className="relative max-w-4xl mx-auto">
            <div className="relative bg-black/20 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10">
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/3NiGVnyIwYE"
                  title="Football Highlights"
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
