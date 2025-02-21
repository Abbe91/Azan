import React, { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';
import type { Location } from '../types';
import { calculateQiblaDirection } from '../utils/qibla';

interface QiblaCompassProps {
  location: Location;
}

export function QiblaCompass({ location }: QiblaCompassProps) {
  const [userDirection, setUserDirection] = useState<number>(0);
  const [qiblaDirection, setQiblaDirection] = useState<number>(0);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const qibla = calculateQiblaDirection(location);
    setQiblaDirection(qibla);

    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'accelerometer' as PermissionName })
        .then((result) => {
          setHasPermission(result.state === 'granted');
          if (result.state === 'granted') {
            startCompass();
          }
        });
    }
  }, [location]);

  const startCompass = () => {
    if ('DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientationabsolute', handleOrientation);
    }
  };

  const handleOrientation = (event: DeviceOrientationEvent) => {
    if (event.alpha !== null) {
      setUserDirection(event.alpha);
    }
  };

  const compassRotation = userDirection;
  const qiblaRotation = (qiblaDirection - userDirection + 360) % 360;

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Qibla Direction</h3>
        <span className="text-sm text-gray-600">{Math.round(qiblaDirection)}°</span>
      </div>
      
      <div className="relative w-48 h-48 mx-auto">
        {/* Compass Rose */}
        <div
          className="absolute inset-0 transition-transform duration-200"
          style={{ transform: `rotate(${-compassRotation}deg)` }}
        >
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-1 h-4 bg-red-500" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-1 h-4 bg-gray-400" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-4 h-1 bg-gray-400" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-4 h-1 bg-gray-400" />
          </div>
        </div>

        {/* Qibla Indicator */}
        <div
          className="absolute inset-0 transition-transform duration-200"
          style={{ transform: `rotate(${qiblaRotation}deg)` }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1">
            <Compass className="w-6 h-6 text-emerald-600" />
          </div>
        </div>
      </div>

      {hasPermission === false && (
        <p className="text-sm text-center text-gray-600 mt-4">
          Please enable device orientation permissions to use the compass
        </p>
      )}
    </div>
  );
}