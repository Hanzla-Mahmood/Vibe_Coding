
import React from 'react';
import Navigation from '@/components/Navigation';
import GroundCard from '@/components/GroundCard';

const grounds = [
  {
    name: "Fortress Stadium",
    image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=400",
    location: "Gulberg III, Lahore",
    mapLink: "https://maps.google.com/?q=Gulberg+III+Lahore",
    timings: "6:00 AM - 11:00 PM",
    rates: "PKR 3,000/hour"
  },
  {
    name: "Green Valley Ground",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400",
    location: "DHA Phase 5, Lahore",
    mapLink: "https://maps.google.com/?q=DHA+Phase+5+Lahore",
    timings: "5:00 AM - 12:00 AM",
    rates: "PKR 2,500/hour"
  },
  {
    name: "Champions Arena",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
    location: "Johar Town, Lahore",
    mapLink: "https://maps.google.com/?q=Johar+Town+Lahore",
    timings: "6:00 AM - 10:00 PM",
    rates: "PKR 3,500/hour"
  },
  {
    name: "Liberty Sports Complex",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400",
    location: "Liberty Market, Lahore",
    mapLink: "https://maps.google.com/?q=Liberty+Market+Lahore",
    timings: "7:00 AM - 11:00 PM",
    rates: "PKR 2,800/hour"
  },
  {
    name: "Model Town Ground",
    image: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400",
    location: "Model Town, Lahore",
    mapLink: "https://maps.google.com/?q=Model+Town+Lahore",
    timings: "6:00 AM - 10:30 PM",
    rates: "PKR 2,200/hour"
  },
  {
    name: "Elite Football Academy",
    image: "https://images.unsplash.com/photo-1486286701208-1d58e9338013?w=400",
    location: "Cantt, Lahore",
    mapLink: "https://maps.google.com/?q=Cantt+Lahore",
    timings: "5:30 AM - 11:30 PM",
    rates: "PKR 4,000/hour"
  }
];

const Playground = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Sports <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Playground</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover premium sports facilities across Lahore. Book your favorite ground and elevate your game!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {grounds.map((ground, index) => (
              <div
                key={ground.name}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <GroundCard {...ground} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
