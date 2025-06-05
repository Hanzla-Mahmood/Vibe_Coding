
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, DollarSign } from 'lucide-react';

interface GroundCardProps {
  name: string;
  image: string;
  location: string;
  mapLink: string;
  timings: string;
  rates: string;
}

const GroundCard: React.FC<GroundCardProps> = ({
  name,
  image,
  location,
  mapLink,
  timings,
  rates
}) => {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {name}
        </h3>

        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-blue-500" />
            <span className="text-sm">{location}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-green-500" />
            <span className="text-sm">{timings}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <DollarSign className="h-4 w-4 mr-2 text-orange-500" />
            <span className="text-sm font-semibold">{rates}</span>
          </div>
        </div>

        <Button
          onClick={() => window.open(mapLink, '_blank')}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          <MapPin className="mr-2 h-4 w-4" />
          View on Map
        </Button>
      </CardContent>
    </Card>
  );
};

export default GroundCard;
