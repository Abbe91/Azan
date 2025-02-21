import { format, addMinutes, parse } from 'date-fns';
import { TimeAdjustments, PrayerTimes } from '../types';

export function adjustPrayerTime(time: string, adjustment: number): string {
  const parsedTime = parse(time, 'HH:mm', new Date());
  const adjustedTime = addMinutes(parsedTime, adjustment);
  return format(adjustedTime, 'HH:mm');
}

export function adjustPrayerTimes(times: PrayerTimes, adjustments: TimeAdjustments): PrayerTimes {
  return {
    Fajr: adjustPrayerTime(times.Fajr, adjustments.Fajr),
    Sunrise: adjustPrayerTime(times.Sunrise, adjustments.Sunrise),
    Dhuhr: adjustPrayerTime(times.Dhuhr, adjustments.Dhuhr),
    Asr: adjustPrayerTime(times.Asr, adjustments.Asr),
    Maghrib: adjustPrayerTime(times.Maghrib, adjustments.Maghrib),
    Isha: adjustPrayerTime(times.Isha, adjustments.Isha),
  };
}