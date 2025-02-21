import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { MapPin, Settings, Bell, Calendar } from 'lucide-react';
import { useLocation } from '../hooks/useLocation';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import { PrayerCard } from '../components/PrayerCard';
import { TimeAdjuster } from '../components/TimeAdjuster';
import { QiblaCompass } from '../components/QiblaCompass';
import { PrayerTimes as PrayerTimesType, TimeAdjustments } from '../types';
import { adjustPrayerTimes } from '../utils/timeAdjustment';
import { requestNotificationPermission, scheduleAzanNotifications, checkNotificationStatus } from '../utils/notifications';
import { getIslamicDate } from '../utils/islamicDate';

export function PrayerTimes() {
  const { location, error: locationError } = useLocation();
  const { prayerTimes: originalPrayerTimes, error: prayerError } = usePrayerTimes(location);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState<string | null>(null);
  const [showAdjustments, setShowAdjustments] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => checkNotificationStatus());
  const [timeAdjustments, setTimeAdjustments] = useState<TimeAdjustments>({
    Fajr: 0,
    Sunrise: 0,
    Dhuhr: 0,
    Asr: 0,
    Maghrib: 0,
    Isha: 0,
  });

  const prayerTimes = originalPrayerTimes 
    ? adjustPrayerTimes(originalPrayerTimes, timeAdjustments)
    : null;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!prayerTimes) return;

    const findNextPrayer = () => {
      const now = format(currentTime, 'HH:mm');
      const prayers = Object.entries(prayerTimes);
      
      for (const [name, time] of prayers) {
        if (time > now) {
          setNextPrayer(name);
          return;
        }
      }
      
      setNextPrayer(prayers[0][0]);
    };

    findNextPrayer();
  }, [currentTime, prayerTimes]);

  useEffect(() => {
    if (prayerTimes && notificationsEnabled) {
      scheduleAzanNotifications(prayerTimes);
    }
  }, [prayerTimes, notificationsEnabled]);

  const enableNotifications = async () => {
    const permission = await requestNotificationPermission();
    setNotificationsEnabled(permission);
  };

  const handleAdjustment = (prayer: keyof TimeAdjustments, value: number) => {
    setTimeAdjustments(prev => ({
      ...prev,
      [prayer]: value
    }));
  };

  if (locationError || prayerError) {
    return (
      <div className="flex items-center justify-center flex-1 p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="text-red-600">{locationError || prayerError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Prayer Times Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Prayer Times</h1>
                <div className="flex items-center mt-2 text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{location?.city}, {location?.country}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowAdjustments(!showAdjustments)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Settings className={`w-5 h-5 ${showAdjustments ? 'text-emerald-600' : 'text-gray-600'}`} />
                  </button>
                  <button
                    onClick={enableNotifications}
                    className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                      notificationsEnabled ? 'text-emerald-600' : 'text-gray-600'
                    }`}
                    title={notificationsEnabled ? 'Notifications enabled' : 'Enable notifications'}
                  >
                    <Bell className={`w-5 h-5 ${notificationsEnabled ? 'fill-emerald-600' : ''}`} />
                  </button>
                </div>
                <div className="text-2xl font-semibold text-gray-800">
                  {format(currentTime, 'HH:mm')}
                </div>
                <div className="text-gray-600">
                  {format(currentTime, 'EEEE, MMMM d')}
                </div>
                <div className="text-emerald-600 text-sm mt-1">
                  {getIslamicDate()}
                </div>
              </div>
            </div>

            {showAdjustments && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Time Adjustments</h2>
                {Object.entries(timeAdjustments).map(([prayer, adjustment]) => (
                  <TimeAdjuster
                    key={prayer}
                    name={prayer}
                    adjustment={adjustment}
                    onChange={(value) => handleAdjustment(prayer as keyof TimeAdjustments, value)}
                  />
                ))}
              </div>
            )}

            {prayerTimes && (
              <div className="space-y-4">
                <PrayerCard
                  name="Fajr"
                  time={prayerTimes.Fajr}
                  isNext={nextPrayer === 'Fajr'}
                />
                <PrayerCard
                  name="Sunrise"
                  time={prayerTimes.Sunrise}
                  isNext={nextPrayer === 'Sunrise'}
                />
                <PrayerCard
                  name="Dhuhr"
                  time={prayerTimes.Dhuhr}
                  isNext={nextPrayer === 'Dhuhr'}
                />
                <PrayerCard
                  name="Asr"
                  time={prayerTimes.Asr}
                  isNext={nextPrayer === 'Asr'}
                />
                <PrayerCard
                  name="Maghrib"
                  time={prayerTimes.Maghrib}
                  isNext={nextPrayer === 'Maghrib'}
                />
                <PrayerCard
                  name="Isha"
                  time={prayerTimes.Isha}
                  isNext={nextPrayer === 'Isha'}
                />
              </div>
            )}
          </div>
        </div>

        {/* Qibla and Calendar Section */}
        <div className="space-y-6">
          {location && <QiblaCompass location={location} />}
          
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center mb-4">
              <Calendar className="w-5 h-5 text-emerald-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Calendar</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Gregorian</span>
                <span className="font-medium">{format(currentTime, 'MMMM d, yyyy')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Islamic</span>
                <span className="font-medium">{getIslamicDate()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}