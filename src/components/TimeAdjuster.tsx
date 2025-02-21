import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { TimeAdjustments } from '../types';

interface TimeAdjusterProps {
  name: string;
  adjustment: number;
  onChange: (value: number) => void;
}

export function TimeAdjuster({ name, adjustment, onChange }: TimeAdjusterProps) {
  return (
    <div className="flex items-center justify-between p-2">
      <span className="text-sm text-gray-600">{name}</span>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onChange(adjustment - 1)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <Minus className="w-4 h-4 text-gray-600" />
        </button>
        <span className="w-12 text-center text-sm">
          {adjustment > 0 ? `+${adjustment}` : adjustment} min
        </span>
        <button
          onClick={() => onChange(adjustment + 1)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <Plus className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
}