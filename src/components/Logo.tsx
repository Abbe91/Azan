import React from 'react';
import { Moon } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center">
      <div className="relative">
        <div className="absolute inset-0 bg-white rounded-full opacity-20"></div>
        <Moon className="h-8 w-8 relative z-10" />
      </div>
      <span className="ml-2 text-xl font-bold">Islamic Hub</span>
    </div>
  );
}