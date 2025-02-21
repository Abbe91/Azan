import { useState, useEffect } from 'react';
import axios from 'axios';
import { PrayerTimes, Location } from '../types';

const ALADHAN_API_BASE_URL = 'https://api.aladhan.com/v1/timingsByCity';

export function usePrayerTimes(location: Location | null) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      if (!location) return;

      try {
        const response = await axios.get(ALADHAN_API_BASE_URL, {
          params: {
            city: location.city,
            country: location.country,
            method: 2 // Islamic Society of North America (ISNA)
          }
        });

        setPrayerTimes(response.data.data.timings);
      } catch (err) {
        setError('Failed to fetch prayer times');
      }
    };

    fetchPrayerTimes();
  }, [location]);

  return { prayerTimes, error };
}