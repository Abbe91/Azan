import { PrayerTimes } from '../types';
import { format, parse, isAfter } from 'date-fns';

export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

export function checkNotificationStatus() {
  if (!('Notification' in window)) return false;
  return Notification.permission === 'granted';
}

export function scheduleAzanNotifications(prayerTimes: PrayerTimes) {
  if (!('Notification' in window)) return;
  
  const prayers = Object.entries(prayerTimes);
  const now = new Date();

  prayers.forEach(([prayer, time]) => {
    if (prayer === 'Sunrise') return; // Skip Sunrise notification

    const [hours, minutes] = time.split(':');
    const prayerTime = new Date();
    prayerTime.setHours(parseInt(hours));
    prayerTime.setMinutes(parseInt(minutes));
    prayerTime.setSeconds(0);

    // Only schedule if prayer time is in the future
    if (isAfter(prayerTime, now)) {
      const timeUntilPrayer = prayerTime.getTime() - now.getTime();
      
      setTimeout(() => {
        new Notification('Prayer Time', {
          body: `It's time for ${prayer} prayer (${time})`,
          icon: '/vite.svg',
          silent: false
        });
        
        // Play Azan audio
        const audio = new Audio('https://www.islamcan.com/audio/adhan/azan1.mp3');
        audio.play();
      }, timeUntilPrayer);
    }
  });
}