import { useState, useEffect } from 'react';
import axios from 'axios';
import { Location } from '../types';

const BIGDATACLOUD_BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

export function useLocation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        
        const response = await axios.get(BIGDATACLOUD_BASE_URL, {
          params: {
            latitude,
            longitude,
            localityLanguage: 'en'
          }
        });

        setLocation({
          city: response.data.city,
          country: response.data.countryName,
          latitude,
          longitude
        });
      } catch (err) {
        setError('Failed to get location. Please enable location services.');
      }
    };

    getLocation();
  }, []);

  return { location, error };
}