import React from 'react';
import { Clock } from 'lucide-react';

interface PrayerCardProps {
  name: string;
  time: string;
  isNext: boolean;
}

export function PrayerCard({ name, time, isNext }: PrayerCardProps) {
  return (
    <div className={`p-4 rounded-lg ${
      isNext 
        ? 'bg-emerald-100 border-2 border-emerald-500' 
        : 'bg-white'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Clock className={isNext ? 'text-emerald-600' : 'text-gray-600'} />
          <h3 className={`font-medium ${isNext ? 'text-emerald-800' : 'text-gray-800'}`}>
            {name}
          </h3>
        </div>
        <span className={`text-lg font-semibold ${isNext ? 'text-emerald-800' : 'text-gray-800'}`}>
          {time}
        </span>
      </div>
    </div>
  );
}